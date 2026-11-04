import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Aperture,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Boxes,
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  FileText,
  Gauge,
  HeartPulse,
  Layers,
  LayoutGrid,
  Leaf,
  LineChart,
  MessageSquare,
  MousePointerClick,
  MoveRight,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Timer,
  Users,
  X,
  Zap,
} from 'lucide-react'
import ProjectMockup from './ProjectMockup'
import AppPhoneMockup from './AppPhoneMockup'
import MobileWebMockup from './MobileWebMockup'
import TabletMockup from './TabletMockup'
import HybridShowcase from './HybridShowcase'
import Magnetic from '../Magnetic'
import { EASE } from '../../lib/motion'

const FEATURE_ICONS = {
  activity: Activity,
  'alert-triangle': AlertTriangle,
  aperture: Aperture,
  'bar-chart': BarChart3,
  'book-open': BookOpen,
  boxes: Boxes,
  'calendar-check': CalendarCheck,
  'calendar-days': CalendarDays,
  compass: Compass,
  'credit-card': CreditCard,
  'file-text': FileText,
  gauge: Gauge,
  'heart-pulse': HeartPulse,
  layers: Layers,
  'layout-grid': LayoutGrid,
  leaf: Leaf,
  'line-chart': LineChart,
  'message-square': MessageSquare,
  'mouse-pointer': MousePointerClick,
  'move-right': MoveRight,
  'shield-check': ShieldCheck,
  'shopping-bag': ShoppingBag,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  sun: Sun,
  timer: Timer,
  users: Users,
  zap: Zap,
}

function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduceMotion = useReducedMotion() ?? false
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) {
      setDisplay(value)
      return undefined
    }

    let frame = 0
    const start = performance.now()
    const duration = 1350

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, value])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

function SectionMarker({ index, children }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/38">
      <span className="text-royal">{index}</span>
      <span className="h-px w-7 bg-white/15" />
      <span>{children}</span>
    </div>
  )
}

function FeatureIcon({ name }) {
  const Icon = FEATURE_ICONS[name] || Sparkles
  return <Icon className="h-5 w-5" strokeWidth={1.45} />
}

function galleryDevice(project, index) {
  if (project.kind === 'app') {
    if (index === 0) return { type: 'phone', label: 'Mobile' }
    if (index === 1) return { type: 'tablet', label: 'Tablet' }
    return { type: 'desktop', label: 'Desktop' }
  }

  if (index === 0) return { type: 'desktop', label: 'Desktop' }
  if (index === 1) return { type: 'phone', label: 'Mobile' }
  return { type: 'tablet', label: 'Tablet' }
}

function GalleryVisual({ project, device }) {
  if (device === 'phone') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#070b13]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 70%, ${project.accent}2b, transparent 64%)` }}
          aria-hidden="true"
        />
        <div className="relative h-[92%] aspect-[9/19.2] rounded-[12%_12%_10%_10%] border border-white/16 bg-[#11151e] p-[3px] shadow-[0_25px_60px_rgba(0,0,0,.5)]">
          <div className="relative h-full overflow-hidden rounded-[9%_9%_7%_7%] bg-[#080c15]">
            <span className="absolute left-1/2 top-[0.4em] z-20 h-2 w-[34%] -translate-x-1/2 rounded-full bg-black" />
            {project.kind === 'app' ? <AppPhoneMockup project={project} /> : <MobileWebMockup project={project} />}
            <span
              className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(120deg,rgba(255,255,255,.12),transparent_30%,transparent_72%,rgba(255,255,255,.04))] mix-blend-screen"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    )
  }

  if (device === 'tablet') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#070b13]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse at 50% 48%, ${project.accent}24, transparent 68%)` }}
          aria-hidden="true"
        />
        <div className="relative aspect-[4/3] w-[86%] max-w-[600px] rounded-[1rem] border border-white/18 bg-gradient-to-br from-[#303a4e] via-[#171f2d] to-[#0b1019] p-[5px] shadow-[0_25px_60px_rgba(0,0,0,.5)]">
          <div className="relative h-full overflow-hidden rounded-[0.7rem] border border-white/10 bg-[#080c15]">
            <TabletMockup project={project} />
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,.12),transparent_26%,transparent_72%,rgba(255,255,255,.04))] mix-blend-screen"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070b13]">
      <div className="absolute inset-0 scale-[1.03]">
        <ProjectMockup project={project} compact />
      </div>
    </div>
  )
}

