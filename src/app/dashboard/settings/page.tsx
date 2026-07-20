'use client'

import { useState, useEffect } from 'react'
import { Loader2, Save, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase-client'
import { useBusinessStore } from '@/store/business'
import { useAuth } from '@/hooks/useAuth'
import { DEMO_BUSINESS_ID } from '@/hooks/useBusinessData'

export default function SettingsPage() {
  const { id: businessId, setBusiness } = useBusinessStore()
  const { user } = useAuth()
  const supabase = createClient()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profileName, setProfileName] = useState('')

  useEffect(() => {
    if (!businessId) return
    if (businessId === DEMO_BUSINESS_ID) {
      setForm({ name: 'Demo Clinic', phone: '+1 (555) 000-0000', email: 'clinic@demo.com', address: '123 Medical Center Dr' })
      setProfileName('Demo User')
      setLoading(false)
      return
    }
    supabase.from('businesses').select('*').eq('id', businessId).single().then(({ data }) => {
      if (data) {
        setForm({ name: data.name, phone: data.phone || '', email: data.email || '', address: data.address || '' })
      }
      setLoading(false)
    })
    if (user?.user_metadata?.full_name) {
      setProfileName(user.user_metadata.full_name as string)
    }
  }, [businessId, user])

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId) return
    setSaving(true)
    const { error } = await supabase.from('businesses').update({
      name: form.name,
      phone: form.phone || null,
      email: form.email || null,
      address: form.address || null,
    }).eq('id', businessId)
    if (!error) {
      setBusiness(businessId, form.name)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your clinic settings, billing, and team.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Clinic Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={saveSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinic-name" className="text-xs text-muted-foreground">Clinic Name</Label>
                <Input
                  id="clinic-name"
                  value={form.name}
                  onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={e => setForm(f => ({...f, phone: e.target.value}))}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    value={form.email}
                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs text-muted-foreground">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={e => setForm(f => ({...f, address: e.target.value}))}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-md"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                {saved && (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" /> Saved!
                  </Badge>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <p className="text-lg font-bold">Free</p>
              </div>
              <Badge variant="outline" className="bg-white/5 text-white/50">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-xs text-muted-foreground">Name</Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email" className="text-xs text-muted-foreground">Email</Label>
              <Input
                id="profile-email"
                value={user?.email || ''}
                disabled
                className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
