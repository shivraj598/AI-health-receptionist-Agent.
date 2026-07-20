'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Vapi from '@vapi-ai/web'
import { useVoiceStore } from '@/store/voice'

let vapiInstance: Vapi | null = null

function getVapi() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!)
  }
  return vapiInstance
}

export function useVapi() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [transcript, setTranscript] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setIsCallActive: setStoreActive } = useVoiceStore()
  const assistantIdRef = useRef<string | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  const cleanup = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
  }, [])

  const startCall = useCallback(async (assistantId?: string) => {
    const id = assistantId || assistantIdRef.current
    if (!id) {
      setError('No assistant configured. Create an agent in the dashboard first.')
      return
    }

    try {
      const vapi = getVapi()
      setError(null)
      setTranscript([])
      assistantIdRef.current = id

      const onMessage = (msg: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (msg.type === 'transcript' && msg.transcript) {
          setTranscript(prev => [...prev, msg.transcript])
        }
        if (msg.type === 'conversation-update') {
          setIsSpeaking(msg.conversation?.speaking === 'assistant')
        }
      }

      const onSpeechStart = () => setIsSpeaking(true)
      const onSpeechEnd = () => setIsSpeaking(false)
      const onVolumeLevel = (level: number) => setVolumeLevel(level)
      const onCallEnd = () => {
        setIsCallActive(false)
        setStoreActive(false)
        setIsSpeaking(false)
        cleanup()
      }
      const onError = (e: Error) => {
        setError(e.message)
        setIsCallActive(false)
        setStoreActive(false)
        cleanup()
      }

      vapi.on('message', onMessage)
      vapi.on('speech-start', onSpeechStart)
      vapi.on('speech-end', onSpeechEnd)
      vapi.on('volume-level', onVolumeLevel)
      vapi.on('call-end', onCallEnd)
      vapi.on('error', onError)

      cleanupRef.current = () => {
        try { vapi.off('message', onMessage) } catch {}
        try { vapi.off('speech-start', onSpeechStart) } catch {}
        try { vapi.off('speech-end', onSpeechEnd) } catch {}
        try { vapi.off('volume-level', onVolumeLevel) } catch {}
        try { vapi.off('call-end', onCallEnd) } catch {}
        try { vapi.off('error', onError) } catch {}
      }

      await vapi.start(id)
      setIsCallActive(true)
      setStoreActive(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start call')
      setIsCallActive(false)
      setStoreActive(false)
    }
  }, [setStoreActive, cleanup])

  const endCall = useCallback(async () => {
    try {
      getVapi().stop()
    } catch {}
    setIsCallActive(false)
    setStoreActive(false)
    setIsSpeaking(false)
    cleanup()
  }, [setStoreActive, cleanup])

  useEffect(() => {
    return () => {
      if (isCallActive) {
        try { getVapi().stop() } catch {}
        cleanup()
      }
    }
  }, [])

  return {
    isCallActive,
    isSpeaking,
    volumeLevel,
    transcript,
    error,
    startCall,
    endCall,
  }
}
