import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = body.message?.toolCall?.input || body
    const { patientName, patientPhone, patientEmail, date, time, reason } = input

    const businessId = input.businessId || body.message?.toolCall?.assistant?.metadata?.businessId
    if (!businessId) {
      return NextResponse.json({ success: false, error: 'No business configured' })
    }

    const { data: appointment, error } = await supabase.from('appointments').insert({
      business_id: businessId,
      patient_name: patientName,
      patient_phone: patientPhone || null,
      patient_email: patientEmail || null,
      date,
      time,
      reason: reason || null,
      status: 'confirmed',
    }).select().single()

    if (error) {
      return NextResponse.json({ success: false, error: 'Failed to book' })
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        patientName: appointment.patient_name,
      },
      message: `Appointment booked for ${patientName} on ${date} at ${time}.`,
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' })
  }
}
