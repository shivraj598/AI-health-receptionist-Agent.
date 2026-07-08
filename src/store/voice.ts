import { create } from 'zustand'

interface VoiceState {
  isCallActive: boolean
  setIsCallActive: (active: boolean) => void
}

export const useVoiceStore = create<VoiceState>((set) => ({
  isCallActive: false,
  setIsCallActive: (active) => set({ isCallActive: active }),
}))
