'use client'

import { Phone, Calendar, Users, TrendingUp, Loader2, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useBusinessData } from '@/hooks/useBusinessData'

export default function DashboardPage() {
  const { appointments, calls, patients, todayCalls, loading } = useBusinessData()

  const bookedToday = todayCalls.filter(c => c.status === 'completed').length
  const bookingRate = todayCalls.length > 0
    ? Math.round((bookedToday / todayCalls.length) * 100)
    : 0

  const recentCalls = [...calls].slice(0, 5)

  const stats = [
    { icon: Phone, label: 'Calls Today', value: String(todayCalls.length), change: '+12%', color: 'text-teal-300' },
    { icon: Calendar, label: 'Appointments', value: String(appointments.length), change: '+8%', color: 'text-blue-300' },
    { icon: Users, label: 'Total Patients', value: String(patients.length), change: '+23%', color: 'text-violet-300' },
    { icon: TrendingUp, label: 'Booking Rate', value: `${bookingRate}%`, change: '', color: 'text-emerald-300' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-teal-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Here&apos;s what&apos;s happening at your clinic today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-teal-500/30 transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {stat.change && (
                    <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px]">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-black/40 backdrop-blur-xl border-white/10">
        <CardHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-white/10">
          <CardTitle className="text-sm font-bold">Recent Calls</CardTitle>
          <Button variant="link" size="sm" className="text-primary text-xs">View all</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/10">
            {recentCalls.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                <Phone className="w-8 h-8 mx-auto mb-3 text-white/20" />
                No calls yet
              </div>
            ) : (
              recentCalls.map((call) => (
                <div key={call.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white text-xs font-bold">
                        {call.patient_name?.split(' ').map(n => n[0]).join('') || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{call.patient_name || 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">{call.patient_phone || ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{new Date(call.created_at).toLocaleDateString()}</span>
                    <Badge variant="outline" className={
                      call.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      call.status === 'missed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }>{call.status}</Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
