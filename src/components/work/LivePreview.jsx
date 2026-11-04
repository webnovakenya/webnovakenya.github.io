import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function LivePreview({ project, children, active = false, reduced = false, className = '' }) {
  const rootRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return undefined

    const cursor = root.querySelector('[data-live-cursor]')
    const cursorPulse = root.querySelector('[data-live-cursor-pulse]')
    const sweep = root.querySelector('[data-live-sweep]')
    const page = root.querySelector('.mock-surface')
    const bars = root.querySelectorAll('[data-live-bar]')
    const taps = root.querySelectorAll('[data-live-tap]')

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        repeat: -1,
        paused: true,
        defaults: { ease: 'power2.inOut' },
      })

      if (cursor) timeline.set(cursor, { xPercent: 0, yPercent: 0, opacity: 0 }, 0)
      if (bars.length) timeline.set(bars, { scaleY: 0, transformOrigin: 'bottom' }, 0)
      if (taps.length) timeline.set(taps, { scale: 1, transformOrigin: 'center' }, 0)

      if (page) {
        timeline.set(page, { scale: 1.028, yPercent: 0 }, 0)
        timeline.to(page, { yPercent: -1.15, duration: 6.2, ease: 'sine.inOut' }, 0)
      }

      if (bars.length) {
        timeline.to(bars, { scaleY: 1, duration: 0.9, stagger: 0.045, ease: 'power3.out' }, 0.35)
      }

      if (sweep) {
        timeline.fromTo(
          sweep,
          { xPercent: -160, opacity: 0 },
          { xPercent: 260, opacity: 0.35, duration: 2.8, ease: 'power1.inOut' },
          0.8,
        )
        timeline.to(sweep, { opacity: 0, duration: 0.8 }, 3.3)
      }

      if (cursor) {
        timeline.to(cursor, { opacity: 1, duration: 0.45 }, 0.55)
        timeline.to(cursor, { xPercent: 10, yPercent: -6, duration: 1.15 }, 0.75)
        timeline.to(cursor, { xPercent: 18, yPercent: 5, duration: 1.3 }, 1.9)
        timeline.to(taps[0] || [], { scale: 0.94, duration: 0.12, ease: 'power2.in' }, 2.75)
        timeline.fromTo(
          cursorPulse,
          { scale: 0.35, opacity: 0.75 },
          { scale: 2.1, opacity: 0, duration: 0.55, ease: 'power2.out' },
          2.75,
        )
        timeline.to(cursor, { xPercent: 7, yPercent: 13, duration: 1.35 }, 3.15)
        timeline.to(cursor, { xPercent: -2, yPercent: 1, duration: 1.45 }, 4.5)
        timeline.to(cursor, { opacity: 0, duration: 0.55 }, 5.7)
        timeline.to(taps[0] || [], { scale: 1, duration: 0.25, ease: 'back.out(1.8)' }, 3)
      }

      timeline.to({}, { duration: 1.3 })
      timelineRef.current = timeline
    }, root)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const timeline = timelineRef.current
        if (!timeline) return
        if (entry.isIntersecting) timeline.play()
        else timeline.pause()
      },
      { rootMargin: '120px 0px', threshold: 0.05 },
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
      timelineRef.current = null
      context.revert()
    }
  }, [project.id, reduced])

  useEffect(() => {
    const timeline = timelineRef.current
    if (timeline) timeline.timeScale(active ? 1.7 : 1)
  }, [active])

  return (
    <div ref={rootRef} className={`relative h-full w-full ${className}`}>
      {children}

      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
          <span
            data-live-sweep
            className="absolute -inset-y-6 left-0 w-[44%] rotate-[12deg] bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0"
          />
          <span data-live-cursor className="absolute inset-0 opacity-0">
            <span className="absolute left-[62%] top-[54%]">
              <span
                data-live-cursor-pulse
                className="absolute -inset-3 rounded-full border border-white/40 opacity-0"
                style={{ transform: 'scale(.35)' }}
              />
              <span className="relative block h-2.5 w-2.5 rounded-full border border-white/80 bg-white/20 shadow-[0_0_14px_rgba(255,255,255,.45)] backdrop-blur-sm" />
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
