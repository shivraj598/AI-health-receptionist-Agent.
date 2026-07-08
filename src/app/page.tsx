'use client'

import { useState, useEffect } from 'react'
import {
  Calendar, Shield, Bot, Activity, Star, CheckCircle,
  Menu, X, Globe, HeartPulse, Sparkles, MessageSquareText,
  ArrowRight, Play, Smile
} from 'lucide-react'
import { motion } from 'motion/react'
import { HeaderDrawer, DrawerContent } from '@/components/ui/header-drawer'
import { SpotlightCard } from '@/components/ui/spotlight-card'

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

const FEATURES = [
  { icon: Bot, title: 'AI Voice Agent', description: 'Natural conversations that handle incoming calls 24/7. Your patients never wait.' },
  { icon: Calendar, title: 'Smart Booking', description: 'AI books, reschedules, and confirms appointments directly through conversation.' },
  { icon: Shield, title: 'HIPAA Compliant', description: 'Enterprise-grade encryption. Your patient data stays protected.' },
  { icon: Activity, title: 'Real-time Analytics', description: 'Track calls, satisfaction, booking rates live.' },
  { icon: Globe, title: 'Multi-location', description: 'Manage all clinics from one dashboard.' },
  { icon: MessageSquareText, title: 'Smart Triage', description: 'AI understands symptoms, routes patients instantly.' },
]

const TESTIMONIALS = [
  {
    quote: 'Our no-show rate dropped from 22% to 3% in the first month. The AI calls patients to confirm.',
    author: 'Dr. Sarah Chen',
    role: 'Family Medicine, Portland',
    rating: 5,
  },
  {
    quote: 'Setup took 10 minutes. Patients book at 2 AM without waiting. The voice is so natural.',
    author: 'Dr. Michael Torres',
    role: 'Dental Care, Austin',
    rating: 5,
  },
  {
    quote: 'We handle 3x more calls without extra staff. The triage feature saved us hours daily.',
    author: 'Nina Patel',
    role: 'Practice Manager, Chicago',
    rating: 5,
  },
]

