import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import Tilt from './Tilt'
import ServiceVisual from './ServiceVisuals'
import { scrollToSection } from '../lib/scroll'
import { EASE } from '../lib/motion'

const ServiceSculpture = lazy(() => import('./ServiceSculpture'))

const services = [
  {
    id: 'business',
    index: '01',
    title: 'Business & company websites',
    display: 'Company websites',
    short: 'Presence with intent',
    description:
      'A confident digital home for your company. We turn what you do into a clear, considered story — with the structure, speed and credibility to grow alongside you.',
    tags: ['Strategy', 'Art direction', 'CMS', 'SEO'],
  },
  {
    id: 'commerce',
    index: '02',
    title: 'E-commerce websites',
    display: 'Online stores',
    short: 'Commerce that converts',
    description:
      'Storefronts designed to sell. Product storytelling, frictionless checkout, payment integrations and inventory connected into one fast, beautiful commerce experience.',
    tags: ['Shopify / Headless', 'Payments', 'CRO', 'Inventory'],
  },
  {
    id: 'booking',
    index: '03',
    title: 'Booking systems',
    display: 'Booking systems',
    short: 'Reservations, simplified',
    description:
      'Reservations without the back-and-forth. Real-time availability, automated confirmations and a scheduling experience that works as hard as your team does.',
    tags: ['Availability', 'Payments', 'Automations', 'Dashboard'],
  },
  {
    id: 'portfolio',
    index: '04',
    title: 'Portfolio websites',
    display: 'Portfolio sites',
    short: 'Work, amplified',
    description:
      'Your work deserves better than a template. Editorial layouts, considered motion and case studies that make your best projects impossible to ignore.',
    tags: ['Editorial', 'Motion', 'Case studies', 'Image direction'],
  },
  {
    id: 'app',
    index: '05',
    title: 'Custom web applications',
    display: 'Web applications',
    short: 'Products, engineered',
    description:
      'Dashboards, portals, management tools and entirely new digital products. Designed around real workflows and engineered for the demands of scale.',
    tags: ['Product design', 'React', 'APIs', 'Cloud'],
  },
]

const accents = {
  business: '#5b78ff',
  commerce: '#ff6b46',
  booking: '#8c7bff',
  portfolio: '#ded8ca',
  app: '#8be0c0',
}

