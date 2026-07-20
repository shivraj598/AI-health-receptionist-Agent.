'use client'

import { BarChart3, Phone, Calendar, TrendingUp, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBusinessData } from '@/hooks/useBusinessData'

export default function AnalyticsPage() {
  const { appointments, calls, patients, loading } = useBusinessData()

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  const completedCalls = calls.filter(c => c.status === 'completed').length
  const missedCalls = calls.filter(c => c.status === 'missed').length
  const confirmedAppts = appointments.filter(a => a.status === 'confirmed').length
  const pendingAppts = appointments.filter(a => a.status === 'pending').length
  const completedAppts = appointments.filter(a => a.status === 'completed').length
  const cancelledAppts = appointments.filter(a => a.status === 'cancelled').length

  const metrics = [
    { icon: Phone, label: 'Total Calls', value: calls.length, color: 'text-teal-300' },
    { icon: TrendingUp, label: 'Completed', value: completedCalls, color: 'text-emerald-300' },
    { icon: Phone, label: 'Missed', value: missedCalls, color: 'text-red-300' },
    { icon: Calendar, label: 'Confirmed Appts', value: confirmedAppts, color: 'text-blue-300' },
    { icon: Calendar, label: 'Pending Appts', value: pendingAppts, color: 'text-amber-300' },
    { icon: BarChart3, label: 'Total Patients', value: patients.length, color: 'text-purple-300' },
  ]

  const callDistribution = [
    { label: 'Completed', value: completedCalls, color: 'bg-emerald-400', total: calls.length || 1 },
    { label: 'Missed', value: missedCalls, color: 'bg-red-400', total: calls.length || 1 },
    { label: 'Other', value: calls.length - completedCalls - missedCalls, color: 'bg-amber-400', total: calls.length || 1 },
  ]

  const apptDistribution = [
    { label: 'Confirmed', value: confirmedAppts, color: 'bg-emerald-400', total: appointments.length || 1 },
    { label: 'Pending', value: pendingAppts, color: 'bg-amber-400', total: appointments.length || 1 },
    { label: 'Completed', value: completedAppts, color: 'bg-blue-400', total: appointments.length || 1 },
    { label: 'Cancelled', value: cancelledAppts, color: 'bg-red-400', total: appointments.length || 1 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track performance, call volumes, and booking metrics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <Card key={m.label} className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-teal-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white/50" />
                  </div>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Call Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {callDistribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Appointment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apptDistribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
