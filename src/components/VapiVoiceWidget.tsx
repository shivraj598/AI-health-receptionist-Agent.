'use client'

import { useState } from 'react'
import { Phone, PhoneOff, Bot, Mic, Volume2, X } from 'lucide-react'
import { useVapi } from '@/hooks/useVapi'
import { motion, AnimatePresence } from 'framer-motion'

interface VapiVoiceWidgetProps {
  assistantId?: string
  variant?: 'button' | 'full'
  onCallEnd?: () => void
}

export function VapiVoiceWidget({ assistantId, variant = 'button', onCallEnd }: VapiVoiceWidgetProps) {
  const { isCallActive, isSpeaking, transcript, error, startCall, endCall } = useVapi()
  const [expanded, setExpanded] = useState(false)

  const handleToggle = async () => {
    if (isCallActive) {
      await endCall()
      onCallEnd?.()
    } else {
      await startCall(assistantId)
      setExpanded(true)
    }
  }

  if (variant === 'button') {
    return (
      <div className="relative">
        <button
          onClick={handleToggle}
          disabled={!assistantId}
          className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 ${
            isCallActive
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
              : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white shadow-teal-500/20 hover:shadow-teal-500/30'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isCallActive ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              End Call
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              {assistantId ? 'Call to Book' : 'Configure Agent'}
            </>
          )}
        </button>

        <AnimatePresence>
          {expanded && isCallActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <CallUI isSpeaking={isSpeaking} transcript={transcript} error={error} onEnd={handleToggle} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            {isCallActive ? <Mic className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">
              {isCallActive ? 'Call in Progress' : 'AI Receptionist'}
            </p>
            <p className="text-xs text-white/70">
              {isCallActive ? (isSpeaking ? 'Speaking...' : 'Listening...') : 'Ready to help'}
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {expanded ? <X className="w-4 h-4 text-white/70" /> : null}
          </button>
        </div>
      </div>

      <div className="p-4">
        {!isCallActive ? (
          <button
            onClick={handleToggle}
            disabled={!assistantId}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm disabled:opacity-50"
          >
            <Phone className="w-4 h-4" />
            Start Voice Call
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 py-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'bg-teal-500/30 scale-110' : 'bg-white/10'}`}>
                {isSpeaking ? (
                  <Volume2 className="w-6 h-6 text-teal-400 animate-pulse" />
                ) : (
                  <Mic className="w-6 h-6 text-white/50" />
                )}
              </div>
            </div>
            {expanded && (
              <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
                {transcript.map((t, i) => (
                  <p key={i} className="text-white/50">{t}</p>
                ))}
              </div>
            )}
            {error && <p className="text-xs text-red-400 text-center">{error}</p>}
            <button
              onClick={handleToggle}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
            >
              <PhoneOff className="w-4 h-4" /> End Call
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CallUI({ isSpeaking, transcript, error, onEnd }: { isSpeaking: boolean; transcript: string[]; error: string | null; onEnd: () => void }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-3 py-6">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'bg-teal-500/30 scale-110 shadow-lg shadow-teal-500/20' : 'bg-white/10'}`}>
          {isSpeaking ? (
            <Volume2 className="w-7 h-7 text-teal-400 animate-pulse" />
          ) : (
            <Mic className="w-7 h-7 text-white/50" />
          )}
        </div>
      </div>
      <p className="text-center text-xs text-white/40 mb-3">
        {isSpeaking ? 'AI is speaking...' : 'Listening to you...'}
      </p>
      {transcript.length > 0 && (
        <div className="max-h-24 overflow-y-auto mb-3 space-y-1">
          {transcript.slice(-3).map((t, i) => (
            <p key={i} className="text-xs text-white/50 leading-relaxed">{t}</p>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-red-400 text-center mb-3">{error}</p>}
      <button
        onClick={onEnd}
        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
      >
        <PhoneOff className="w-4 h-4" /> End Call
      </button>
    </div>
  )
}
