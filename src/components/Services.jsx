import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import Tilt from './Tilt'
import ServiceVisual from './ServiceVisuals'
import { scrollToSection } from '../lib/scroll'
import { EASE } from '../lib/motion'

const services = [
  {
    id: 'business',
    index: '01',
    title: 'Business & company websites',
    short: 'Presence with intent',
    description:
      'A confident digital home for your company. We turn what you do into a clear, considered story — with the structure, speed and credibility to grow alongside you.',
    tags: ['Strategy', 'Art direction', 'CMS', 'SEO'],
  },
  {
    id: 'commerce',
    index: '02',
    title: 'E-commerce websites',
    short: 'Commerce that converts',
    description:
      'Storefronts designed to sell. Product storytelling, frictionless checkout, payment integrations and inventory connected into one fast, beautiful commerce experience.',
    tags: ['Shopify / Headless', 'Payments', 'CRO', 'Inventory'],
  },
  {
    id: 'booking',
    index: '03',
    title: 'Booking systems',
    short: 'Reservations, simplified',
    description:
      'Reservations without the back-and-forth. Real-time availability, automated confirmations and a scheduling experience that works as hard as your team does.',
    tags: ['Availability', 'Payments', 'Automations', 'Dashboard'],
  },
  {
    id: 'portfolio',
    index: '04',
    title: 'Portfolio websites',
    short: 'Work, amplified',
    description:
      'Your work deserves better than a template. Editorial layouts, considered motion and case studies that make your best projects impossible to ignore.',
    tags: ['Editorial', 'Motion', 'Case studies', 'Image direction'],
  },
  {
    id: 'app',
    index: '05',
    title: 'Custom web applications',
    short: 'Products, engineered',
    description:
      'Dashboards, portals, management tools and entirely new digital products. Designed around real workflows and engineered for the demands of scale.',
    tags: ['Product design', 'React', 'APIs', 'Cloud'],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const activeService = services[active]

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink-2/80 to-transparent"
        aria-hidden="true"
      />
      <div className="noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02">Capabilities</Eyebrow>
            <SplitHeading
              lines={['Five ways to make', 'your mark.']}
              className="mt-6 max-w-3xl font-heading text-[clamp(2.6rem,5.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-bone/70 sm:text-base">
              Every engagement is built from scratch. Different disciplines, one standard — work that
              looks extraordinary and performs even better.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">
              Explore a capability below
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {services.map((service, index) => {
                const isActive = active === index

                return (
                  <div key={service.id} className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-expanded={isActive}
                      className="group flex w-full items-start gap-4 py-6 text-left sm:gap-7 sm:py-7"
                    >
                      <span
                        className={`mt-1.5 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 ${
                          isActive ? 'text-royal' : 'text-bone/25'
                        }`}
                      >
                        {service.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`flex items-start justify-between gap-4 font-heading text-[clamp(1.35rem,2.6vw,2.4rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em] transition-colors duration-300 ${
                            isActive ? 'text-bone' : 'text-bone/80 group-hover:text-bone/80'
                          }`}
                        >
                          {service.title}
                          <ArrowUpRight
                            className={`mt-1 h-4 w-4 shrink-0 transition-all duration-300 sm:h-5 sm:w-5 ${
                              isActive
                                ? 'translate-x-0 text-royal'
                                : '-translate-x-1 text-bone/20 group-hover:translate-x-0 group-hover:text-bone/70'
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
                              <span className="block max-w-xl pt-3 text-base leading-relaxed text-bone/70">
                                {service.description}
                              </span>
                              <span className="mt-4 flex flex-wrap gap-2">
                                {service.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/75"
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
                        <div className="h-[420px] overflow-hidden border border-white/10 bg-ink-2">
                          <ServiceVisual type={service.id} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4" delay={0.05}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70">
                Need something different?
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone/70 transition-colors hover:text-royal"
              >
                Tell us about it
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </button>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <Tilt
                className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-ink-2"
                max={3}
                scale={1.003}
              >
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink-2/95 px-4 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/72">
                    {activeService.index} / 05
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-royal">
                    In-house
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    className="absolute inset-x-0 bottom-0 top-[41px]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <ServiceVisual type={activeService.id} />
                  </motion.div>
                </AnimatePresence>
              </Tilt>

              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeService.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeService.short}
                  </motion.span>
                </AnimatePresence>
                <span className="text-bone/75">Crafted end-to-end</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
