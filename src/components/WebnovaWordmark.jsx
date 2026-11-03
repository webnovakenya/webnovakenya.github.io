import { Fragment, useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const LETTERS = 'WEBNOVA'.split('')

export default function WebnovaWordmark({
  ready = false,
  reduced = false,
  heroRef,
  orbRef,
  className = '',
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const letterRefs = useRef([])
  const innerRefs = useRef([])
  const markRef = useRef(null)

  useEffect(() => {
    if (reduced) {
      gsap.set(innerRefs.current, { clearProps: 'opacity,transform' })
      gsap.set(markRef.current, { clearProps: 'opacity' })
      return undefined
    }

    const letters = innerRefs.current.filter(Boolean)
    if (!letters.length) return undefined

    // Tweak point: intro timing and stagger for the wordmark reveal.
    gsap.set(letters, { yPercent: 118, rotate: 3, opacity: 0 })
    gsap.set(markRef.current, { opacity: 0 })
    if (!ready) return undefined

    const entrance = gsap.timeline({ delay: 0.12 })
    entrance
      .to(letters, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.12,
        ease: 'power4.out',
        stagger: 0.055,
      })
      .to(markRef.current, { opacity: 1, duration: 0.5 }, '-=0.45')

    return () => entrance.kill()
  }, [ready, reduced])

  useEffect(() => {
    const hero = heroRef?.current
    if (!hero) return undefined

    const media = gsap.matchMedia()

    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const letters = letterRefs.current.filter(Boolean)
      const track = trackRef.current
      if (!letters.length || !track) return undefined

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })

      // Tweak point: scroll spread/parallax strengths.
      timeline.to(
        track,
        { xPercent: -1.2, ease: 'none' },
        0,
      )

      timeline.to(
        letters,
        {
          x: (index) => (index - 3) * window.innerWidth * 0.022,
          y: (index) => Math.abs(index - 3) * -2,
          ease: 'none',
        },
        0,
      )

      if (orbRef?.current) {
        timeline.to(
          orbRef.current,
          {
            scale: 1.07,
            rotation: 3.5,
            yPercent: 8,
            opacity: 0.68,
            ease: 'none',
          },
          0,
        )
      }

      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })

    return () => media.revert()
  }, [heroRef, orbRef])

  return (
    <h1
      ref={rootRef}
      aria-label="Webnova"
      className={`hero-wordmark relative block select-none pb-[0.04em] font-display font-extrabold uppercase leading-[0.9] tracking-[-0.065em] text-bone drop-shadow-[0_8px_60px_rgba(8,8,10,0.55)] md:whitespace-nowrap md:leading-[0.72] ${className}`}
    >
      <span ref={trackRef} aria-hidden="true" className="inline-block will-change-transform">
        {LETTERS.map((letter, index) => (
          <Fragment key={`${letter}-${index}`}>
            <span
              ref={(node) => {
                letterRefs.current[index] = node
              }}
              className="inline-block will-change-transform"
            >
              <span
                ref={(node) => {
                  innerRefs.current[index] = node
                }}
                className="inline-block will-change-transform"
              >
                {letter}
              </span>
            </span>
            {index === 2 && <br className="md:hidden" />}
          </Fragment>
        ))}
        <span
          ref={markRef}
          className="ml-[0.02em] inline-block align-top font-sans text-[0.09em] font-medium leading-none tracking-normal text-royal"
        >
          ®
        </span>
      </span>
    </h1>
  )
}
