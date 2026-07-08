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
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Appointments</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage your upcoming appointments.</p>
      </div>
      <div className="space-y-4">
        {APPOINTMENTS.map((apt) => (
          <div key={`${apt.date}-${apt.time}`} className="bg-white rounded-2xl p-5 border border-[#e2edf7] hover:border-teal-200 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100/60 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-teal-600 leading-none">{apt.date.split(',')[1].trim().split(' ')[0]}</span>
                  <span className="text-[10px] font-medium text-teal-500 uppercase">{apt.date.split(',')[1].trim().split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{apt.type}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{apt.doctor}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" />{apt.time}</span>
                    <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="w-3 h-3" />Main Office</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
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
