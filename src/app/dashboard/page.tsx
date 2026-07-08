'use client'

import { Phone, Calendar, Users, TrendingUp } from 'lucide-react'

const STATS = [
  { icon: Phone, label: 'Calls Today', value: '24', change: '+12%' },
  { icon: Calendar, label: 'Appointments', value: '18', change: '+8%' },
  { icon: Users, label: 'New Patients', value: '7', change: '+22%' },
  { icon: TrendingUp, label: 'Booking Rate', value: '85%', change: '+5%' },
]

const RECENT_CALLS = [
  { name: 'Sarah Johnson', time: '2 min ago', status: 'Booked', reason: 'Annual checkup' },
  { name: 'Mark Rivera', time: '15 min ago', status: 'Rescheduled', reason: 'Follow-up visit' },
  { name: 'Emily Chen', time: '1 hr ago', status: 'Booked', reason: 'New patient intake' },
  { name: 'David Kim', time: '2 hrs ago', status: 'Inquiry', reason: 'Insurance question' },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Here&apos;s what&apos;s happening at your clinic today.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-5 border border-white/10 hover:border-teal-500/30 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          )
        })}
      </div>
      <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl border border-white/10">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent Calls</h2>
          <span className="text-xs text-teal-400 font-medium">View all</span>
        </div>
        <div className="divide-y divide-white/10">
          {RECENT_CALLS.map((call) => (
            <div key={call.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {call.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{call.name}</p>
                  <p className="text-xs text-white/40">{call.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30">{call.time}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  call.status === 'Booked' ? 'bg-emerald-500/10 text-emerald-400' :
                  call.status === 'Rescheduled' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-white/5 text-white/50'
                }`}>
                  {call.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
