'use client'

import { useState } from 'react'
import { HeartPulse, X, MessageSquareText, Bot, Smile, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WidgetDemoPage() {
  const [widgetOpen, setWidgetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.12),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none" />
      {/* Hero */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-4">
          <HeartPulse className="w-3 h-3" />
          Widget Demo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          See the AI widget in action
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
          Click the button in the bottom-right corner to see how your patients will interact with GetYourDoctor.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-white/40 bg-white/5 rounded-xl px-4 py-2 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Widget is ready — click the chat icon below
        </div>
      </div>

      {/* Widget toggle button */}
      <button
        onClick={() => setWidgetOpen(!widgetOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/40 hover:scale-105 transition-all duration-200 flex items-center justify-center"
      >
        {widgetOpen ? <X className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
      </button>

      {/* Widget popup */}
      <AnimatePresence>
        {widgetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white/[0.04] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">GetYourDoctor Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-xs text-white/70">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-teal-300" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 border border-white/5">
                  <p className="text-sm text-white/70">Hi there! I&apos;m the GetYourDoctor assistant. I can help you book an appointment or answer any questions about the clinic. How can I help you today?</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 justify-end">
                <div className="bg-teal-500/10 rounded-2xl rounded-tr-sm px-4 py-2.5 border border-teal-500/15">
                  <p className="text-sm text-white/80">I&apos;d like to book a checkup for next week.</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Smile className="w-3.5 h-3.5 text-white/40" />
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-teal-300" />
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 border border-white/5">
                  <p className="text-sm text-white/70">Of course! We have availability on Tuesday at 10:00 AM or Thursday at 2:30 PM with Dr. Chen. Which works best for you?</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400/70">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI is typing...
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
                />
                <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