const PLANS = [
  {
    name: 'Starter', monthly: 0, desc: 'For small practices.',
    features: ['1 AI agent', '5 bookings/mo', 'Basic analytics', 'Email support'],
    cta: 'Get Started Free', featured: false,
  },
  {
    name: 'Pro', monthly: 49, desc: 'For growing clinics.',
    features: ['10 AI agents', '99 bookings/mo', 'Advanced analytics', 'Priority support', 'Custom voice'],
    cta: 'Start 14-Day Trial', featured: true,
  },
  {
    name: 'Business', monthly: 199, desc: 'For multi-location groups.',
    features: ['Unlimited agents', 'Unlimited bookings', 'White-label', 'Dedicated manager', 'API access'],
    cta: 'Contact Sales', featured: false,
  },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [headerOpen, setHeaderOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">GetYourDoctor</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">{item.label}</a>
              ))}
              <div className="flex items-center gap-3">
                <a href="/login" className="text-sm font-semibold text-white/70 hover:text-white transition-colors px-4 py-2">Sign In</a>
                <a href="/signup" className="text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-200">Get Started</a>
              </div>
            </div>
            <button onClick={() => setHeaderOpen(!headerOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              {headerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <HeaderDrawer open={headerOpen} setOpen={setHeaderOpen}>
          <DrawerContent>
            <div className="px-4 py-5 space-y-4">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setHeaderOpen(false)} className="block text-sm font-medium text-white/70 hover:text-white transition-colors">{item.label}</a>
              ))}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <a href="/login" className="block text-center text-sm font-semibold text-white/70 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors">Sign In</a>
                <a href="/signup" className="block text-center text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 py-2.5 rounded-xl shadow-md">Get Started</a>
              </div>
            </div>
          </DrawerContent>
        </HeaderDrawer>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-500/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-[15%] w-2 h-2 rounded-full bg-teal-400/30 animate-pulse" />
          <div className="absolute top-2/3 right-[20%] w-1.5 h-1.5 rounded-full bg-cyan-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-[30%] w-1 h-1 rounded-full bg-teal-300/30 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="order-2 lg:order-1">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-teal-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm hover:border-teal-400/30 transition-colors cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  AI-powered healthcare answering — now available
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-6"
              >
                <span className="block">Your AI</span>
                <span className="block mt-1">Receptionist</span>
                <span className="block mt-2 bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">Never Misses</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg text-white/40 leading-relaxed mb-8 max-w-lg"
              >
                GetYourDoctor handles your clinic&apos;s incoming calls — booking appointments, answering questions, and managing patient intake. Natural voice, instant setup, 24/7.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-start gap-4 mb-10"
              >
                <a href="/signup" className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/25 text-[15px]">
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
                <a href="#how-it-works" className="group inline-flex items-center gap-2.5 text-white/60 hover:text-white font-semibold px-8 py-4 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-[15px]">
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  See How It Works
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { icon: '✦', text: 'No credit card' },
                  { icon: '✦', text: '14-day free trial' },
                  { icon: '✦', text: 'Cancel anytime' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-white/30">
                    <span className="text-teal-400/60">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Chat Demo */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-teal-500/10 rounded-[2rem] blur-3xl" />
              <div className="relative bg-white/[0.04] backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>
                    <span className="text-[11px] text-white/30 font-mono ml-2">vitalai.io/demo</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400/70 font-medium">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Active
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-teal-500/20">AI</div>
                    <div>
                      <p className="text-sm font-semibold text-white">AI Receptionist</p>
                      <p className="text-[11px] text-white/30">Online — Ready to help</p>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-teal-300" />
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5 border border-white/5 max-w-[85%]">
                        <p className="text-sm text-white/70 leading-relaxed">Hi there! Thanks for calling VitalCare Clinic. I can help you book an appointment, check hours, or connect you with a doctor. How can I help?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="bg-teal-500/10 rounded-2xl rounded-tr-sm px-3.5 py-2.5 border border-teal-500/15 max-w-[85%]">
                        <p className="text-sm text-white/80">Hi! I&apos;d like to book a checkup for next Tuesday morning.</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Smile className="w-3 h-3 text-white/40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400/70 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AI is typing...
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/[0.03] rounded-xl p-3.5 border border-white/5 mt-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Today&apos;s Summary</span>
                      <span className="text-[10px] text-teal-300 font-medium bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/15">Live</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Calls', value: '24', color: 'text-teal-300' },
                        { label: 'Booked', value: '18', color: 'text-emerald-300' },
                        { label: 'Avg. Wait', value: '12s', color: 'text-amber-300' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                          <p className="text-[10px] text-white/30">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-white/20 justify-center">
                    <Shield className="w-3 h-3" />
                    HIPAA Compliant · End-to-end encrypted
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Active Patients' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '4.2M', label: 'Calls Handled' },
              { value: '3min', label: 'Avg. Setup Time' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
                <p className="text-sm text-white/40 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-4"><Sparkles className="w-3 h-3" />Everything you need</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Your clinic never closes with <span className="text-teal-400">AI-powered call handling</span></h2>
            <p className="text-lg text-white/50">From booking to billing, your AI agent handles it all — so your team focuses on care.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon
              return (
                <SpotlightCard key={feature.title} className="bg-white/[0.03] border border-white/10 hover:border-teal-500/30 transition-all duration-300">
                  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="p-6">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-400/20 border border-teal-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Icon className="w-5 h-5 text-teal-300" /></div>
                    <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                  </motion.div>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Get started in <span className="text-teal-400">three simple steps</span></h2>
            <p className="text-lg text-white/50">No complex setup. No technical skills needed.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-0.5 bg-gradient-to-r from-teal-500/20 via-teal-400/40 to-teal-500/20" />
            {[
              { step: '01', title: 'Connect Calendar', description: 'Sync your clinic&apos;s existing calendar. AI learns your availability instantly.' },
              { step: '02', title: 'Customize Agent', description: 'Set hours, services, and preferences. Sounds like your front desk.' },
              { step: '03', title: 'Go Live', description: 'Embed a widget or forward your number. AI starts taking calls immediately.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6 relative z-10"><span className="text-white text-lg font-bold">{item.step}</span></div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-xs">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-4"><Star className="w-3 h-3" />Trusted by healthcare providers</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">What clinic teams <span className="text-teal-400">are saying</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-teal-500/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />))}</div>
                <p className="text-sm text-white/60 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">{t.author.split(' ').map(n => n[0]).join('')}</div>
                  <div><p className="text-sm font-semibold text-white">{t.author}</p><p className="text-xs text-white/40">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Simple, transparent <span className="text-teal-400">pricing</span></h2>
            <p className="text-lg text-white/50">Start free. Upgrade when you grow. No hidden fees.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`rounded-2xl p-6 border transition-all duration-300 ${plan.featured ? 'bg-gradient-to-b from-teal-500/10 to-cyan-500/5 border-teal-500/40 shadow-xl shadow-teal-500/10 scale-[1.02]' : 'bg-white/[0.03] border-white/10 hover:border-teal-500/30'}`}>
                {plan.featured && <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[10px] font-semibold mb-4 shadow-sm"><Sparkles className="w-3 h-3" />Most Popular</div>}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-extrabold text-white">${plan.monthly}</span><span className="text-sm text-white/40">/month</span></div>
                <ul className="space-y-3 mb-8">{plan.features.map((feat) => (<li key={feat} className="flex items-start gap-2.5 text-sm text-white/50"><CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />{feat}</li>))}</ul>
                <a href="/signup" className={`block text-center font-semibold py-3 rounded-xl text-sm transition-all duration-200 ${plan.featured ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30' : 'bg-white/5 text-white/70 border border-white/10 hover:border-teal-500/30 hover:bg-white/10'}`}>{plan.cta}</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600/30 via-cyan-600/20 to-gray-900/50 border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-12 md:p-16">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">Ready to transform your clinic&apos;s phone?</h2>
                <p className="text-teal-200/60 text-lg max-w-xl">Join thousands of healthcare providers using GetYourDoctor. Start your free 14-day trial — no credit card needed.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
                <a href="/signup" className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-white/90 font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200 text-[15px]">Start Free Trial<ArrowRight className="w-4 h-4" /></a>
                <a href="#how-it-works" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200 text-[15px]">Talk to Sales</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-md"><HeartPulse className="w-4 h-4 text-white" /></div><span className="text-base font-bold text-white">GetYourDoctor</span></div>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">AI-powered phone agents for healthcare providers. Never miss a call, always book an appointment.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'HIPAA', 'Security'] },
            ].map((col) => (
              <div key={col.title}><h4 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-4">{col.title}</h4><ul className="space-y-3">{col.links.map((link) => (<li key={link}><a href="#" className="text-sm text-white/40 hover:text-teal-300 transition-colors">{link}</a></li>))}</ul></div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">&copy; 2026 GetYourDoctor. All rights reserved.</p>
            <div className="flex items-center gap-4"><a href="#" className="text-xs text-white/30 hover:text-teal-300 transition-colors">Twitter</a><a href="#" className="text-xs text-white/30 hover:text-teal-300 transition-colors">LinkedIn</a><a href="#" className="text-xs text-white/30 hover:text-teal-300 transition-colors">GitHub</a></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
