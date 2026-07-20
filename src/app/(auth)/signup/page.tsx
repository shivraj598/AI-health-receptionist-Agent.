'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  clinicName: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await signUp(data.email, data.password, `${data.firstName} ${data.lastName}`, data.clinicName)
      setSuccess(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  if (success) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/20">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-sm text-white/50">We sent a confirmation link. Click it to activate your account, then sign in.</p>
        <Link href="/login" className="inline-block mt-6 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors">Go to Sign In</Link>
      </div>
    )
  }

  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Create your account</h1>
        <p className="text-sm text-white/40 mt-1.5">Start your 14-day free trial. No credit card needed.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white/60 mb-1.5">First name</label>
            <input id="firstName" type="text" placeholder="Jane" {...register('firstName')} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
            {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white/60 mb-1.5">Last name</label>
            <input id="lastName" type="text" placeholder="Smith" {...register('lastName')} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
            {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
          <input id="email" type="email" placeholder="you@clinic.com" {...register('email')} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
          <input id="password" type="password" placeholder="Create a strong password" {...register('password')} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="clinicName" className="block text-sm font-medium text-white/60 mb-1.5">Clinic name</label>
          <input id="clinicName" type="text" placeholder="Your Clinic Name" {...register('clinicName')} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          {errors.clinicName && <p className="text-xs text-red-400 mt-1">{errors.clinicName.message}</p>}
        </div>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <GoogleSignInButton />
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
