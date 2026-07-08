import Link from 'next/link'
import { HeartPulse } from 'lucide-react'

export default function ClinicNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7ff] via-white to-[#f0f7ff] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200/30 mb-6">
        <HeartPulse className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Clinic Not Found</h1>
      <p className="text-lg text-slate-500 mb-8 text-center max-w-md">
        We couldn&apos;t find a clinic with that address. It might not exist or the link may be incorrect.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-teal-200/30 hover:shadow-lg transition-all duration-200 text-sm"
      >
        Back to Home
      </Link>
    </div>
  )
}
