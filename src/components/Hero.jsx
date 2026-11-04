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
      <div className="pointer-events-none absolute inset-0 dark-grid opacity-45" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 62% 58% at 77% 38%, rgba(91,120,255,0.13), transparent 63%), radial-gradient(ellipse 55% 65% at 6% 40%, rgba(255,107,70,0.045), transparent 66%), linear-gradient(180deg, rgba(8,10,15,0) 0%, rgba(8,10,15,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={orbRef}
        className="pointer-events-none absolute -right-[42%] top-[16%] z-0 aspect-square w-[122%] opacity-70 sm:-right-[18%] sm:top-[10%] sm:w-[78%] sm:opacity-90 lg:right-[-7%] lg:top-[4%] lg:w-[55vw] lg:max-w-[860px] lg:opacity-100"
        initial={reduced ? false : { opacity: 0, scale: 0.88 }}
        animate={show ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.9, ease: EASE, delay: 0.15 }}
      >
        <div className="h-full w-full">
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
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink via-ink/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-ink via-ink/65 to-transparent"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute right-[7%] top-[21%] z-[2] hidden items-center gap-3 xl:flex" aria-hidden="true">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/50">
          Sculpted in light
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-royal shadow-[0_0_18px_rgba(91,120,255,0.8)]" />
      </div>

      <motion.div
        className="glass-panel pointer-events-none absolute bottom-[29%] right-[5%] z-[2] hidden w-56 rounded-2xl p-4 xl:block"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 1 }}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/50">Studio status</span>
          <span className="h-1.5 w-1.5 rounded-full bg-royal" />
        </div>
        <p className="mt-3 font-heading text-[15px] font-semibold leading-snug text-bone">
          Open for select projects in 2026.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45">
          <span>Nairobi / Worldwide</span>
          <Asterisk className="h-3 w-3 text-rust" />
        </div>
      </motion.div>

      <div className="section-frame relative z-10 flex min-h-[100svh] flex-col pb-0 pt-24 lg:pt-28">
        <motion.div
          className="flex items-center justify-between gap-4 border-b border-white/12 pb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/62"
          initial={reduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-royal shadow-[0_0_12px_rgba(91,120,255,0.8)]" />
            Independent digital studio
          </span>
          <span className="hidden sm:block">Nairobi — Working worldwide</span>
          <span className="sm:hidden">Nairobi / Worldwide</span>
          <span className="hidden items-center gap-2 whitespace-nowrap xl:flex">
            <Asterisk className="h-3 w-3 text-rust" strokeWidth={1.5} />
            Est. 2026
          </span>
        </motion.div>

        <div className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-12 lg:py-5">
          <div className="min-w-0 max-w-[54rem] lg:col-span-7 xl:col-span-7">
            <motion.p
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/62"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            >
              <span className="h-px w-8 bg-royal" />
              Creative development agency / 2026
            </motion.p>

            <motion.h2
              className="display-title mt-5 text-[clamp(2rem,10vw,2.7rem)] text-bone sm:text-[clamp(2.7rem,6vw,6rem)]"
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.05, ease: EASE, delay: 0.45 }}
            >
              Digital
              <br />
              experiences
              <br />
              that refuse to
              <br className="sm:hidden" />{' '}
              <span className="text-royal">be ignored.</span>
            </motion.h2>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            >
              <p className="mt-7 max-w-[31rem] text-[15px] leading-[1.75] text-bone/68 sm:text-base">
                We design and build websites, storefronts and platforms for ambitious brands — work
                that is felt in the first three seconds and remembered long after.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:bg-royal sm:text-[12px]"
                  >
                    Start a project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </button>
                </Magnetic>

                <button
                  type="button"
                  onClick={() => scrollToSection('work')}
                  className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70 transition-colors hover:text-bone"
                >
                  See selected work
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </button>
              </div>

              <div className="mt-9 flex max-w-md flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/50">
                <span>Strategy</span>
                <span>Design</span>
                <span>Engineering</span>
                <span className="text-royal">Three disciplines / one studio</span>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:col-span-5 lg:block" aria-hidden="true" />
        </div>

        <motion.div
          className="mt-auto"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
        >
          <div className="mb-5 flex items-center justify-between gap-4 border-t border-white/12 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/62">
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
              <span>Concept-led</span>
              <span className="h-px w-5 bg-white/15" />
              <span>Senior-built</span>
              <span className="h-px w-5 bg-white/15" />
              <span>Globally minded</span>
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
