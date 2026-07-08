import Link from 'next/link'
import { HeartPulse } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.1),transparent_50%)]" />
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6">
        <HeartPulse className="w-8 h-8 text-white" />
      </div>
      <h1 className="relative text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-3">404</h1>
      <p className="relative text-lg text-white/50 mb-8 text-center max-w-md">
        This page doesn&apos;t exist. It might have been moved or the link might be incorrect.
      </p>
      <Link
        href="/"
        className="relative inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition-all duration-200 text-sm"
      >
        Back to Home
      </Link>
    </div>
  )
}
