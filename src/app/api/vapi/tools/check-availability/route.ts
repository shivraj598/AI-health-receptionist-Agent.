import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const defaultSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { date } = body.message?.toolCall?.input || body
    if (!date) return NextResponse.json({ slots: defaultSlots, date: null })

    const businessId = body.message?.toolCall?.assistant?.metadata?.businessId
    if (!businessId) return NextResponse.json({ slots: defaultSlots, date })

    const { data: appointments } = await supabase
      .from('appointments')
      .select('time')
      .eq('date', date)
      .eq('business_id', businessId)
      .in('status', ['pending', 'confirmed'])

    const bookedTimes = new Set(appointments?.map(a => a.time.slice(0, 5)) || [])

    return NextResponse.json({
      slots: defaultSlots.filter(s => !bookedTimes.has(s)),
      date,
    })
  } catch {
    return NextResponse.json({ slots: defaultSlots })
  }
}
