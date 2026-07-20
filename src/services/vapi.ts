const VAPI_BASE = 'https://api.vapi.ai'

export function getVapiHeaders() {
  return {
    'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
    'Content-Type': 'application/json',
  }
}

export async function createAssistant(businessId: string, businessName: string) {
  const body = {
    name: `GetYourDoctor - ${businessName}`,
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.7,
      systemPrompt: `You are a voice-based healthcare receptionist for ${businessName}. Your entire job is to book appointments over a phone call. Follow this exact flow step by step. Do not skip ahead.

STEP 1 — Greet & collect patient info:
"Hi! Thanks for calling ${businessName}. I can help you book an appointment. First, could I get your full name, phone number, and address?"

Collect: fullName, phoneNumber, address. Confirm each before moving on.

STEP 2 — Check availability & offer slots:
Use the check_availability tool to find open slots on the next few days. Then tell the patient the available dates and times clearly (e.g. "We have Tuesday at 10am, Wednesday at 2pm, or Thursday at 11am"). Ask which they prefer.

STEP 3 — Confirm & book:
Once the patient picks a date and time, use check_availability again to confirm it is still open. Read back all the details: name, phone, address, date, time. Ask "Shall I go ahead and book this for you?"

STEP 4 — Book or adjust:
If patient says yes, call book_appointment to create it and confirm: "You're all set! See you on [date] at [time]."
If patient says no or wants changes, go back to Step 2.

Rules:
- Always confirm details aloud before booking
- If someone needs urgent/emergency care, tell them to call 911
- Keep responses short and conversational — this is a voice call, not a chat
- Never guess availability — always use the check_availability tool`,
      messages: [],
    },
    voice: {
      provider: '11labs',
      voiceId: 'paula',
      stability: 0.5,
      similarityBoost: 0.75,
    },
    firstMessage: `Hi! Thanks for calling ${businessName}. I can help you book an appointment. First, could I get your full name, phone number, and address?`,
    recordingEnabled: true,
    hipaaEnabled: true,
    metadata: {
      businessId,
    },
    serverUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/webhook`,
    serverMessages: ['conversation-update', 'end-of-call-report', 'status-update'],
    clientMessages: ['conversation-update', 'transcript', 'status-update'],
    tools: [
      {
        type: 'function',
        function: {
          name: 'check_availability',
          description: 'Check available appointment slots for a given date',
          parameters: {
            type: 'object',
            properties: {
              date: { type: 'string', description: 'Date to check (YYYY-MM-DD)' },
            },
            required: ['date'],
          },
        },
        server: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/tools/check-availability`,
        },
      },
      {
        type: 'function',
        function: {
          name: 'book_appointment',
          description: 'Book a new appointment for a patient',
          parameters: {
            type: 'object',
            properties: {
              patientName: { type: 'string', description: 'Patient full name' },
              patientPhone: { type: 'string', description: 'Patient phone number' },
              patientEmail: { type: 'string', description: 'Patient email' },
              date: { type: 'string', description: 'Appointment date (YYYY-MM-DD)' },
              time: { type: 'string', description: 'Appointment time (HH:MM)' },
              reason: { type: 'string', description: 'Reason for visit' },
            },
            required: ['patientName', 'date', 'time'],
          },
        },
        server: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/tools/book-appointment`,
        },
      },
      {
        type: 'function',
        function: {
          name: 'lookup_patient',
          description: 'Look up a patient by name or phone number',
          parameters: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Patient name' },
              phone: { type: 'string', description: 'Patient phone' },
            },
          },
        },
        server: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/tools/lookup-patient`,
        },
      },
      {
        type: 'function',
        function: {
          name: 'get_clinic_info',
          description: 'Get clinic information including hours, services, and address',
          parameters: {
            type: 'object',
            properties: {},
          },
        },
        server: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi/tools/clinic-info`,
        },
      },
    ],
  }

  const res = await fetch(`${VAPI_BASE}/assistant`, {
    method: 'POST',
    headers: getVapiHeaders(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Vapi create assistant failed: ${err}`)
  }

  return res.json()
}

export async function updateAssistant(assistantId: string, updates: Record<string, unknown>) {
  const res = await fetch(`${VAPI_BASE}/assistant/${assistantId}`, {
    method: 'PATCH',
    headers: getVapiHeaders(),
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error(`Vapi update assistant failed: ${await res.text()}`)
  return res.json()
}

export async function deleteAssistant(assistantId: string) {
  await fetch(`${VAPI_BASE}/assistant/${assistantId}`, { method: 'DELETE', headers: getVapiHeaders() })
}

export async function getAssistant(assistantId: string) {
  const res = await fetch(`${VAPI_BASE}/assistant/${assistantId}`, { headers: getVapiHeaders() })
  if (!res.ok) return null
  return res.json()
}