export default function ProjectCaseStudy({
  project,
  position,
  total,
  previousProject,
  nextProject,
  onNavigate,
  onClose,
  onStart,
}) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const headingRef = useRef(null)
  const galleryRef = useRef(null)
  const openerRef = useRef(null)
  const firstProjectRef = useRef(true)
  const reduceMotion = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({ container: panelRef })
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const { scrollYProgress: galleryProgress } = useScroll({
    container: panelRef,
    target: galleryRef,
    offset: ['start end', 'end start'],
  })
  const galleryY1 = useTransform(galleryProgress, [0, 1], [-20, 20])
  const galleryY2 = useTransform(galleryProgress, [0, 1], [26, -26])
  const galleryY3 = useTransform(galleryProgress, [0, 1], [-14, 14])

  const kindLabel = project.kind === 'app' ? 'Mobile app' : 'Website'
  const layoutId = `project-preview-${project.id}`

  useEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('is-locked')
    window.__lenis?.stop()
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)

      if (!focusable.length) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('is-locked')
      window.__lenis?.start()
      openerRef.current?.focus()
    }
  }, [onClose])

  useEffect(() => {
    if (firstProjectRef.current) {
      firstProjectRef.current = false
      return
    }

    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    headingRef.current?.focus({ preventScroll: true })
  }, [project.id])

  return (
    <motion.div
      ref={panelRef}
      data-lenis-prevent
      className="fixed inset-0 z-[180] overflow-y-auto overscroll-contain bg-[#06080f] text-bone [scrollbar-color:#2c3346_#06080f]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`case-study-${project.id}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 78% 16%, ${project.accent}22, transparent 64%), radial-gradient(ellipse 46% 46% at 14% 76%, rgba(79,111,255,.1), transparent 64%)`,
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 noise opacity-50" aria-hidden="true" />

      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#06080f]/88 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="group inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/62 transition-colors hover:text-bone focus-visible:text-bone"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.5}
            />
            <span className="hidden sm:block">Back to work</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/38 md:flex">
            <span style={{ color: project.accent }}>{project.category}</span>
            <span className="h-px w-5 bg-white/15" />
            <span>{kindLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-bone/32 sm:block">
              {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="group grid h-10 w-10 place-items-center rounded-full border border-white/14 text-bone/60 transition-colors hover:border-white/35 hover:text-bone"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <motion.span
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-royal via-plum to-transparent"
          style={{ scaleX: progressScale }}
          aria-hidden="true"
        />
      </div>

      <div className="relative">
        <div className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-10 sm:px-8 sm:pt-14 lg:pt-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <motion.div
              className="relative z-10 lg:col-span-5"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: reduceMotion ? 0 : 0.08 }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/62 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                  {kindLabel}
                </span>
                {project.isConcept && (
                  <span className="rounded-full border border-royal/40 bg-royal/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-royal">
                    Concept
                  </span>
                )}
              </div>

              <h2
                ref={headingRef}
                tabIndex={-1}
                id={`case-study-${project.id}`}
                className="mt-6 max-w-xl font-heading text-[clamp(2.8rem,5.4vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.065em] outline-none"
              >
                {project.title}
              </h2>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/66 sm:text-lg">{project.description}</p>

              <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-5 gap-y-4 border-y border-white/10 py-5 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/32">Year</dt>
                  <dd className="mt-1.5 text-sm text-bone/72">{project.year}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/32">Format</dt>
                  <dd className="mt-1.5 text-sm text-bone/72">{kindLabel}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/32">Timeline</dt>
                  <dd className="mt-1.5 text-sm text-bone/72">{project.duration}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/32">Scope / toolkit</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/11 bg-white/[0.025] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.13em] text-bone/58"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={() => onStart(project.category)}
                    className="group inline-flex items-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    Start a project like this
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </button>
                </Magnetic>
                <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
                  <span className="h-px w-5 bg-white/18" />
                  {project.role}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="relative lg:col-span-7"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE, delay: reduceMotion ? 0 : 0.14 }}
            >
              <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/30">
                <span>{project.isConcept ? 'Hybrid concept preview' : 'Hybrid device preview'}</span>
                <span>{project.kind === 'app' ? 'App / responsive system' : 'Web / responsive system'}</span>
              </div>
              <HybridShowcase project={project} layoutId={layoutId} />
            </motion.div>
          </div>
        </div>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionMarker index="01">Context</SectionMarker>
              <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                  <h3 className="max-w-3xl font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                    The idea behind {project.title}.
                  </h3>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/62 sm:text-xl">
                    {project.overview}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
                      style={{ background: `radial-gradient(circle, ${project.accent}2e, transparent 70%)` }}
                      aria-hidden="true"
                    />
                    <p className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-bone/38">The challenge</p>
                    <p className="relative mt-4 text-[15px] leading-relaxed text-bone/60">{project.problem}</p>
                    <div className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12">
                        <Sparkles className="h-3.5 w-3.5" style={{ color: project.accent }} strokeWidth={1.5} />
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-bone/32">
                        Designed as a self-initiated study
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionMarker index="02">Experience</SectionMarker>
              <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <h3 className="max-w-2xl font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                  The details that carry the idea.
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-bone/45">
                  Four decisions that shape how the concept feels, reads and works.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-[1.25rem] border border-white/9 bg-white/[0.025] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/18 hover:bg-white/[0.045] sm:p-7"
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6% 0px' }}
                  transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.06, ease: EASE }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `${project.accent}24` }}
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-[0.85rem] border border-white/12 bg-white/[0.04]"
                      style={{ color: project.accent }}
                    >
                      <FeatureIcon name={feature.icon} />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/24">
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="relative mt-5 font-heading text-xl font-semibold tracking-[-0.025em]">{feature.title}</h4>
                  <p className="relative mt-2 max-w-md text-sm leading-relaxed text-bone/48">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionMarker index="03">Concept signals</SectionMarker>
              <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <h3 className="max-w-2xl font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                  What the experience is designed to prove.
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-bone/32">
                  Illustrative targets
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-10 grid overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl sm:grid-cols-3"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {project.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative p-6 sm:p-8 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}
                >
                  <p
                    className="font-heading text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-none tracking-[-0.055em]"
                    style={{ color: index === 0 ? project.accent : undefined }}
                  >
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      prefix={stat.prefix ?? ''}
                      suffix={stat.suffix ?? ''}
                    />
                  </p>
                  <p className="mt-3 text-sm font-medium text-bone/72">{stat.label}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-bone/28">{stat.note}</p>
                </div>
              ))}
            </motion.div>
            <p className="mt-4 text-right font-mono text-[8px] uppercase tracking-[0.16em] text-bone/24">
              Illustrative concept metrics — not client results.
            </p>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionMarker index="04">Process</SectionMarker>
              <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <h3 className="max-w-2xl font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                  From question to interface.
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-bone/45">
                  A compact concept process built to keep the thinking visible at every stage.
                </p>
              </div>
            </motion.div>

            <div className="relative mt-14">
              <motion.div
                className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-white/25 via-white/12 to-transparent lg:block"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, ease: EASE }}
                aria-hidden="true"
              />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {project.process.map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="relative"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-6% 0px' }}
                    transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.08, ease: EASE }}
                  >
                    <span
                      className="relative z-10 block h-[15px] w-[15px] rounded-full border bg-[#06080f]"
                      style={{ borderColor: `${project.accent}aa` }}
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                    </span>
                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/28">
                      Phase 0{index + 1}
                    </p>
                    <h4 className="mt-2 font-heading text-xl font-semibold tracking-[-0.025em]">{step.title}</h4>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone/46">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <SectionMarker index="05">Screens</SectionMarker>
              <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <h3 className="max-w-2xl font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
                  A closer look at the surface.
                </h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-bone/28">
                  Generated concept screens
                </span>
              </div>
            </motion.div>

            <div ref={galleryRef} className="mt-10 grid gap-5 md:grid-cols-3">
              {project.gallery.map((item, index) => {
                const parallax = index === 0 ? galleryY1 : index === 1 ? galleryY2 : galleryY3
                const device = galleryDevice(project, index)
                return (
                  <motion.figure
                    key={item.title}
                    className="group relative"
                    style={{ y: reduceMotion ? 0 : parallax }}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1 }}
                    viewport={{ once: true, margin: '-6% 0px' }}
                    transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.06, ease: EASE }}
                  >
                    <div className="relative overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#070b13] shadow-[0_20px_60px_rgba(0,0,0,.28)] transition-colors duration-500 group-hover:border-white/20">
                      <div className="aspect-[16/10]">
                        <GalleryVisual project={project} device={device.type} />
                      </div>
                      <span className="absolute right-3 top-3 z-20 rounded-full border border-white/12 bg-[#060a14]/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/52 backdrop-blur-md">
                        {device.label}
                      </span>
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ background: `linear-gradient(180deg, transparent 55%, ${project.accent}16)` }}
                        aria-hidden="true"
                      />
                    </div>
                    <figcaption className="mt-3 flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-bone/32">
                          0{index + 1} / {item.title}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-bone/48">{item.caption}</span>
                      </span>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bone/22" strokeWidth={1.5} />
                    </figcaption>
                  </motion.figure>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-10 lg:p-12"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[80px]"
                style={{ background: `radial-gradient(circle, ${project.accent}28, transparent 68%)` }}
                aria-hidden="true"
              />
              <SectionMarker index="06">Illustrative stakeholder note</SectionMarker>
              <blockquote className="relative mt-6 max-w-4xl font-heading text-[clamp(1.55rem,3vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em] text-bone/88">
                “{project.testimonial.quote}”
              </blockquote>
              <div className="relative mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/14 bg-white/[0.04] font-heading text-xs font-semibold" style={{ color: project.accent }}>
                  {project.testimonial.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-bone/70">{project.testimonial.name}</span>
                  <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-bone/28">
                    {project.testimonial.role}
                  </span>
                </span>
              </div>
              <p className="relative mt-6 max-w-xl border-t border-white/10 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-bone/24">
                Fictional persona created for this concept study. Not a client testimonial.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative border-t border-white/10">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20">
            <motion.div
              className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#080d18] p-7 sm:p-10 lg:p-12"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background: `radial-gradient(ellipse at 82% 20%, ${project.accent}26, transparent 58%), radial-gradient(ellipse at 10% 100%, rgba(79,111,255,.12), transparent 56%)`,
                }}
                aria-hidden="true"
              />
              <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/38">Your project next</p>
                  <h3 className="mt-4 max-w-2xl font-heading text-[clamp(2rem,4vw,4rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                    Want this level of care on something real?
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone/48">
                    The concept ends here. The next conversation can start with your brief.
                  </p>
                </div>
                <Magnetic strength={0.22}>
                  <button
                    type="button"
                    onClick={() => onStart(project.category)}
                    className="group inline-flex whitespace-nowrap items-center gap-3 rounded-full bg-royal px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    Start a project
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </button>
                </Magnetic>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                className="group flex items-center justify-between gap-4 rounded-[1rem] border border-white/8 bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-white/18 hover:bg-white/[0.04]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <ChevronLeft className="h-4 w-4 shrink-0 text-bone/30 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-bone/28">Previous project</span>
                    <span className="mt-1 block truncate text-sm font-medium text-bone/65">{previousProject?.title}</span>
                  </span>
                </span>
                <ArrowLeft className="hidden h-4 w-4 text-bone/20 sm:block" strokeWidth={1.2} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(1)}
                className="group flex items-center justify-between gap-4 rounded-[1rem] border border-white/8 bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-white/18 hover:bg-white/[0.04] sm:text-right"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="min-w-0">
                    <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-bone/28">Next project</span>
                    <span className="mt-1 block truncate text-sm font-medium text-bone/65">{nextProject?.title}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-bone/30 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
                <ArrowRight className="hidden h-4 w-4 text-bone/20 sm:block" strokeWidth={1.2} />
              </button>
            </div>

            {project.isConcept && (
              <p className="mt-8 max-w-2xl font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-bone/22">
                This is a self-initiated concept study, not a delivered client project. Metrics are
                illustrative and the stakeholder note is a fictional persona.
              </p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
