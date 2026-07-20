'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useBusinessStore } from '@/store/business'
import type { Appointment, Patient, Call, AIAgent } from '@/types/database'

export const DEMO_BUSINESS_ID = 'demo-00000000-0000-0000-0000-000000000000'
const today = new Date().toISOString().split('T')[0]

export const DEMO_PATIENTS: Patient[] = [
  { id: 'demo-p1', business_id: DEMO_BUSINESS_ID, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 (555) 123-4567', dob: '1985-03-15', gender: 'female', notes: 'Allergic to penicillin', created_at: '2026-06-01T10:00:00Z', updated_at: '2026-06-01T10:00:00Z' },
  { id: 'demo-p2', business_id: DEMO_BUSINESS_ID, name: 'Michael Chen', email: 'mchen@example.com', phone: '+1 (555) 234-5678', dob: '1990-07-22', gender: 'male', notes: 'Prefers morning appointments', created_at: '2026-06-02T11:00:00Z', updated_at: '2026-06-02T11:00:00Z' },
  { id: 'demo-p3', business_id: DEMO_BUSINESS_ID, name: 'Emily Rodriguez', email: 'emily.r@example.com', phone: '+1 (555) 345-6789', dob: '1978-11-08', gender: 'female', notes: '', created_at: '2026-06-03T09:00:00Z', updated_at: '2026-06-03T09:00:00Z' },
  { id: 'demo-p4', business_id: DEMO_BUSINESS_ID, name: 'James Wilson', email: 'jwilson@example.com', phone: '+1 (555) 456-7890', dob: '1965-05-30', gender: 'male', notes: 'Diabetic', created_at: '2026-06-04T14:00:00Z', updated_at: '2026-06-04T14:00:00Z' },
  { id: 'demo-p5', business_id: DEMO_BUSINESS_ID, name: 'Olivia Thompson', email: 'olivia.t@example.com', phone: '+1 (555) 567-8901', dob: '1995-09-12', gender: 'female', notes: '', created_at: '2026-06-05T08:00:00Z', updated_at: '2026-06-05T08:00:00Z' },
  { id: 'demo-p6', business_id: DEMO_BUSINESS_ID, name: 'Robert Kim', email: 'rkim@example.com', phone: '+1 (555) 678-9012', dob: '1982-01-25', gender: 'male', notes: 'Last visit: 3 months ago', created_at: '2026-06-06T16:00:00Z', updated_at: '2026-06-06T16:00:00Z' },
]

export const DEMO_APPOINTMENTS: Appointment[] = [
  { id: 'demo-a1', business_id: DEMO_BUSINESS_ID, patient_id: 'demo-p1', patient_name: 'Sarah Johnson', patient_phone: '+1 (555) 123-4567', patient_email: 'sarah.j@example.com', doctor_name: 'Dr. Patel', service_name: 'General Checkup', date: today, time: '09:00', duration_min: 30, reason: 'Annual physical examination', status: 'confirmed', notes: '', created_at: '2026-07-15T08:00:00Z', updated_at: '2026-07-18T10:00:00Z' },
  { id: 'demo-a2', business_id: DEMO_BUSINESS_ID, patient_id: 'demo-p2', patient_name: 'Michael Chen', patient_phone: '+1 (555) 234-5678', patient_email: 'mchen@example.com', doctor_name: 'Dr. Williams', service_name: 'Dental Cleaning', date: today, time: '10:30', duration_min: 45, reason: 'Routine dental cleaning', status: 'pending', notes: '', created_at: '2026-07-16T09:00:00Z', updated_at: '2026-07-16T09:00:00Z' },
  { id: 'demo-a3', business_id: DEMO_BUSINESS_ID, patient_id: 'demo-p4', patient_name: 'James Wilson', patient_phone: '+1 (555) 456-7890', patient_email: 'jwilson@example.com', doctor_name: 'Dr. Patel', service_name: 'Follow-up', date: '2026-07-19', time: '14:00', duration_min: 20, reason: 'Blood sugar level review', status: 'completed', notes: 'Levels are stable', created_at: '2026-07-14T11:00:00Z', updated_at: '2026-07-19T14:30:00Z' },
  { id: 'demo-a4', business_id: DEMO_BUSINESS_ID, patient_id: 'demo-p3', patient_name: 'Emily Rodriguez', patient_phone: '+1 (555) 345-6789', patient_email: 'emily.r@example.com', doctor_name: 'Dr. Kim', service_name: 'Eye Exam', date: '2026-07-21', time: '11:00', duration_min: 30, reason: 'Vision check', status: 'confirmed', notes: '', created_at: '2026-07-17T13:00:00Z', updated_at: '2026-07-17T13:00:00Z' },
  { id: 'demo-a5', business_id: DEMO_BUSINESS_ID, patient_id: 'demo-p5', patient_name: 'Olivia Thompson', patient_phone: '+1 (555) 567-8901', patient_email: 'olivia.t@example.com', doctor_name: 'Dr. Williams', service_name: 'Consultation', date: '2026-07-22', time: '15:30', duration_min: 30, reason: 'Skin rash consultation', status: 'pending', notes: '', created_at: '2026-07-18T07:00:00Z', updated_at: '2026-07-18T07:00:00Z' },
  { id: 'demo-a6', business_id: DEMO_BUSINESS_ID, patient_id: null, patient_name: 'Walk-in Patient', patient_phone: null, patient_email: null, doctor_name: 'Dr. Patel', service_name: 'Urgent Care', date: today, time: '16:00', duration_min: 15, reason: 'Sore throat', status: 'pending', notes: '', created_at: '2026-07-20T06:00:00Z', updated_at: '2026-07-20T06:00:00Z' },
]

export const DEMO_CALLS: Call[] = [
  { id: 'demo-c1', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Sarah Johnson', patient_phone: '+1 (555) 123-4567', duration_sec: 187, status: 'completed', summary: 'Patient requested to reschedule appointment to next week', transcript_url: null, created_at: '2026-07-20T08:15:00Z' },
  { id: 'demo-c2', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Robert Kim', patient_phone: '+1 (555) 678-9012', duration_sec: 312, status: 'completed', summary: 'Booked appointment for general checkup on Friday 10 AM', transcript_url: null, created_at: '2026-07-20T09:30:00Z' },
  { id: 'demo-c3', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Unknown Caller', patient_phone: '+1 (555) 999-8888', duration_sec: 45, status: 'missed', summary: null, transcript_url: null, created_at: '2026-07-20T10:00:00Z' },
  { id: 'demo-c4', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Emily Rodriguez', patient_phone: '+1 (555) 345-6789', duration_sec: 265, status: 'completed', summary: 'Confirmed existing eye exam appointment for July 21', transcript_url: null, created_at: '2026-07-20T11:15:00Z' },
  { id: 'demo-c5', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'James Wilson', patient_phone: '+1 (555) 456-7890', duration_sec: 0, status: 'failed', summary: null, transcript_url: null, created_at: '2026-07-20T11:45:00Z' },
  { id: 'demo-c6', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Michael Chen', patient_phone: '+1 (555) 234-5678', duration_sec: 198, status: 'completed', summary: 'Dental cleaning appointment confirmed for tomorrow 10:30 AM', transcript_url: null, created_at: '2026-07-19T14:00:00Z' },
  { id: 'demo-c7', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Olivia Thompson', patient_phone: '+1 (555) 567-8901', duration_sec: 420, status: 'completed', summary: 'Booked consultation for skin rash, scheduled July 22 at 3:30 PM', transcript_url: null, created_at: '2026-07-19T15:30:00Z' },
  { id: 'demo-c8', business_id: DEMO_BUSINESS_ID, agent_id: null, patient_name: 'Unknown Caller', patient_phone: '+1 (555) 777-6666', duration_sec: 12, status: 'missed', summary: null, transcript_url: null, created_at: '2026-07-19T16:45:00Z' },
]

export const DEMO_AGENTS: AIAgent[] = [
  { id: 'demo-ag1', business_id: DEMO_BUSINESS_ID, name: 'Main Receptionist', voice: null, greeting_message: 'Hi! Thanks for calling GetYourDoctor. How can I help you today?', is_active: true, working_hours: null, created_at: '2026-06-01T00:00:00Z', updated_at: '2026-06-01T00:00:00Z' },
  { id: 'demo-ag2', business_id: DEMO_BUSINESS_ID, name: 'Appointment Scheduler', voice: null, greeting_message: 'Welcome to GetYourDoctor appointments. Let me help you book or manage your visit.', is_active: true, working_hours: null, created_at: '2026-06-05T00:00:00Z', updated_at: '2026-06-05T00:00:00Z' },
  { id: 'demo-ag3', business_id: DEMO_BUSINESS_ID, name: 'After-Hours Support', voice: null, greeting_message: 'You\'ve reached GetYourDoctor after hours. Please leave a message and we\'ll get back to you.', is_active: false, working_hours: null, created_at: '2026-06-10T00:00:00Z', updated_at: '2026-06-10T00:00:00Z' },
]

function isDemoId(id: string | null): id is typeof DEMO_BUSINESS_ID {
  return id === DEMO_BUSINESS_ID
}

export function useBusinessData() {
  const { id: businessId } = useBusinessStore()
  const supabase = createClient()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [calls, setCalls] = useState<Call[]>([])
  const [agents, setAgents] = useState<AIAgent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoId(businessId)) {
      setAppointments(DEMO_APPOINTMENTS)
      setPatients(DEMO_PATIENTS)
      setCalls(DEMO_CALLS)
      setAgents(DEMO_AGENTS)
      setLoading(false)
      return
    }

    if (!businessId) return
    setLoading(true)

    Promise.all([
      supabase.from('appointments').select('*').eq('business_id', businessId).order('date', { ascending: false }),
      supabase.from('patients').select('*').eq('business_id', businessId).order('created_at', { ascending: false }),
      supabase.from('calls').select('*').eq('business_id', businessId).order('created_at', { ascending: false }),
      supabase.from('ai_agents').select('*').eq('business_id', businessId),
    ]).then(([apts, pats, clls, agts]) => {
      const hasData = (apts.data && apts.data.length > 0) || (pats.data && pats.data.length > 0)
      setAppointments(hasData ? apts.data || [] : DEMO_APPOINTMENTS)
      setPatients(hasData ? pats.data || [] : DEMO_PATIENTS)
      setCalls(hasData ? clls.data || [] : DEMO_CALLS)
      setAgents(hasData ? agts.data || [] : DEMO_AGENTS)
      setLoading(false)
    })
  }, [businessId])

  const todayAppointments = appointments.filter(
    a => a.date === new Date().toISOString().split('T')[0]
  )

  const todayCalls = calls.filter(
    c => new Date(c.created_at).toDateString() === new Date().toDateString()
  )

  return { appointments, patients, calls, agents, todayAppointments, todayCalls, loading, businessId }
}
