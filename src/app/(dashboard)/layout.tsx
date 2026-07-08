'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Phone, Calendar, Users, Settings,
  BarChart3, Menu, X, Bell, Search, MessageSquareText,
  HeartPulse, ChevronDown, LogOut
} from 'lucide-react'

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Phone, label: 'AI Agents', href: '/dashboard/agents' },
  { icon: MessageSquareText, label: 'Calls', href: '/dashboard/calls' },
  { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
  { icon: Users, label: 'Patients', href: '/dashboard/patients' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black flex">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0f2547] via-[#1a3a6b] to-[#1e4db7] transform transition-transform duration-200 ease-in-out lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white">GetYourDoctor</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150 cursor-pointer"
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150">
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Menu className="w-5 h-5 text-white/60" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patients, calls..."
                className="w-64 pl-9 pr-3 py-2 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-white/50" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-black" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                JS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">Dr. Jane Smith</p>
                <p className="text-xs text-white/40">VitalCare Clinic</p>
              </div>
              <ChevronDown className="w-4 h-4 text-white/30" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
