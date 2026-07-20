-- ============================================================
-- GetYourDoctor — Full Database Schema
-- ============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Businesses (clinics / practices)
create table if not exists public.businesses (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  address     text,
  phone       text,
  email       text,
  website     text,
  hours       jsonb default '{}'::jsonb,
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.businesses enable row level security;

-- 3. Business Members (many-to-many: users <-> businesses)
create type public.member_role as enum ('owner', 'admin', 'staff');

create table if not exists public.business_members (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        public.member_role not null default 'staff',
  created_at  timestamptz not null default now(),
  unique(business_id, user_id)
);
alter table public.business_members enable row level security;

-- 4. Patients
create table if not exists public.patients (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name        text not null,
  email       text,
  phone       text,
  dob         date,
  gender      text,
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.patients enable row level security;

create index idx_patients_business on public.patients(business_id);

-- 5. Appointments
create type public.appointment_status as enum ('pending', 'confirmed', 'rescheduled', 'cancelled', 'completed');

create table if not exists public.appointments (
  id           uuid primary key default gen_random_uuid(),
  business_id  uuid not null references public.businesses(id) on delete cascade,
  patient_id   uuid references public.patients(id) on delete set null,
  patient_name text not null,
  patient_phone text,
  patient_email text,
  doctor_name  text,
  service_name text,
  date         date not null,
  time         time not null,
  duration_min int not null default 30,
  reason       text,
  status       public.appointment_status not null default 'pending',
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
alter table public.appointments enable row level security;

create index idx_appointments_business on public.appointments(business_id);
create index idx_appointments_date   on public.appointments(date);

-- 6. AI Agents
create table if not exists public.ai_agents (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  name            text not null default 'Main Agent',
  voice           text default 'alloy',
  greeting_message text default 'Hi there! Thanks for calling. How can I help you today?',
  is_active       boolean not null default true,
  working_hours   jsonb default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
alter table public.ai_agents enable row level security;

create index idx_agents_business on public.ai_agents(business_id);

-- 7. Calls
create type public.call_status as enum ('incoming', 'ongoing', 'completed', 'missed', 'failed');

create table if not exists public.calls (
  id             uuid primary key default gen_random_uuid(),
  business_id    uuid not null references public.businesses(id) on delete cascade,
  agent_id       uuid references public.ai_agents(id) on delete set null,
  patient_name   text,
  patient_phone  text,
  duration_sec   int,
  status         public.call_status not null default 'completed',
  summary        text,
  transcript_url text,
  created_at     timestamptz not null default now()
);
alter table public.calls enable row level security;

create index idx_calls_business on public.calls(business_id);
create index idx_calls_created  on public.calls(created_at desc);

-- 8. Services (clinic offerings)
create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name        text not null,
  description text,
  duration_min int not null default 30,
  price       numeric(10,2),
  created_at  timestamptz not null default now()
);
alter table public.services enable row level security;

create index idx_services_business on public.services(business_id);

-- 9. Subscriptions (Stripe)
create type public.plan_tier as enum ('free', 'pro', 'business');

create table if not exists public.subscriptions (
  id                   uuid primary key default gen_random_uuid(),
  business_id          uuid not null references public.businesses(id) on delete cascade unique,
  plan                 public.plan_tier not null default 'free',
  stripe_customer_id   text,
  stripe_subscription_id text,
  status               text not null default 'active',
  current_period_start timestamptz,
  current_period_end   timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
alter table public.subscriptions enable row level security;

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Businesses: members can view their businesses
create policy "Members can view businesses"
  on public.businesses for select
  using (
    auth.uid() in (
      select user_id from public.business_members where business_id = id
    )
  );

create policy "Admins can update businesses"
  on public.businesses for update
  using (
    auth.uid() in (
      select user_id from public.business_members
      where business_id = id and role in ('owner', 'admin')
    )
  );

-- Business Members: members can view members of their businesses
create policy "Members can view business members"
  on public.business_members for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- Patients: members can view patients of their businesses
create policy "Members can view patients"
  on public.patients for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can insert patients"
  on public.patients for insert
  with check (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can update patients"
  on public.patients for update
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- Appointments: members can view appointments of their businesses
create policy "Members can view appointments"
  on public.appointments for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can insert appointments"
  on public.appointments for insert
  with check (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can update appointments"
  on public.appointments for update
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- AI Agents: members can view agents of their businesses
create policy "Members can view agents"
  on public.ai_agents for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can manage agents"
  on public.ai_agents for insert
  with check (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can update agents"
  on public.ai_agents for update
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- Calls: members can view calls of their businesses
create policy "Members can view calls"
  on public.calls for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- Services: members can view services of their businesses
create policy "Members can view services"
  on public.services for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can manage services"
  on public.services for insert
  with check (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

create policy "Members can update services"
  on public.services for update
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- Subscriptions: members can view subscriptions of their businesses
create policy "Members can view subscriptions"
  on public.subscriptions for select
  using (
    business_id in (
      select business_id from public.business_members where user_id = auth.uid()
    )
  );

-- ============================================================
-- Seed Data Helpers
-- ============================================================

-- Function to create a business with the caller as owner
create or replace function public.create_business(
  business_name text,
  business_slug text
)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  new_biz_id uuid;
begin
  insert into public.businesses (name, slug)
  values (business_name, business_slug)
  returning id into new_biz_id;

  insert into public.business_members (business_id, user_id, role)
  values (new_biz_id, auth.uid(), 'owner');

  insert into public.subscriptions (business_id, plan)
  values (new_biz_id, 'free');

  insert into public.ai_agents (business_id, name)
  values (new_biz_id, 'Main Agent');

  return new_biz_id;
end;
$$;

-- Function to get the current user's business
create or replace function public.get_my_business()
returns public.businesses
language sql
stable
security definer set search_path = ''
as $$
  select b.*
  from public.businesses b
  join public.business_members bm on bm.business_id = b.id
  where bm.user_id = auth.uid()
  limit 1;
$$;
