'use client'

import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
        <p className="text-sm text-white/40 mt-1.5">Start your 14-day free trial. No credit card needed.</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white/60 mb-1.5">First name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Jane"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white/60 mb-1.5">Last name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Smith"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
            />
          </div>
        </div>
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
            placeholder="Create a strong password"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="clinicName" className="block text-sm font-medium text-white/60 mb-1.5">Clinic name</label>
          <input
            id="clinicName"
            type="text"
            placeholder="Your Clinic Name"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 text-sm"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-xs text-white/40 text-center leading-relaxed">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-teal-400 hover:text-teal-300 font-medium">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-teal-400 hover:text-teal-300 font-medium">Privacy Policy</a>.
      </p>
      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-sm text-white/40">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
