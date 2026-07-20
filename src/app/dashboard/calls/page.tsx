'use client'

import { Phone, Clock, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useBusinessData } from '@/hooks/useBusinessData'
import { useState } from 'react'

const STATUS_STYLES: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  missed: 'bg-red-500/10 text-red-400 border-red-500/20',
  ongoing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  incoming: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-white/10 text-white/50 border-white/10',
}

export default function CallsPage() {
  const { calls, loading } = useBusinessData()
  const [search, setSearch] = useState('')

  const filtered = calls.filter(c =>
    c.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.patient_phone?.includes(search)
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 text-teal-400 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calls</h1>
          <p className="text-sm text-muted-foreground mt-1">View call history, transcripts, and recordings.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <Input
            type="text"
            placeholder="Search calls..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardContent className="p-12 text-center">
            <Phone className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-muted-foreground">{calls.length === 0 ? 'No call history yet.' : 'No calls match your search.'}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((call) => (
            <Card key={call.id} className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-teal-500/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-white/5 border border-white/10 text-primary">
                        <Phone className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{call.patient_name || 'Unknown Caller'}</p>
                      <p className="text-xs text-muted-foreground">{call.patient_phone || 'No number'}</p>
                      {call.summary && (
                        <p className="text-xs text-white/30 mt-1 line-clamp-1">{call.summary}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {call.duration_sec && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {Math.floor(call.duration_sec / 60)}m {call.duration_sec % 60}s
                      </span>
                    )}
                    <Badge variant="outline" className={STATUS_STYLES[call.status] || ''}>{call.status}</Badge>
                    <span className="text-xs text-muted-foreground">{new Date(call.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
