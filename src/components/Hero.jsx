import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Asterisk } from 'lucide-react'
import HeroFallback from './HeroFallback'
import WebnovaWordmark from './WebnovaWordmark'
import Magnetic from './Magnetic'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'

const HeroOrb = lazy(() => import('./HeroOrb'))

export default function Hero({ ready }) {
  const reduced = useReducedMotion()
  const show = ready || reduced
  const heroRef = useRef(null)
  const orbRef = useRef(null)
  const [sceneReady, setSceneReady] = useState(false)

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseQuery = window.matchMedia('(pointer: coarse)')
    const narrowQuery = window.matchMedia('(max-width: 767px)')

    const update = () => {
      const cores = navigator.hardwareConcurrency || 8
      const memory = navigator.deviceMemory || 8
      setSceneReady(
        !reducedQuery.matches &&
          !coarseQuery.matches &&
          !narrowQuery.matches &&
          cores > 4 &&
          memory > 4,
      )
    }

    update()
    reducedQuery.addEventListener?.('change', update)
    coarseQuery.addEventListener?.('change', update)
    narrowQuery.addEventListener?.('change', update)

    return () => {
      reducedQuery.removeEventListener?.('change', update)
      coarseQuery.removeEventListener?.('change', update)
      narrowQuery.removeEventListener?.('change', update)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink"
    >
      <motion.div
        ref={orbRef}
        className="pointer-events-none absolute -right-[26%] top-[13%] aspect-square w-[92%] sm:-right-[10%] sm:top-[10%] sm:w-[62%] lg:right-[-4%] lg:top-[3%] lg:w-[50vw] lg:max-w-[800px]"
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.7, ease: EASE, delay: 0.2 }}
      >
        <div className="h-full w-full opacity-60 sm:opacity-90 lg:opacity-100">
          {show &&
            (sceneReady ? (
              <Suspense fallback={<HeroFallback />}>
                <HeroOrb />
              </Suspense>
            ) : (
              <HeroFallback />
            ))}
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 74% 30%, rgba(79,111,255,0.09), transparent 60%), radial-gradient(ellipse 65% 72% at 8% 55%, rgba(6,8,15,0.52), transparent 72%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/75 via-ink/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-ink/90 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1680px] flex-col px-4 pb-0 pt-28 sm:px-8 lg:pt-32">
        <motion.div
          className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/80 sm:pb-5 sm:text-[11px]"
          initial={reduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-royal" />
            Independent digital studio
          </span>
          <span className="hidden sm:block">Est. 2026 — Working worldwide</span>
          <span className="sm:hidden">Est. 2026</span>
          <span className="hidden items-center gap-2 whitespace-nowrap [text-shadow:0_1px_12px_rgba(6,8,15,0.9)] xl:flex">
            <Asterisk className="h-3 w-3 text-rust" strokeWidth={1.5} />
            Digital craftsmanship
          </span>
        </motion.div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:py-12">
          <div className="max-w-2xl lg:col-span-8">
            <motion.p
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/70"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            >
              <span className="h-px w-8 bg-bone/30" />
              Creative development agency
            </motion.p>

            <motion.h2
              className="mt-5 font-heading text-[clamp(2.1rem,4.2vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-bone"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            >
              Digital experiences that
              <br className="hidden sm:block" />
              {' '}refuse to be ignored.
            </motion.h2>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            >
              <p className="mt-5 max-w-md text-base leading-relaxed text-bone/72 sm:text-base">
                We design and build websites, storefronts and platforms for ambitious brands — work
                that is felt in the first three seconds and remembered long after.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="group inline-flex items-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:bg-bone sm:text-[13px]"
                  >
                    Start a project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </button>
                </Magnetic>

                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone/80 transition-colors hover:text-bone sm:text-[13px]"
                >
                  See selected work
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:col-span-4 lg:block" aria-hidden="true" />
        </div>

        <motion.div
          className="mt-auto"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
        >
          <div className="mb-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/75 sm:text-[11px]">
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="group flex items-center gap-3 whitespace-nowrap transition-colors hover:text-bone"
            >
              <span className="relative block h-7 w-px overflow-hidden bg-white/15">
                <span className="animate-scroll-line absolute inset-x-0 top-0 block h-2.5 bg-royal" />
              </span>
              Scroll to explore
            </button>

            <span className="hidden items-center gap-5 whitespace-nowrap xl:flex">
              <span>0 projects delivered yet</span>
              <span className="h-px w-5 bg-white/15" />
              <span>Launched 2026</span>
              <span className="h-px w-5 bg-white/15" />
              <span>Worldwide services</span>
            </span>

            <span className="hidden items-center gap-2 whitespace-nowrap sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-royal" />
              Open for enquiries
            </span>
          </div>

          <WebnovaWordmark
            ready={show}
            reduced={reduced}
            heroRef={heroRef}
            orbRef={orbRef}
            className="block translate-y-[8%]"
          />
        </motion.div>
      </div>
    </section>
  )
}