function SculptureFallback({ accent, index }) {
  return (
    <div className="absolute inset-x-0 top-0 h-[78%] overflow-hidden" aria-hidden="true">
      <span
        className="absolute right-5 top-20 font-display text-[8.5rem] font-bold leading-none tracking-[-0.08em] opacity-[0.045]"
        style={{ color: accent }}
      >
        {index}
      </span>
      <div className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 sm:h-[17rem] sm:w-[17rem]">
        <div
          className="absolute inset-0 rounded-full opacity-45 blur-3xl"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 68%)` }}
        />
        <div
          className="absolute inset-[6%] rounded-full shadow-[inset_-18px_-24px_45px_rgba(0,0,0,0.55),inset_16px_18px_38px_rgba(255,255,255,0.32),0_35px_70px_rgba(0,0,0,0.45)]"
          style={{
            background: `conic-gradient(from 215deg at 62% 38%, #f2efe7, #8c94a8 18%, ${accent} 36%, #101728 52%, #c8cdda 70%, #5c6475 84%, #f2efe7)`,
          }}
        />
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_33%_24%,rgba(255,255,255,0.72),transparent_31%,rgba(3,7,16,0.34)_72%)]" />
        <div
          className="absolute left-1/2 top-1/2 h-[124%] w-[124%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border opacity-50"
          style={{ borderColor: accent, transform: 'translate(-50%,-50%) rotate(-24deg) scaleY(0.36)' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[142%] w-[142%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/20 opacity-60"
          style={{ transform: 'translate(-50%,-50%) rotate(38deg) scaleY(0.28)' }}
        />
        <span
          className="absolute left-[18%] top-[22%] h-2.5 w-2.5 rotate-45 border border-white/60 bg-white/20 backdrop-blur-sm"
        />
        <span
          className="absolute bottom-[16%] right-[17%] h-2 w-2 rotate-12 border"
          style={{ borderColor: accent, background: `${accent}33` }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-2 to-transparent" />
    </div>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)
  const [canRender3D, setCanRender3D] = useState(false)
  const activeService = services[active]

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      const cores = navigator.hardwareConcurrency || 8
      const memory = navigator.deviceMemory || 8
      setCanRender3D(
        query.matches &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
          cores > 4 &&
          memory > 4,
      )
    }

    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 dark-grid opacity-55" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-32 h-[38rem] w-[38rem] rounded-full bg-royal/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="section-frame relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/12 pb-5">
          <Eyebrow index="02">Capabilities</Eyebrow>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
            <span className="h-1.5 w-1.5 rounded-full bg-royal" />
            Five disciplines / one standard
          </span>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SplitHeading
              lines={['Five ways to make', 'your mark.']}
              className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-[15px] leading-[1.8] text-bone/70 sm:text-base">
              Every engagement is built from scratch. Different disciplines, one standard — work that
              looks extraordinary and performs even better.
            </p>
            <p className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">
              <span className="h-px w-8 bg-royal/70" />
              Explore a capability below
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <div className="border-t border-white/12">
              {services.map((service, index) => {
                const isActive = active === index

                return (
                  <div key={service.id} className="border-b border-white/12">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-expanded={isActive}
                      className="group flex w-full items-start gap-4 py-6 text-left sm:gap-7 sm:py-7"
                    >
                      <span
                        className={`mt-1.5 font-mono text-[10px] tracking-[0.18em] transition-colors duration-300 ${
                          isActive ? 'text-royal' : 'text-bone/30'
                        }`}
                      >
                        {service.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`flex items-start justify-between gap-4 font-display text-[clamp(1.45rem,2.7vw,2.5rem)] font-bold uppercase leading-[1.02] tracking-[-0.04em] transition-colors duration-300 ${
                            isActive ? 'text-bone' : 'text-bone/52 group-hover:text-bone/82'
                          }`}
                        >
                          {service.title}
                          <ArrowUpRight
                            className={`mt-1 h-4 w-4 shrink-0 transition-all duration-300 sm:h-5 sm:w-5 ${
                              isActive
                                ? 'translate-x-0 text-royal'
                                : '-translate-x-1 text-bone/25 group-hover:translate-x-0 group-hover:text-bone/70'
                            }`}
                            strokeWidth={1.5}
                          />
                        </span>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              className="block overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                            >
                              <span className="block max-w-xl pt-4 text-[15px] leading-[1.75] text-bone/68">
                                {service.description}
                              </span>
                              <span className="mt-4 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/62"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>

                    {isActive && (
                      <div className="pb-6 lg:hidden">
                        <div className="h-[420px] overflow-hidden rounded-2xl border border-white/12 bg-ink-2">
                          <ServiceVisual type={service.id} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <Reveal className="mt-9 flex flex-wrap items-center justify-between gap-4" delay={0.05}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                Need something different?
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/75 transition-colors hover:text-royal"
              >
                Tell us about it
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Tilt
                className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/12 bg-gradient-to-b from-ink-3/80 to-ink-2"
                max={2.2}
                scale={1.002}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(91,120,255,0.16),transparent_58%)]" />
                {canRender3D ? (
                  <Suspense fallback={<SculptureFallback accent={accents[activeService.id]} index={activeService.index} />}>
                    <ServiceSculpture accent={accents[activeService.id]} />
                  </Suspense>
                ) : (
                  <SculptureFallback accent={accents[activeService.id]} index={activeService.index} />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[62%] bg-gradient-to-t from-ink-2 via-ink-2/82 to-transparent" />
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink/38 px-5 py-4 backdrop-blur-md">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/58">
                    Capability lab / {activeService.index}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-royal">
                    <span className="h-1 w-1 rounded-full bg-royal" />
                    In-house
                  </span>
                </div>

                <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-5 sm:bottom-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/52">
                            {activeService.short}
                          </p>
                          <p className="mt-1.5 font-display text-3xl font-bold uppercase leading-[0.94] tracking-[-0.04em] text-bone">
                            {activeService.display}
                          </p>
                        </div>
                        <MoveUpRight className="mt-1 h-4 w-4 shrink-0 text-royal" strokeWidth={1.5} />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeService.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/12 bg-ink/45 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-bone/66 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/12 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/48">
                        <span>Built end-to-end</span>
                        <span>Strategy — launch</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Tilt>

              <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-bone/45">
                <span>Object study / {canRender3D ? 'rendered live' : 'art direction'}</span>
                <span>0{active + 1} — 05</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
