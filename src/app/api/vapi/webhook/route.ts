import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) return NextResponse.json({ success: true })

    const callData = message.call

    switch (message.type) {
      case 'status-update': {
        const businessId = callData?.assistant?.metadata?.businessId
        if (businessId && callData) {
          await supabase.from('calls').insert({
            business_id: businessId,
            patient_name: callData.customer?.number ? `Caller (${callData.customer.number})` : 'Web Caller',
            patient_phone: callData.customer?.number || null,
            status: callData.status === 'ended' ? 'completed' : 'ongoing',
            duration_sec: callData.durationSeconds || null,
            summary: callData.summary || null,
          })
        }
        break
      }
      case 'end-of-call-report': {
        const businessId = callData?.assistant?.metadata?.businessId
        if (businessId && callData?.id) {
          await supabase.from('calls').update({
            status: 'completed',
            duration_sec: callData.durationSeconds || null,
            summary: callData.summary || null,
            transcript_url: callData.transcriptUrl || null,
          }).eq('id', callData.id)
        }
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
