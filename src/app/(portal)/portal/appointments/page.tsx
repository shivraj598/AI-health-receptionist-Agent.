'use client'

import { useState, useEffect } from 'react'
import { Clock, MapPin, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/hooks/useAuth'
import type { Appointment } from '@/types/database'

export default function PortalAppointmentsPage() {
  const { user } = useAuth()
  const supabase = createClient()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) return
    supabase.from('appointments').select('*').eq('patient_email', user.email).order('date', { ascending: true }).then(({ data }) => {
      if (data) setAppointments(data)
      setLoading(false)
    })
  }, [user])

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">My Appointments</h1>
        <p className="text-sm text-white/40 mt-1">View and manage your upcoming appointments.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-12 border border-white/10 text-center">
          <p className="text-white/40">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-5 border border-white/10 hover:border-teal-500/30 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-teal-400 leading-none">{new Date(apt.date).getDate()}</span>
                    <span className="text-[10px] font-medium text-teal-400/60 uppercase">
                      {new Date(apt.date).toLocaleString('en', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{apt.service_name || apt.reason || 'Appointment'}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{apt.doctor_name || ''}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-white/40"><Clock className="w-3 h-3" />{apt.time.slice(0, 5)}</span>
                      <span className="flex items-center gap-1 text-xs text-white/40"><MapPin className="w-3 h-3" />Main Office</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  apt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                  apt.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                  apt.status === 'completed' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-red-500/10 text-red-400'
                }`}>{apt.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
