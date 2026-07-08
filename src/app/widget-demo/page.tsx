'use client'

import { useState } from 'react'
import { HeartPulse, X, MessageSquareText, Bot, Smile, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WidgetDemoPage() {
  const [widgetOpen, setWidgetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] via-white to-[#f0f7ff]">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/50 text-teal-700 text-xs font-medium mb-4">
          <HeartPulse className="w-3 h-3" />
          Widget Demo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          See the AI widget in action
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Click the button in the bottom-right corner to see how your patients will interact with VitalAI.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white rounded-xl px-4 py-2 border border-[#e2edf7] shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Widget is ready — click the chat icon below
        </div>
      </div>

      {/* Widget toggle button */}
      <button
        onClick={() => setWidgetOpen(!widgetOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-xl shadow-teal-200/40 hover:shadow-2xl hover:shadow-teal-200/50 hover:scale-105 transition-all duration-200 flex items-center justify-center"
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
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#e2edf7] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">VitalAI Assistant</p>
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
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <div className="bg-[#f8faff] rounded-2xl rounded-tl-sm px-4 py-2.5 border border-[#e2edf7]">
                  <p className="text-sm text-slate-700">Hi there! I&apos;m the VitalAI assistant. I can help you book an appointment or answer any questions about the clinic. How can I help you today?</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 justify-end">
                <div className="bg-teal-500/10 rounded-2xl rounded-tr-sm px-4 py-2.5 border border-teal-200/50">
                  <p className="text-sm text-slate-700">I&apos;d like to book a checkup for next week.</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <Smile className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <div className="bg-[#f8faff] rounded-2xl rounded-tl-sm px-4 py-2.5 border border-[#e2edf7]">
                  <p className="text-sm text-slate-700">Of course! We have availability on Tuesday at 10:00 AM or Thursday at 2:30 PM with Dr. Chen. Which works best for you?</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                AI is typing...
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#e2edf7]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
                />
                <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200">
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
