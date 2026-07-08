'use client'

import { HeartPulse, Calendar, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] via-white to-[#f0f7ff]">
      <header className="bg-white/80 backdrop-blur-xl border-b border-[#e2edf7] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md shadow-teal-200/30">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-slate-900">Patient Portal</span>
          </Link>
          <nav className="flex items-center gap-1">
            {[
              { icon: Calendar, label: 'Appointments', href: '/portal/appointments' },
              { icon: User, label: 'Profile', href: '/portal/profile' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 ml-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
