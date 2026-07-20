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
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const { signIn } = useAuth()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      await signIn(data.email, data.password)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid credentials')
    }
  }

  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-black/30">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
        <p className="text-sm text-white/40 mt-1.5">Sign in to your GetYourDoctor dashboard</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@clinic.com"
            {...register('email')}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/60 mb-1.5">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200"
          />
          {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <GoogleSignInButton />
      <div className="mt-6 text-center">
        <p className="text-sm text-white/40">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-teal-400 hover:text-teal-300 transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  )
}
