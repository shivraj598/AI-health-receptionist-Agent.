'use client'

import Link from 'next/link'
export default function LoginPage() {
  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
        <p className="text-sm text-white/40 mt-1.5">Sign in to your GetYourDoctor dashboard</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@clinic.com"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-teal-500 focus:ring-teal-500/20" />
            <span className="text-sm text-white/50">Remember me</span>
          </label>
          <a href="#" className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 text-sm"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-white/40">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  )
}
