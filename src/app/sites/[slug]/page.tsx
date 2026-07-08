import React from 'react'
import { Calendar, Phone, MapPin, Clock, HeartPulse, Shield, Star } from 'lucide-react'
import Link from 'next/link'

export default function ClinicPage({ params }: { params: { slug: string } }) {
  const clinicName = params.slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
      {/* Hero header with image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80"
            alt="Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/30" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <HeartPulse className="w-4 h-4" />
            Powered by GetYourDoctor
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shadow-black/30">
              <span className="text-3xl font-bold text-white">{params.slug.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">{clinicName}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Portland, OR</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Mon–Fri, 8 AM – 6 PM</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> (503) 555-0123</span>
              </div>
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
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {/* Doctor photo + about */}
            <div className="flex flex-col sm:flex-row gap-6 bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80"
                alt="Dr. Sarah Chen"
                className="w-28 h-28 rounded-xl object-cover flex-shrink-0 shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold text-white mb-2">About Our Clinic</h2>
                <p className="text-white/50 leading-relaxed text-sm">
                  We are committed to providing compassionate, high-quality healthcare to our community.
                  Our team of experienced providers uses the latest technology to ensure you get the
                  best care possible. Book an appointment online or call us — we&rsquo;re here to help.
                </p>
              </div>
            </div>

            {/* Services */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'General Checkups' },
                  { name: 'Pediatric Care' },
                  { name: 'Women\u2019s Health' },
                  { name: 'Vaccinations' },
                  { name: 'Lab Testing' },
                  { name: 'Telehealth Visits' },
                  { name: 'Chronic Care' },
                  { name: 'Urgent Care' },
                ].map(({ name }) => (
                  <div key={name} className="flex items-center gap-2.5 bg-white/[0.04] rounded-xl px-4 py-3 border border-white/10 text-sm text-white/60 hover:border-teal-500/30 transition-colors">
                    <Star className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    {name}
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Our Team</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { name: 'Dr. Sarah Chen', role: 'MD, Family Medicine', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80' },
                  { name: 'Dr. James Park', role: 'MD, Internal Medicine', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
                  { name: 'Dr. Maria Lopez', role: 'MD, Pediatrics', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
                ].map((doctor) => (
                  <div key={doctor.name} className="bg-white/[0.04] backdrop-blur-2xl rounded-xl p-4 border border-white/10 text-center hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200">
                    <img src={doctor.img} alt={doctor.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 ring-2 ring-white/10" />
                    <p className="text-sm font-semibold text-white">{doctor.name}</p>
                    <p className="text-xs text-white/40">{doctor.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
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
              <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                Start Voice Call
              </button>
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
