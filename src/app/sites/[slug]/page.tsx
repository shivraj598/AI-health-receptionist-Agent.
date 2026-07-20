import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Calendar, Phone, MapPin, Clock, HeartPulse, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import { VapiVoiceWidget } from '@/components/VapiVoiceWidget'

async function getClinic(slug: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const { data: business } = await supabase
    .from('businesses')
    .select('*, services(*)')
    .eq('slug', slug)
    .single()

  if (!business) return null

  const { data: agents } = await supabase
    .from('ai_agents')
    .select('voice')
    .eq('business_id', business.id)
    .eq('is_active', true)
    .limit(1)

  return { ...business, vapiAssistantId: agents?.[0]?.voice || null }
}

export default async function ClinicPage({ params }: { params: { slug: string } }) {
  const clinic = await getClinic(params.slug)
  if (!clinic) notFound()

  const clinicName = clinic.name
  const slugName = params.slug

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-black/60" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <HeartPulse className="w-4 h-4" />
            Powered by GetYourDoctor
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shadow-black/30">
              <span className="text-3xl font-bold text-white">{slugName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">{clinicName}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                {clinic.address && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{clinic.address}</span>}
                {clinic.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{clinic.phone}</span>}
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Mon–Fri, 8 AM – 6 PM</span>
              </div>
              <p className="text-white/40 text-sm mt-2">{clinic.description || ''}</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 font-semibold px-5 py-3 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-200 text-sm flex-shrink-0">
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-2">About Our Clinic</h2>
              <p className="text-white/50 leading-relaxed text-sm">{clinic.description || 'Compassionate, high-quality healthcare for our community.'}</p>
            </div>

            {clinic.services?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Services</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {clinic.services.map((s: { id: string; name: string; price: number | null }) => (
                    <div key={s.id} className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl px-4 py-3 border border-white/10 text-sm text-white/60 hover:border-teal-500/30 transition-colors">
                      <Star className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span className="flex-1">{s.name}</span>
                      {s.price && <span className="text-xs text-white/40">${s.price}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-bold text-white mb-4">Our Team</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {['Dr. Sarah Chen', 'Dr. James Park', 'Dr. Maria Lopez'].map((name) => (
                  <div key={name} className="bg-white/[0.04] backdrop-blur-2xl rounded-xl p-4 border border-white/10 text-center hover:border-teal-500/30 transition-all duration-200">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-3 ring-2 ring-white/10">
                      <span className="text-white text-lg font-bold">{name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-white/40">MD, Family Medicine</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-3">Clinic Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((item) => (
                  <div key={item.day} className="flex items-center justify-between">
                    <span className="text-white/50">{item.day}</span>
                    <span className="font-medium text-white">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/5 rounded-2xl p-5 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <HeartPulse className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AI Receptionist</p>
                  <p className="text-xs text-teal-400">Online — Ready to help</p>
                </div>
              </div>
              <p className="text-xs text-white/50 mb-3">Need help booking? Our AI assistant can help instantly.</p>
              <VapiVoiceWidget assistantId={clinic.vapiAssistantId} />
            </div>

            <div className="flex items-center gap-2 text-xs text-white/30 justify-center">
              <Shield className="w-3 h-3" />
              HIPAA Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
