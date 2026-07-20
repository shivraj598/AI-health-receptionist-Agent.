export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Pick<Profile, 'id'> & Partial<Omit<Profile, 'id'>>
        Update: Partial<Profile>
      }
      businesses: {
        Row: Business
        Insert: Omit<Business, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Business, 'id'>>
      }
      business_members: {
        Row: BusinessMember
        Insert: Omit<BusinessMember, 'id' | 'created_at'>
        Update: Partial<Omit<BusinessMember, 'id'>>
      }
      patients: {
        Row: Patient
        Insert: Omit<Patient, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Patient, 'id'>>
      }
      appointments: {
        Row: Appointment
        Insert: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Appointment, 'id'>>
      }
      ai_agents: {
        Row: AIAgent
        Insert: Omit<AIAgent, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AIAgent, 'id'>>
      }
      calls: {
        Row: Call
        Insert: Omit<Call, 'id' | 'created_at'>
        Update: Partial<Omit<Call, 'id'>>
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at'>
        Update: Partial<Omit<Service, 'id'>>
      }
      subscriptions: {
        Row: Subscription
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Subscription, 'id'>>
      }
    }
  }
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
  hours: Json | null
  logo_url: string | null
  created_at: string
  updated_at: string
}

export interface BusinessMember {
  id: string
  business_id: string
  user_id: string
  role: 'owner' | 'admin' | 'staff'
  created_at: string
}

export interface Patient {
  id: string
  business_id: string
  name: string
  email: string | null
  phone: string | null
  dob: string | null
  gender: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  business_id: string
  patient_id: string | null
  patient_name: string
  patient_phone: string | null
  patient_email: string | null
  doctor_name: string | null
  service_name: string | null
  date: string
  time: string
  duration_min: number
  reason: string | null
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface AIAgent {
  id: string
  business_id: string
  name: string
  voice: string | null
  greeting_message: string | null
  is_active: boolean
  working_hours: Json | null
  created_at: string
  updated_at: string
}

export interface Call {
  id: string
  business_id: string
  agent_id: string | null
  patient_name: string | null
  patient_phone: string | null
  duration_sec: number | null
  status: 'incoming' | 'ongoing' | 'completed' | 'missed' | 'failed'
  summary: string | null
  transcript_url: string | null
  created_at: string
}

export interface Service {
  id: string
  business_id: string
  name: string
  description: string | null
  duration_min: number
  price: number | null
  created_at: string
}

export interface Subscription {
  id: string
  business_id: string
  plan: 'free' | 'pro' | 'business'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  status: string
  current_period_start: string | null
  current_period_end: string | null
  created_at: string
  updated_at: string
}
