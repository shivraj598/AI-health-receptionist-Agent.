import { cn } from '@/lib/utils'
import type React from 'react'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl'
  borderRadius?: string
  glowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const LiquidGlassCard = ({
  children,
  className = '',
  blurIntensity = 'xl',
  borderRadius = '32px',
  glowIntensity = 'sm',
}: LiquidGlassCardProps) => {
  const blurClasses = {
    sm: 'backdrop-blur-xs',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }

  const glowStyles: Record<string, string> = {
    none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
    xs: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
    sm: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(255, 255, 255, 0.1)',
    md: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
    lg: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
    xl: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
  }

  return (
    <div className={cn('relative', className)} style={{ borderRadius }}>
      <svg className='hidden'>
        <defs>
          <filter id='glass-blur' x='0' y='0' width='100%' height='100%' filterUnits='objectBoundingBox'>
            <feTurbulence type='fractalNoise' baseFrequency='0.003 0.007' numOctaves='1' result='turbulence' />
            <feDisplacementMap in='SourceGraphic' in2='turbulence' scale='200' xChannelSelector='R' yChannelSelector='G' />
          </filter>
        </defs>
      </svg>
      <div
        className={`absolute inset-0 ${blurClasses[blurIntensity]} z-0`}
        style={{ borderRadius, filter: 'url(#glass-blur)' }}
      />
      <div
        className='absolute inset-0 z-10'
        style={{ borderRadius, boxShadow: glowStyles[glowIntensity] }}
      />
      <div
        className='absolute inset-0 z-20'
        style={{
          borderRadius,
          boxShadow:
            'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
        }}
      />
      {children}
    </div>
  )
}
