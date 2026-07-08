'use client'

import { HeartPulse, Calendar, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.1),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.06),transparent_50%)] pointer-events-none" />
      <header className="relative bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white">Patient Portal</span>
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
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/50 hover:text-teal-300 hover:bg-white/5 rounded-xl transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all duration-200 ml-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </nav>
        </div>
      </header>
      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
