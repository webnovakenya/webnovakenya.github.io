import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import Magnetic from './Magnetic'
import Tilt from './Tilt'
import DemoShell from './demos/DemoShell'
import { gsap } from '../lib/gsap'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'

const projects = [
  {
    slug: 'aurora',
    index: '01',
    title: 'Aurora',
    category: 'E-commerce',
    year: '2026',
    image: '/projects/aurora.svg',
    summary:
      'A botanical skincare house reimagined as an editorial commerce experience — quiet, tactile and built to convert.',
    description:
      'Aurora came to us with beautiful products and a storefront that undersold them. We rebuilt the brand’s digital presence around ritual, texture and restraint: a headless storefront with considered product storytelling, a frictionless two-step checkout and a content system the team can shape without touching code.',
    tags: ['Art direction', 'Headless commerce', 'Motion'],
    scope: ['Brand refresh', 'UX & UI design', 'Headless build', 'Checkout & payments', 'CMS'],
    results: [
      { value: '+186%', label: 'Online revenue' },
      { value: '2.4×', label: 'Conversion rate' },
      { value: '38%', label: 'Faster checkout' },
    ],
  },
  {
    slug: 'halcyon',
    index: '02',
    title: 'Halcyon',
    category: 'Business / Portfolio',
    year: '2025',
    image: '/projects/halcyon.svg',
    summary:
      'A quiet digital home for an architecture studio whose work speaks in light, material and silence.',
    description:
      'Halcyon’s practice is about restraint, so their website needed to breathe. We designed an editorial system that puts the photography first, with slow reveals, generous whitespace and a project archive that stays effortless even as the studio’s portfolio grows.',
    tags: ['Strategy', 'Editorial design', 'Development'],
    scope: ['Digital strategy', 'Art direction', 'Web design', 'Front-end build', 'CMS'],
    results: [
      { value: '3.1×', label: 'Enquiry rate' },
      { value: '98', label: 'Lighthouse score' },
      { value: '42%', label: 'Longer sessions' },
    ],
  },
  {
    slug: 'north',
    index: '03',
    title: 'North',
    category: 'Booking platform',
    year: '2025',
    image: '/projects/north.svg',
    summary:
      'A booking experience for design-led cabins in the north — calm on the surface, meticulous underneath.',
    description:
      'North needed a reservation system that felt as considered as their cabins. We built a real-time booking flow with live availability, dynamic pricing and automated confirmations, wrapped in a visual language that lets the landscapes do the talking. The operations team now manages every stay from one dashboard.',
    tags: ['Product design', 'Booking engine', 'Dashboard'],
    scope: ['Product strategy', 'UX & UI design', 'Booking engine', 'Admin dashboard', 'Integrations'],
    results: [
      { value: '+64%', label: 'Direct bookings' },
      { value: '-71%', label: 'Manual admin' },
      { value: '4.9/5', label: 'Guest experience' },
    ],
  },
  {
    slug: 'forge',
    index: '04',
    title: 'Forge',
    category: 'Custom application',
    year: '2024',
    image: '/projects/forge.svg',
    summary:
      'An operations platform that gives a fast-growing logistics team one clear view of everything that matters.',
    description:
      'Forge was running a growing operation across six disconnected tools. We designed and engineered a single operations platform that brings inventory, orders, partners and reporting together — with role-based access, real-time sync and a dashboard built around the decisions the team makes every day.',
    tags: ['Product design', 'React', 'Systems'],
    scope: ['Discovery & research', 'Product design', 'Front-end build', 'API architecture', 'Data visualisation'],
    results: [
      { value: '18h', label: 'Saved weekly' },
      { value: '+31%', label: 'Team throughput' },
      { value: '99.99%', label: 'Uptime' },
    ],
  },
]

function whenShellClosed(callback) {
  const root = document.getElementById('root')
  if (document.body.classList.contains('is-locked') || root?.inert) {
    window.setTimeout(() => whenShellClosed(callback), 80)
    return
  }
  callback()
}

function ProjectCard({ project, index, onOpen }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const reversed = index % 2 === 1

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !cardRef.current || !imageRef.current) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, cardRef)

    return () => context.revert()
  }, [])

  return (
    <article ref={cardRef} className="grid gap-7 lg:grid-cols-12 lg:items-stretch lg:gap-8">
      <motion.div
        className={`relative overflow-hidden bg-ink-2 ${
          reversed ? 'lg:col-span-7 lg:col-start-6 lg:row-start-1' : 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
        }`}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Tilt max={4} scale={1.004}>
          <button
            type="button"
            onClick={onOpen}
            className="group relative block w-full overflow-hidden text-left"
            aria-label={`Open ${project.title} interactive demo`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                ref={imageRef}
                src={project.image}
                alt={`${project.title} project preview`}
                className="project-image h-full w-full scale-[1.12] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="absolute left-5 top-5 hidden border border-bone/25 bg-ink/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/80 sm:block">
              {project.index} / 04
            </span>
            <span className="absolute right-5 top-5 hidden items-center gap-1.5 border border-bone/25 bg-ink/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/80 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live demo
            </span>
            <span className="absolute bottom-5 left-5 flex translate-y-3 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Open live demo
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
          </button>
        </Tilt>
      </motion.div>

      <div
        className={`flex flex-col justify-between ${
          reversed ? 'lg:col-span-4 lg:col-start-1 lg:row-start-1' : 'lg:col-span-4 lg:col-start-9 lg:row-start-1'
        }`}
      >
        <div className="mb-10 hidden items-center justify-between border-t border-ink/15 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 lg:flex">
          <span>{project.index} / 04</span>
          <span>Interactive demo</span>
        </div>
        <Reveal delay={0.05}>
          <div className="flex items-center justify-between border-t border-ink/15 pt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/64">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <button type="button" onClick={onOpen} className="group mt-4 block text-left">
            <h3 className="font-heading text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 group-hover:text-rust">
              {project.title}
            </h3>
          </button>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/75">{project.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-ink/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/66"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="group mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
          >
            Open live demo
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>
        </Reveal>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  const openerRef = useRef(null)

  const openProject = (project) => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setActive(project)
  }

  const closeProject = () => {
    const opener = openerRef.current
    setActive(null)
    whenShellClosed(() => opener?.focus())
  }

  const startSimilar = () => {
    setActive(null)
    whenShellClosed(() => scrollToSection('contact'))
  }

  return (
    <section id="work" className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="03" onLight>
              Interactive examples
            </Eyebrow>
            <SplitHeading
              lines={['Work that earns', 'attention.']}
              className="mt-6 max-w-3xl font-heading text-[clamp(2.6rem,5.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-base">
              A set of interactive concept builds, brought to life end-to-end — strategy, design and
              engineering. Open any example to step inside a working website.
            </p>
            <div className="mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/62">
              <span>04 live demos</span>
              <span className="h-px w-10 bg-ink/20" />
              <span>2024 — 2026</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpen={() => openProject(project)}
            />
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-ink/15 pt-8 sm:mt-28 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/62">Your project next</p>
            <p className="mt-3 max-w-md font-heading text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              Have something ambitious in mind?
            </p>
          </div>
          <Magnetic strength={0.22}>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:bg-rust"
            >
              Start a project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
          </Magnetic>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <DemoShell
            key={active.slug}
            project={active}
            onClose={closeProject}
            onStartProject={startSimilar}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
