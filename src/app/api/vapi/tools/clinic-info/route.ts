import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const businessId = body.message?.toolCall?.assistant?.metadata?.businessId || body.businessId

    if (!businessId) {
      return NextResponse.json({
        name: 'Our Clinic',
        hours: 'Monday – Friday: 8:00 AM – 6:00 PM',
        phone: '',
        services: [],
      })
    }

    const { data: business } = await supabase
      .from('businesses')
      .select('*, services(*)')
      .eq('id', businessId)
      .single()

    if (!business) {
      return NextResponse.json({ name: 'Clinic', hours: 'Call for hours', services: [] })
    }

    return NextResponse.json({
      name: business.name,
      address: business.address || '',
      phone: business.phone || '',
      hours: business.hours || 'Monday – Friday: 8:00 AM – 6:00 PM',
      services: Array.isArray(business.services) ? business.services.map((s: { name: string }) => s.name) : [],
    })
  } catch {
    return NextResponse.json({ name: 'Clinic', hours: 'Call for hours', services: [] })
  }
}
