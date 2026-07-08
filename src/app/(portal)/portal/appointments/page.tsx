'use client'

import { Clock, MapPin } from 'lucide-react'

const APPOINTMENTS = [
  { date: 'Mon, Jul 13', time: '10:00 AM', doctor: 'Dr. Sarah Chen', type: 'Annual Checkup', status: 'Confirmed' },
  { date: 'Fri, Jul 24', time: '2:30 PM', doctor: 'Dr. Michael Torres', type: 'Follow-up', status: 'Pending' },
]

export default function PortalAppointmentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">My Appointments</h1>
        <p className="text-sm text-white/40 mt-1">View and manage your upcoming appointments.</p>
      </div>
      <div className="space-y-4">
        {APPOINTMENTS.map((apt) => (
          <div key={`${apt.date}-${apt.time}`} className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-5 border border-white/10 hover:border-teal-500/30 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-teal-400 leading-none">{apt.date.split(',')[1].trim().split(' ')[0]}</span>
                  <span className="text-[10px] font-medium text-teal-400/60 uppercase">{apt.date.split(',')[1].trim().split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{apt.type}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{apt.doctor}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-white/40"><Clock className="w-3 h-3" />{apt.time}</span>
                    <span className="flex items-center gap-1 text-xs text-white/40"><MapPin className="w-3 h-3" />Main Office</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
