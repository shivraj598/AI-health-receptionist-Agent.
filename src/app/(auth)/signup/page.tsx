'use client'

import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#e2edf7] shadow-lg shadow-teal-100/10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h1>
        <p className="text-sm text-slate-500 mt-1.5">Start your 14-day free trial. No credit card needed.</p>
      </div>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Jane"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Smith"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
            />
          </div>
        </div>
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
            placeholder="Create a strong password"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="clinicName" className="block text-sm font-medium text-slate-700 mb-1.5">Clinic name</label>
          <input
            id="clinicName"
            type="text"
            placeholder="VitalCare Clinic"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#d0e2f0] bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-200/30 hover:shadow-lg hover:shadow-teal-200/40 transition-all duration-200 text-sm"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-400 text-center leading-relaxed">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">Privacy Policy</a>.
      </p>
      <div className="mt-6 pt-6 border-t border-[#e2edf7] text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
