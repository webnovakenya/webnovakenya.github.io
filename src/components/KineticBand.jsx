import { useEffect, useRef } from 'react'
import { Asterisk } from 'lucide-react'
import Magnetic from './Magnetic'
import { gsap } from '../lib/gsap'
import { scrollToSection } from '../lib/scroll'

const disciplines = ['Strategy', 'Design', 'Development', 'Motion']

export default function KineticBand() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return undefined

      const distance = () => Math.max(track.scrollWidth - window.innerWidth + 64, 0)

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="approach"
      data-section="approach"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <div className="relative flex min-h-[88svh] flex-col justify-between overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 dark-grid opacity-45" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 72% 28%, rgba(91,120,255,0.14), transparent 62%), radial-gradient(ellipse 40% 45% at 12% 78%, rgba(140,123,255,0.09), transparent 65%)',
          }}
          aria-hidden="true"
        />
        <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="section-frame relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
            <span className="flex items-center gap-3">
              <Asterisk className="h-3 w-3 text-rust" strokeWidth={1.5} />
              The approach
            </span>
            <span className="hidden sm:inline">One studio / every discipline</span>
            <span className="hidden lg:inline">Scroll to move</span>
          </div>
        </div>

        <div className="relative z-10 mt-10 hidden overflow-hidden lg:block">
          <div
            ref={trackRef}
            className="flex w-max items-center gap-8 pl-10 will-change-transform xl:gap-12"
          >
            {[...disciplines, ...disciplines].map((discipline, index) => (
              <div key={`${discipline}-${index}`} className="flex items-center gap-8 xl:gap-12">
                <span
                  className={`font-display text-[clamp(5rem,10vw,10rem)] font-bold uppercase leading-[0.82] tracking-[-0.06em] ${
                    index % 2 === 1
                      ? 'outline-text'
                      : index % 3 === 2
                        ? 'text-bone/22'
                        : 'text-bone'
                  }`}
                >
                  {discipline}
                </span>
                <Asterisk
                  className={`h-7 w-7 shrink-0 xl:h-10 xl:w-10 ${
                    index % 3 === 1 ? 'text-rust' : 'text-royal'
                  }`}
                  strokeWidth={1.2}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="section-frame relative z-10 lg:hidden">
          <div className="border-t border-white/12">
            {disciplines.map((discipline, index) => (
              <p
                key={discipline}
                className={`flex items-center justify-between gap-4 border-b border-white/12 py-3.5 font-display text-[clamp(2rem,9vw,3.2rem)] font-bold uppercase leading-none tracking-[-0.045em] ${
                  index % 2 === 1 ? 'text-bone/42' : 'text-bone'
                }`}
              >
                <span>{discipline}</span>
                <Asterisk
                  className={`h-4 w-4 shrink-0 ${index % 3 === 1 ? 'text-rust' : 'text-royal'}`}
                  strokeWidth={1.5}
                />
              </p>
            ))}
          </div>
        </div>

        <div className="section-frame relative z-10">
          <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/12 pt-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                How it all connects
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-[1.75] text-bone/68">
                One senior team, from first thought to final build. No hand-offs, no dilution — just
                work that performs as well as it looks.
              </p>
            </div>
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-royal hover:text-royal"
              >
                Start a project
                <Asterisk
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-90"
                  strokeWidth={1.5}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
