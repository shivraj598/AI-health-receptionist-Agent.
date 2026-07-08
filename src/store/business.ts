import { create } from 'zustand'

interface BusinessState {
  id: string | null
  name: string | null
  setBusiness: (id: string, name: string) => void
}

export const useBusinessStore = create<BusinessState>((set) => ({
  id: null,
  name: null,
  setBusiness: (id, name) => set({ id, name }),
}))
