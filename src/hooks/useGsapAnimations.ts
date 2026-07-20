'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroTimeline(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 })
      .from('.hero-title-line', { y: 60, opacity: 0, duration: 0.7, stagger: 0.15 }, '-=0.3')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-cta', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
      .from('.hero-badges', { opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.hero-demo', { x: 80, opacity: 0, duration: 0.8 }, '-=0.8')
  }, { scope: ref })
}

export function useStatsCounter(sectionRef: React.RefObject<HTMLDivElement | null>) {
  const countersStarted = useRef(false)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.stat-card')
    if (!cards?.length) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from(cards, { y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        if (countersStarted.current) return
        countersStarted.current = true
        sectionRef.current?.querySelectorAll('.stat-value').forEach((el) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10)
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString()
            },
          })
        })
      },
    })
  }, { scope: sectionRef })
}

export function useSectionReveal(sectionRef: React.RefObject<HTMLDivElement | null>, options?: { trigger?: string; start?: string; from?: 'bottom' | 'left' | 'right'; stagger?: number }) {
  const { trigger, start = 'top 85%', from = 'bottom', stagger = 0.08 } = options || {}
  const triggerEl = trigger ? trigger : sectionRef.current

  useGSAP(() => {
    const children = sectionRef.current?.children
    if (!children?.length) return

    const vars: gsap.TweenVars = {
      opacity: 0,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start,
        toggleActions: 'play none none reverse',
      },
    }
    if (from === 'bottom') { vars.y = 40 }
    else if (from === 'left') { vars.x = -60 }
    else if (from === 'right') { vars.x = 60 }

    gsap.from(children, vars)
  }, { scope: sectionRef })
}

export function useScaleOnScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const cards = ref.current?.querySelectorAll('.scale-card')
    if (!cards?.length) return

    gsap.from(cards, {
      scale: 0.85,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })
}

export function useParallaxBg(ref: React.RefObject<HTMLDivElement | null>, speed?: number) {
  useGSAP(() => {
    const bg = ref.current?.querySelector('.parallax-bg')
    if (!bg) return

    gsap.to(bg, {
      y: () => (speed || 20),
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: ref })
}

export function useFeatureCardsReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const cards = ref.current?.querySelectorAll('.feature-card')
    if (!cards?.length) return

    cards.forEach((card) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.from(card, { y: 50, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from(card.querySelector('.feature-icon'), { scale: 0, rotation: -180, duration: 0.4, ease: 'back.out(2)' }, '-=0.3')
    })
  }, { scope: ref })
}

export function usePricingReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const cards = ref.current?.querySelectorAll('.pricing-card')
    if (!cards?.length) return

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })
}
