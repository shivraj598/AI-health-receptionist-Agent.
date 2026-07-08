# VitalAI — Health AI Call Agent SaaS

AI-powered voice receptionist for healthcare clinics. Handles incoming calls, books appointments, manages patients, and processes subscriptions — all powered by AI.

## Features

- **AI Voice Agent** — Natural conversations that handle calls 24/7
- **Smart Booking** — AI books, reschedules, and confirms appointments
- **Patient Management Dashboard** — View patients, calls, and history
- **Multi-location Support** — Manage all clinics from one dashboard
- **Patient Portal** — Patients view and manage their appointments
- **Stripe Subscriptions** — 3-tier billing (Free/Pro/Business)
- **Embedded Widget** — Clinics embed the AI agent on their website
- **Public Clinic Pages** — Each clinic gets a branded public page
- **HIPAA Compliant** — Enterprise-grade security & encryption

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript, React 18 |
| Styling | Tailwind CSS, Framer Motion |
| Database | Supabase / PostgreSQL |
| Auth | Supabase SSR |
| AI Voice | OpenAI Realtime API |
| Payments | Stripe |
| Email | Resend |
| State | Zustand + TanStack React Query |
| Forms | React Hook Form + Zod |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login / Signup pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/     # Dashboard layout (sidebar + header)
│   ├── (portal)/        # Patient portal
│   │   └── portal/
│   │       ├── appointments/
│   │       └── profile/
│   ├── dashboard/       # Dashboard pages
│   │   ├── agents/
│   │   ├── analytics/
│   │   ├── appointments/
│   │   ├── calls/
│   │   ├── patients/
│   │   └── settings/
│   ├── sites/[slug]/    # Public clinic pages
│   └── widget-demo/     # AI widget demo
├── components/
│   └── ui/              # UI components
├── lib/                 # Utilities
├── store/               # Zustand stores
├── hooks/               # React hooks
├── services/            # Service logic
├── types/               # TypeScript types
├── constants/           # App constants
├── validations/         # Zod schemas
└── styles/              # Global CSS
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or bun

### Installation

```bash
npm install
```

### Environment Variables

Copy the template and fill in your credentials:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `OPENAI_API_KEY` | For AI | OpenAI API key (Realtime API) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe publishable key |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key |
| `RESEND_API_KEY` | For email | Resend API key |

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript check |
| `npm run clear` | Remove node_modules, .next, lockfile |

## License

MIT
