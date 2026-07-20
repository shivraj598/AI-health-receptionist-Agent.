'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, PhoneOff, Bot, Mic, Volume2, Loader2, HeartPulse, CheckCircle, Clock, Smile } from 'lucide-react'

type CallState = 'idle' | 'connecting' | 'ringing' | 'connected' | 'ended'

const SIMULATED_RESPONSES = [
  { role: 'ai', text: 'Hi there! Thanks for calling. I\'m your AI receptionist. I can help you book an appointment. First, could I get your full name, phone number, and address?', delay: 2000 },
  { role: 'user', text: 'Sure! My name is John Doe, my phone is 555-0123, and my address is 123 Main St.', delay: 4000 },
  { role: 'ai', text: 'Thanks John! Let me check our available slots. We have Tuesday at 10:00 AM, Wednesday at 2:00 PM, or Thursday at 11:00 AM. Which works best for you?', delay: 3000 },
  { role: 'user', text: 'Tuesday at 10 AM sounds great.', delay: 3500 },
  { role: 'ai', text: 'Excellent! Let me confirm: John Doe, 555-0123, 123 Main St — appointment on Tuesday at 10:00 AM. Shall I go ahead and book this?', delay: 2500 },
  { role: 'user', text: 'Yes, please!', delay: 3000 },
  { role: 'ai', text: 'You\'re all set! Your appointment is booked for Tuesday at 10:00 AM with Dr. Chen. You\'ll receive a confirmation shortly. Is there anything else I can help with?', delay: 2000 },
]

export default function WidgetDemoPage() {
  const [callState, setCallState] = useState<CallState>('idle')
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [activeResponse, setActiveResponse] = useState(0)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  const startCall = () => {
    setCallState('connecting')
    setTimeout(() => setCallState('ringing'), 1500)
    setTimeout(() => {
      setCallState('connected')
      setIsAiSpeaking(true)
    }, 3000)
  }

  useEffect(() => {
    if (callState !== 'connected' || activeResponse >= SIMULATED_RESPONSES.length) return

    const timer = setTimeout(() => {
      const resp = SIMULATED_RESPONSES[activeResponse]
      setMessages(prev => [...prev, resp])
      setActiveResponse(prev => prev + 1)
      setIsAiSpeaking(resp.role === 'ai')
    }, SIMULATED_RESPONSES[activeResponse].delay)

    return () => clearTimeout(timer)
  }, [callState, activeResponse])

  const endCall = () => {
    setCallState('ended')
    setTimeout(() => {
      setCallState('idle')
      setMessages([])
      setActiveResponse(0)
      setIsAiSpeaking(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.08),transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                {callState === 'connected' || callState === 'ringing' || callState === 'connecting' ? (
                  <Phone className="w-6 h-6 text-white" />
                ) : (
                  <HeartPulse className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-white">AI Receptionist</p>
                <p className="text-xs text-white/70">
                  {callState === 'idle' && 'Ready to help — tap Call to Book'}
                  {callState === 'connecting' && 'Connecting...'}
                  {callState === 'ringing' && 'Ringing...'}
                  {callState === 'connected' && (isAiSpeaking ? 'Speaking...' : 'Listening...')}
                  {callState === 'ended' && 'Call ended'}
                </p>
              </div>
              {callState === 'connected' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-300">Live</span>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            {/* Call Animation */}
            <div className="flex items-center justify-center py-8">
              <AnimatePresence mode="wait">
                {callState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-500/30 flex items-center justify-center mx-auto mb-4">
                      <Bot className="w-10 h-10 text-teal-400" />
                    </div>
                    <p className="text-sm text-white/40">Tap the button to start a call</p>
                  </motion.div>
                )}

                {callState === 'connecting' && (
                  <motion.div key="connecting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-ping" />
                      <div className="absolute inset-2 rounded-full bg-teal-500/20 animate-pulse" />
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    </div>
                    <p className="text-sm text-teal-300 font-medium">Connecting...</p>
                  </motion.div>
                )}

                {callState === 'ringing' && (
                  <motion.div key="ringing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-teal-400/40"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                        />
                      ))}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-teal-300 font-medium">Ringing...</p>
                  </motion.div>
                )}

                {callState === 'connected' && (
                  <motion.div key="connected" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-teal-500/10"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className={`absolute inset-2 rounded-full transition-all duration-300 ${isAiSpeaking ? 'bg-teal-500/20 scale-110' : 'bg-white/5'}`}>
                        <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-all duration-300 ${isAiSpeaking ? 'bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30' : 'bg-white/10'}`}>
                          {isAiSpeaking ? (
                            <Volume2 className="w-8 h-8 text-white animate-pulse" />
                          ) : (
                            <Mic className="w-8 h-8 text-white/50" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isAiSpeaking ? 'bg-teal-400' : 'bg-white/30'}`} />
                      <p className="text-sm text-white/50">{isAiSpeaking ? 'AI is speaking...' : 'Listening...'}</p>
                    </div>
                  </motion.div>
                )}

                {callState === 'ended' && (
                  <motion.div key="ended" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-teal-400" />
                    </div>
                    <p className="text-sm text-white/40 font-medium">Call Complete</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Transcript */}
            <div ref={transcriptRef} className="max-h-48 overflow-y-auto space-y-2 mb-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-teal-300" />
                    </div>
                  )}
                  <div className={`rounded-2xl px-3.5 py-2 max-w-[80%] ${msg.role === 'ai' ? 'bg-white/5 border border-white/5 rounded-tl-sm' : 'bg-teal-500/10 border border-teal-500/15 rounded-tr-sm'}`}>
                    <p className="text-xs text-white/70 leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Smile className="w-3 h-3 text-white/40" />
                    </div>
                  )}
                </motion.div>
              ))}
              {callState === 'connected' && isAiSpeaking && (
                <motion.div className="flex items-center gap-2 text-xs text-emerald-400/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI is responding...
                </motion.div>
              )}
            </div>

            {/* Call duration (when connected) */}
            {callState === 'connected' && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/30 mb-3">
                <Clock className="w-3 h-3" />
                <CallTimer />
              </div>
            )}

            {/* Action button */}
            {(callState === 'idle' || callState === 'ended') && (
              <button
                onClick={startCall}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                Call to Book
              </button>
            )}
            {(callState === 'connecting' || callState === 'ringing') && (
              <button
                onClick={endCall}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white/70 font-semibold py-3.5 rounded-xl border border-white/10 transition-all duration-200 text-sm"
              >
                <PhoneOff className="w-4 h-4" />
                Cancel
              </button>
            )}
            {callState === 'connected' && (
              <button
                onClick={endCall}
                className="w-full flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-red-500/10 transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <PhoneOff className="w-4 h-4" />
                End Call
              </button>
            )}
          </div>
        </div>

        {/* HIPAA badge */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-white/20">
          <HeartPulse className="w-3 h-3" />
          HIPAA Compliant · Simulated demo
        </div>
      </motion.div>
    </div>
  )
}

function CallTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
}
