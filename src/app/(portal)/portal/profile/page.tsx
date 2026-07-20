'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/hooks/useAuth'

export default function PortalProfilePage() {
  const { user } = useAuth()
  const supabase = createClient()
  const fullName = (user?.user_metadata?.full_name as string) || user?.email?.split('@')[0] || 'User'
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const [name, setName] = useState(fullName)
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    await supabase.from('profiles').update({ full_name: name, phone: phone || null }).eq('id', user.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white tracking-tight mb-1">My Profile</h1>
      <p className="text-sm text-white/40 mb-6">Manage your personal information and preferences.</p>
      <div className="bg-white/[0.04] backdrop-blur-2xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{fullName}</h2>
            <p className="text-sm text-white/50">{user?.email}</p>
          </div>
        </div>
        <form onSubmit={saveProfile} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
            <input type="email" value={user?.email || ''} disabled className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white/50 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(503) 555-0199" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 transition-all duration-200" />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && <span className="text-xs text-emerald-400">Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
