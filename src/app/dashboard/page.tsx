'use client'

import { Phone, Calendar, Users, TrendingUp } from 'lucide-react'

const STATS = [
  { icon: Phone, label: 'Calls Today', value: '24', change: '+12%', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Calendar, label: 'Appointments', value: '18', change: '+8%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Users, label: 'New Patients', value: '7', change: '+22%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: TrendingUp, label: 'Booking Rate', value: '85%', change: '+5%', color: 'text-amber-600', bg: 'bg-amber-50' },
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
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening at your clinic today.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#e2edf7] hover:border-teal-200 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          )
        })}
      </div>
      <div className="bg-white rounded-2xl border border-[#e2edf7]">
        <div className="px-5 py-4 border-b border-[#e2edf7] flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recent Calls</h2>
          <span className="text-xs text-teal-600 font-medium">View all</span>
        </div>
        <div className="divide-y divide-[#e2edf7]">
          {RECENT_CALLS.map((call) => (
            <div key={call.name} className="px-5 py-3.5 flex items-center justify-between hover:bg-[#f8faff] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {call.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{call.name}</p>
                  <p className="text-xs text-slate-500">{call.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{call.time}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  call.status === 'Booked' ? 'bg-emerald-50 text-emerald-600' :
                  call.status === 'Rescheduled' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-50 text-slate-600'
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
