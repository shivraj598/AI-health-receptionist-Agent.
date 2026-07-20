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
    const { name, phone } = input

    const businessId = input.businessId || body.message?.toolCall?.assistant?.metadata?.businessId
    if (!businessId) return NextResponse.json({ found: false })

    let query = supabase.from('patients').select('*').eq('business_id', businessId)

    if (name) {
      query = query.ilike('name', `%${name}%`)
    } else if (phone) {
      query = query.eq('phone', phone)
    } else {
      return NextResponse.json({ found: false })
    }

    const { data: patients } = await query.limit(5)

    return NextResponse.json({
      found: patients && patients.length > 0,
      patients: patients || [],
    })
  } catch {
    return NextResponse.json({ found: false })
  }
}
