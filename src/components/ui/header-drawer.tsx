'use client'

import React, { createContext, type ReactNode, useState, useEffect } from 'react'
import { Drawer as VaulHeader } from 'vaul'

interface DrawerContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

interface DrawerSidebarProps {
  children: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
  drawerBtn?: (() => ReactNode) | null
}

export function HeaderDrawer({
  children,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  drawerBtn,
}: DrawerSidebarProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen

  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches)
    }

    setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <>
        <VaulHeader.Root
          open={open}
          direction="top"
          onOpenChange={setOpen}
          dismissible={isDesktop ? false : true}
        >
          {drawerBtn && <VaulHeader.Trigger asChild>{drawerBtn()}</VaulHeader.Trigger>}
          <VaulHeader.Portal>
            <VaulHeader.Overlay
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <VaulHeader.Content className="bg-black border-b border-white/10 z-50 w-full h-fit py-3 fixed top-0 left-0">
              {children}
            </VaulHeader.Content>
          </VaulHeader.Portal>
        </VaulHeader.Root>
      </>
    </DrawerContext.Provider>
  )
}

export function DrawerContent({ children }: { children: ReactNode }) {
  return <>{children}</>
}
