'use client'

import Link from 'next/link'
export default function LoginPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#e2edf7] shadow-lg shadow-teal-100/10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-1.5">Sign in to your VitalAI dashboard</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@clinic.com"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#d0e2f0] text-teal-600 focus:ring-teal-200" />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-200/30 hover:shadow-lg hover:shadow-teal-200/40 transition-all duration-200 text-sm"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  )
}
