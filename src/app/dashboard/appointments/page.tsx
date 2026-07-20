'use client'

import { useState } from 'react'
import { Calendar, Clock, Loader2, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase-client'
import { useBusinessStore } from '@/store/business'
import { useBusinessData } from '@/hooks/useBusinessData'
import type { Appointment } from '@/types/database'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rescheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  completed: 'bg-white/10 text-white/50 border-white/10',
}

export default function AppointmentsPage() {
  const { id: businessId } = useBusinessStore()
  const { appointments, loading } = useBusinessData()
  const supabase = createClient()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ patient_name: '', date: '', time: '', reason: '', doctor_name: '' })
  const [saving, setSaving] = useState(false)

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) return
    setSaving(true)
    await supabase.from('appointments').insert({ business_id: businessId, ...form })
    setSaving(false)
    setShowForm(false)
    setForm({ patient_name: '', date: '', time: '', reason: '', doctor_name: '' })
    window.location.reload()
  }

  const updateStatus = async (id: string, status: Appointment['status']) => {
    await supabase.from('appointments').update({ status }).eq('id', id)
    window.location.reload()
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage all appointments booked through GetYourDoctor.</p>
        </div>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/95 backdrop-blur-2xl border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={createAppointment} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Patient Name</Label>
                  <Input
                    value={form.patient_name}
                    onChange={e => setForm(f => ({...f, patient_name: e.target.value}))}
                    placeholder="Patient name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Doctor Name</Label>
                  <Input
                    value={form.doctor_name}
                    onChange={e => setForm(f => ({...f, doctor_name: e.target.value}))}
                    placeholder="Doctor name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Date</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({...f, date: e.target.value}))}
                    className="bg-white/5 border-white/10 text-white [color-scheme:dark]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Time</Label>
                  <Input
                    type="time"
                    value={form.time}
                    onChange={e => setForm(f => ({...f, time: e.target.value}))}
                    className="bg-white/5 border-white/10 text-white [color-scheme:dark]"
                    required
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-xs text-muted-foreground">Reason</Label>
                  <Input
                    value={form.reason}
                    onChange={e => setForm(f => ({...f, reason: e.target.value}))}
                    placeholder="Reason for visit"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400">
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {appointments.length === 0 ? (
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <Calendar className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-muted-foreground">No appointments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <Card key={apt.id} className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-teal-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-primary leading-none">{new Date(apt.date).getDate()}</span>
                      <span className="text-[10px] font-medium text-primary/60 uppercase">
                        {new Date(apt.date).toLocaleString('en', { month: 'short' })}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{apt.patient_name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{apt.reason || 'No reason'}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />{apt.time.slice(0, 5)}
                        </span>
                        {apt.doctor_name && <span className="text-xs text-muted-foreground">{apt.doctor_name}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={STATUS_COLORS[apt.status] || ''}>{apt.status}</Badge>
                    <Select
                      value={apt.status}
                      onValueChange={(val) => updateStatus(apt.id, val as Appointment['status'])}
                    >
                      <SelectTrigger className="w-28 h-8 text-xs bg-white/5 border-white/10 text-white/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 backdrop-blur-2xl border-white/10 text-white">
                        <SelectItem value="pending">pending</SelectItem>
                        <SelectItem value="confirmed">confirmed</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                        <SelectItem value="cancelled">cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
