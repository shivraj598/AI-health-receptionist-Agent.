'use client'

import { useState, useEffect } from 'react'
import { Plus, Phone, Settings, Power, PowerOff, Loader2, Bot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase-client'
import { useBusinessStore } from '@/store/business'
import { DEMO_AGENTS, DEMO_BUSINESS_ID } from '@/hooks/useBusinessData'
import type { AIAgent } from '@/types/database'

export default function AgentsPage() {
  const { id: businessId } = useBusinessStore()
  const supabase = createClient()
  const [agents, setAgents] = useState<AIAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [saving, setSaving] = useState(false)
  const [creatingVapi, setCreatingVapi] = useState(false)

  const loadAgents = () => {
    if (!businessId) return
    if (businessId === DEMO_BUSINESS_ID) {
      setAgents(DEMO_AGENTS)
      setLoading(false)
      return
    }
    supabase.from('ai_agents').select('*').eq('business_id', businessId).then(({ data }) => {
      setAgents(data && data.length > 0 ? data : DEMO_AGENTS)
      setLoading(false)
    })
  }

  useEffect(() => { loadAgents() }, [businessId])

  const toggleActive = async (agent: AIAgent) => {
    await supabase.from('ai_agents').update({ is_active: !agent.is_active }).eq('id', agent.id)
    setAgents(agents.map(a => a.id === agent.id ? { ...a, is_active: !a.is_active } : a))
  }

  const createAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessId || !name.trim()) return
    setSaving(true)
    const { data, error } = await supabase.from('ai_agents').insert({
      business_id: businessId,
      name: name.trim(),
      greeting_message: greeting.trim() || undefined,
    }).select().single()
    if (!error && data) {
      setAgents([...agents, data])
      setName('')
      setGreeting('')
      setShowForm(false)
    }
    setSaving(false)
  }

  const setupVapiAssistant = async (agent: AIAgent) => {
    if (!businessId) return
    setCreatingVapi(true)
    try {
      const res = await fetch('/api/vapi/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId }),
      })
      const data = await res.json()
      if (data.assistant) {
        await supabase.from('ai_agents').update({
          voice: data.assistant.id,
        }).eq('id', agent.id)
        loadAgents()
      }
    } catch (e) {
      console.error('Failed to create Vapi assistant:', e)
    }
    setCreatingVapi(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your AI voice agents and configure their behavior.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Add Agent
        </Button>
      </div>

      {showForm && (
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold">New Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createAgent} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs text-muted-foreground">Agent Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Main Receptionist"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="greeting" className="text-xs text-muted-foreground">Greeting Message</Label>
                  <Input
                    id="greeting"
                    value={greeting}
                    onChange={e => setGreeting(e.target.value)}
                    placeholder="Hi! Thanks for calling..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={saving} className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400">
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Create
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {agents.length === 0 ? (
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <Phone className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-muted-foreground">No AI agents yet. Click &quot;Add Agent&quot; to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {agents.map((agent) => {
            const hasVapi = !!agent.voice
            return (
              <Card key={agent.id} className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-teal-500/30 transition-all duration-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${agent.is_active ? 'bg-gradient-to-br from-teal-400 to-cyan-500' : 'bg-white/10'}`}>
                        <Phone className={`w-5 h-5 ${agent.is_active ? 'text-white' : 'text-white/30'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.greeting_message || 'No greeting set'}</p>
                        {hasVapi && (
                          <p className="text-xs text-teal-400 mt-0.5 flex items-center gap-1">
                            <Bot className="w-3 h-3" /> Vapi AI Assistant Active
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!hasVapi ? (
                        <Button
                          onClick={() => setupVapiAssistant(agent)}
                          disabled={creatingVapi}
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 disabled:opacity-50"
                        >
                          {creatingVapi ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Bot className="w-3 h-3 mr-1" />}
                          {creatingVapi ? 'Setting up...' : 'Deploy to Vapi'}
                        </Button>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          Live
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleActive(agent)}
                        className={agent.is_active ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-white/30 hover:text-white hover:bg-white/10'}
                      >
                        {agent.is_active ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white/30 hover:text-white hover:bg-white/10">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
