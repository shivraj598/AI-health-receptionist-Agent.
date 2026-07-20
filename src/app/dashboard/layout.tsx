'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Phone, Calendar, Users, Settings,
  BarChart3, Menu, X, Bell, MessageSquareText,
  HeartPulse, ChevronDown, LogOut, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/useAuth'
import { useBusinessStore } from '@/store/business'
import { Badge } from '@/components/ui/badge'
import { DEMO_BUSINESS_ID } from '@/hooks/useBusinessData'
import { createClient } from '@/lib/supabase-client'

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
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, signOut } = useAuth()
  const { name, setBusiness } = useBusinessStore()
  const supabase = createClient()

  useEffect(() => {
    if (!user) return
    supabase.from('business_members').select('business_id').eq('user_id', user.id).single().then(({ data, error }) => {
      if (data) {
        supabase.from('businesses').select('id, name').eq('id', data.business_id).single().then(({ data: biz }) => {
          if (biz) setBusiness(biz.id, biz.name)
          else setBusiness(DEMO_BUSINESS_ID, 'Demo Clinic')
        })
      } else if (error && error.code === 'PGRST116') {
        setBusiness(DEMO_BUSINESS_ID, 'Demo Clinic')
      }
    })
  }, [user])

  const userInitials = user?.email?.split('@')[0].split('.').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <HeartPulse className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-bold text-white">GetYourDoctor</span>
          {name?.includes('Demo') && <Badge className="ml-1.5 bg-amber-500/15 text-amber-400 border-amber-500/20 text-[9px] px-1.5 py-0">DEMO</Badge>}
        </Link>
        <Button variant="ghost" size="icon" className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-150',
                isActive
                  ? 'text-white bg-white/15 shadow-sm shadow-white/5'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <Button
          variant="ghost"
          className="flex items-center gap-3 w-full justify-start text-white/50 hover:text-white hover:bg-white/10 rounded-xl"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-zinc-950 to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.06),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" />

      <aside className="hidden lg:flex lg:flex-col w-64 fixed inset-y-0 left-0 z-40 bg-black/60 backdrop-blur-2xl border-r border-white/10">
        <SidebarContent />
      </aside>

      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-3 left-3 z-50 text-white/60 hover:text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-black/95 backdrop-blur-2xl border-r border-white/10">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header className="h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden text-white/60 hover:text-white opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative hidden sm:block">
              <svg className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <Input
                type="text"
                placeholder="Search patients, calls..."
                className="w-64 pl-9 pr-3 py-2 text-sm rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-teal-500/20 focus-visible:border-teal-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-white/50 hover:text-white hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-black" />
            </Button>
            <Separator orientation="vertical" className="h-8 bg-white/10" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="flex items-center gap-2.5 px-3 py-2 h-auto hover:bg-white/10">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white text-xs font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-white leading-tight">{name || user?.email?.split('@')[0] || 'User'}</p>
                    <p className="text-xs text-white/40">{name ? 'Clinic Owner' : ''}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/30 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-2xl border-white/10">
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/portal/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={signOut} className="text-red-400 focus:text-red-300 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10">
          {children}
        </main>
      </div>
    </div>
  )
}
