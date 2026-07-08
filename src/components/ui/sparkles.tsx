'use client'

import { useId } from 'react'
import Particles from '@tsparticles/react'

interface SparklesProps {
  className?: string
  size?: number
  density?: number
  speed?: number
  opacity?: number
  color?: string
}

export function Sparkles({
  className,
  size = 1.2,
  density = 800,
  speed = 1.5,
  opacity = 1,
  color = '#ffffff',
}: SparklesProps) {
  const id = useId()

  return (
    <Particles
      id={id}
      options={{
        background: { color: { value: 'transparent' } },
        fullScreen: { enable: false, zIndex: 1 },
        fpsLimit: 300,
        particles: {
          color: { value: color },
          move: {
            enable: true,
            speed: { min: speed / 130, max: speed },
            straight: true,
          },
          number: { value: density },
          opacity: {
            value: { min: opacity / 10, max: opacity },
            animation: { enable: true, sync: false, speed: 3 },
          },
          size: {
            value: { min: size / 1.5, max: size },
          },
        },
        detectRetina: true,
      }}
      className={className}
    />
  )
}
