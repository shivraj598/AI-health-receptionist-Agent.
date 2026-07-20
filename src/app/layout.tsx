import React from 'react'
import '@/styles/globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { TooltipProvider } from '@/components/ui/tooltip'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <TooltipProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}

export default RootLayout
