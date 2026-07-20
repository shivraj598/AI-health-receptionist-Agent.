import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createAssistant, getAssistant } from '@/services/vapi'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { businessId } = await request.json()
    if (!businessId) return NextResponse.json({ error: 'Business ID required' }, { status: 400 })

    const { data: business } = await supabase.from('businesses').select('*').eq('id', businessId).single()
    if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

    const vapiAssistant = await createAssistant(businessId, business.name)

    await supabase.from('ai_agents').update({
      voice: vapiAssistant.id,
    }).eq('business_id', businessId)

    return NextResponse.json({ assistant: vapiAssistant })
  } catch (error) {
    console.error('Error creating Vapi assistant:', error)
    return NextResponse.json({ error: 'Failed to create assistant' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const assistantId = searchParams.get('assistantId')

    if (!assistantId) {
      return NextResponse.json({ error: 'Assistant ID required' }, { status: 400 })
    }

    const assistant = await getAssistant(assistantId)
    if (!assistant) {
      return NextResponse.json({ error: 'Assistant not found' }, { status: 404 })
    }

    return NextResponse.json({ assistant })
  } catch (error) {
    console.error('Error fetching Vapi assistant:', error)
    return NextResponse.json({ error: 'Failed to fetch assistant' }, { status: 500 })
  }
}
