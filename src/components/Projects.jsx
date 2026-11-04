import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import ProjectPreview from './work/ProjectPreview'
import ProjectCaseStudy from './work/ProjectCaseStudy'
import { projects, WORK_CATEGORIES } from '../data/projects'
import { gsap } from '../lib/gsap'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import { PROJECT_SERVICE_BY_CATEGORY, requestContactIntent } from '../lib/contactIntent'

const AMBIENT_MOTES = [
  { left: '7%', top: '24%', size: 2, delay: '-1.8s', duration: '8s' },
  { left: '18%', top: '72%', size: 1.5, delay: '-4.4s', duration: '10s' },
  { left: '31%', top: '13%', size: 1.5, delay: '-2.6s', duration: '9s' },
  { left: '58%', top: '82%', size: 2, delay: '-5.2s', duration: '11s' },
  { left: '73%', top: '18%', size: 1.5, delay: '-3.4s', duration: '8.5s' },
  { left: '88%', top: '61%', size: 2, delay: '-6.1s', duration: '12s' },
  { left: '48%', top: '43%', size: 1, delay: '-2.2s', duration: '9.5s' },
  { left: '94%', top: '34%', size: 1, delay: '-4.8s', duration: '10.5s' },
]

function whenUnlocked(callback) {
  if (document.body.classList.contains('is-locked')) {
    window.setTimeout(() => whenUnlocked(callback), 80)
    return
  }
  callback()
}

function KindBadge({ project, reduced, compact = false }) {
  const label = project.kind === 'app' ? 'App' : 'Web'
  return (
    <motion.span
      animate={reduced ? undefined : { y: [0, -3, 0], rotate: [-0.6, 0.6, -0.6] }}
      transition={reduced ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#060a14]/65 font-mono uppercase text-bone/72 shadow-[0_12px_35px_rgba(0,0,0,.28)] backdrop-blur-xl ${
        compact ? 'px-2 py-1 text-[8px] tracking-[0.14em]' : 'px-2.5 py-1.5 text-[9px] tracking-[0.16em]'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
      {label}
    </motion.span>
  )
}

function ProjectCard({ project, order, onOpen, reduced }) {
  const tiltRef = useRef(null)
  const depthRef = useRef(null)
  const glareRef = useRef(null)
  const parallaxRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const element = parallaxRef.current
    if (!element || reduced) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { yPercent: 1.8 },
        {
          yPercent: -1.8,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        },
      )
    }, element)

    return () => context.revert()
  }, [reduced])

  useEffect(() => {
    const card = tiltRef.current
    const depth = depthRef.current
    const glare = glareRef.current
    if (!card || !depth || !glare || reduced) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    let rect = null
    let frame = 0
    let visible = false
    let rotateX = 0
    let rotateY = 0
    let targetX = 0
    let targetY = 0
    let glareX = 0
    let glareY = 0
    let targetGlareX = 0
    let targetGlareY = 0
    let glow = 0
    let targetGlow = 0
    let lift = 0
    let targetLift = 0
    let scale = 1
    let targetScale = 1

    const draw = () => {
      frame = 0
      rotateX += (targetX - rotateX) * 0.14
      rotateY += (targetY - rotateY) * 0.14
      glareX += (targetGlareX - glareX) * 0.16
      glareY += (targetGlareY - glareY) * 0.16
      glow += (targetGlow - glow) * 0.16
      lift += (targetLift - lift) * 0.16
      scale += (targetScale - scale) * 0.14

      card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) translate3d(0, ${(-lift).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      depth.style.transform = `translate3d(${(-rotateY * 1.2).toFixed(2)}px, ${(rotateX * 1.2).toFixed(2)}px, 0)`
      glare.style.transform = `translate3d(${glareX.toFixed(2)}px, ${glareY.toFixed(2)}px, 0) translate(-50%, -50%)`
      glare.style.opacity = glow.toFixed(3)

      const moving =
        Math.abs(targetX - rotateX) > 0.01 ||
        Math.abs(targetY - rotateY) > 0.01 ||
        Math.abs(targetGlareX - glareX) > 0.08 ||
        Math.abs(targetGlareY - glareY) > 0.08 ||
        Math.abs(targetGlow - glow) > 0.004 ||
        Math.abs(targetLift - lift) > 0.01 ||
        Math.abs(targetScale - scale) > 0.0002

      if (moving) frame = requestAnimationFrame(draw)
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const reset = () => {
      targetX = 0
      targetY = 0
      targetGlareX = 0
      targetGlareY = 0
      targetGlow = 0
      targetLift = 0
      targetScale = 1
      rect = null
      kick()
    }

    const onEnter = () => {
      if (!visible) return
      rect = card.getBoundingClientRect()
      targetLift = 6
      targetScale = 1.012
      targetGlow = 0.62
      kick()
    }

    const onMove = (event) => {
      if (!visible) return
      if (!rect) rect = card.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      targetX = -(y - 0.5) * 8
      targetY = (x - 0.5) * 8
      targetGlareX = (x - 0.5) * rect.width * 0.68
      targetGlareY = (y - 0.5) * rect.height * 0.68
      targetGlow = 1
      kick()
    }

    const onLeave = () => {
      reset()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (!visible) reset()
      },
      { rootMargin: '80px 0px', threshold: 0 },
    )

    observer.observe(card)
    card.addEventListener('pointerenter', onEnter)
    card.addEventListener('pointermove', onMove)
    card.addEventListener('pointerleave', onLeave)
    card.addEventListener('pointercancel', onLeave)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      card.removeEventListener('pointerenter', onEnter)
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      card.removeEventListener('pointercancel', onLeave)
      card.style.transform = ''
      depth.style.transform = ''
      glare.style.transform = ''
      glare.style.opacity = '0'
    }
  }, [reduced])

  const handleEnter = () => setHovered(true)
  const handleLeave = () => setHovered(false)

  return (
    <div ref={parallaxRef} className="group/card relative h-full">
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2.2rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover/card:opacity-100"
        style={{ background: `radial-gradient(ellipse at 50% 45%, ${project.accent}30, transparent 68%)` }}
        aria-hidden="true"
      />

      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        onPointerCancel={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        aria-haspopup="dialog"
        aria-label={`Open ${project.title} concept case study`}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#070b13] text-left shadow-[0_25px_80px_rgba(0,0,0,.32)] transition-[border-color,box-shadow] duration-500 hover:border-white/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        style={{ willChange: 'transform' }}
      >
        <span
          className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.025)_34%,rgba(6,8,15,.22)_66%,rgba(255,255,255,.045))]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-px z-0 rounded-[calc(1.6rem-1px)] bg-[#080d18]/94 backdrop-blur-2xl"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-x-12 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          aria-hidden="true"
        />
        <span
          ref={glareRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[68%] w-[68%] rounded-full opacity-0 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${project.accent}60, transparent 66%)`,
            transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
          }}
          aria-hidden="true"
        />

        <div ref={depthRef} className="relative z-10 flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#070b13]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent}20, transparent 68%)` }}
              aria-hidden="true"
            />

            {project.kind === 'app' ? (
              <div className="absolute inset-0">
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
                  style={{ background: `radial-gradient(ellipse, ${project.accent}40, transparent 68%)` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-5 inset-y-2 sm:inset-x-8 sm:inset-y-3">
                  <ProjectPreview
                    project={project}
                    layoutId={`project-preview-${project.id}`}
                    active={hovered}
                    reduced={reduced}
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-3 overflow-hidden rounded-[0.95rem] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,.38)] sm:inset-4">
                <ProjectPreview
                  project={project}
                  layoutId={`project-preview-${project.id}`}
                  active={hovered}
                  reduced={reduced}
                />
              </div>
            )}

            <div className="absolute left-4 top-4 z-30 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
              <KindBadge project={project} reduced={reduced} />
              {project.isConcept && (
                <span className="pointer-events-none inline-flex items-center rounded-full border border-white/12 bg-[#060a14]/65 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/52 backdrop-blur-xl">
                  Concept
                </span>
              )}
            </div>

            <span className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#060a14]/60 text-bone/75 backdrop-blur-md transition-all duration-300 group-hover:border-white/35 group-hover:bg-[#060a14]/80 group-hover:text-bone sm:right-5 sm:top-5">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>

            <motion.span
              animate={reduced ? undefined : { y: [0, -4, 0], rotate: [-0.8, 0.8, -0.8] }}
              transition={reduced ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              className="pointer-events-none absolute bottom-3 right-3 z-30 flex items-center gap-2 rounded-full border border-white/14 bg-[#060a14]/72 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/58 shadow-[0_12px_30px_rgba(0,0,0,.3)] backdrop-blur-xl"
              aria-hidden="true"
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: project.accent }} />
              {project.tags[0]}
            </motion.span>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.17em]">
              <span style={{ color: project.accent }}>{project.category}</span>
              <span className="text-bone/32">
                {project.isConcept ? 'Concept' : 'Project'} {String(order).padStart(2, '0')} /{' '}
                {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-3 font-heading text-[clamp(1.7rem,2.7vw,2.5rem)] font-semibold leading-none tracking-[-0.045em] text-bone">
              {project.title}
            </h3>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-bone/55 sm:text-[15px]">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.13em] text-bone/42 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/50 transition-colors group-hover:text-bone">
                Open case study
                <span className="h-px w-5 bg-current opacity-40 transition-transform duration-300 group-hover:scale-x-150" />
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(WORK_CATEGORIES[0])
  const [activeProjectId, setActiveProjectId] = useState(null)
  const tabRefs = useRef([])
  const reduceMotion = useReducedMotion() ?? false

  const filteredProjects = projects.filter((project) => project.category === activeCategory)
  const activeProject = projects.find((project) => project.id === activeProjectId) || null
  const activeCategoryIndex = WORK_CATEGORIES.indexOf(activeCategory)
  const activeProjectIndex = projects.findIndex((project) => project.id === activeProjectId)
  const previousProject = activeProject
    ? projects[(activeProjectIndex - 1 + projects.length) % projects.length]
    : null
  const nextProject = activeProject ? projects[(activeProjectIndex + 1) % projects.length] : null
  const webCount = projects.filter((project) => project.kind === 'web').length
  const appCount = projects.filter((project) => project.kind === 'app').length

  const openProject = useCallback((project) => {
    setActiveProjectId(project.id)
  }, [])

  const closeProject = useCallback(() => {
    setActiveProjectId(null)
  }, [])

  const navigateProject = useCallback(
    (direction) => {
      if (!activeProjectId) return
      const index = projects.findIndex((project) => project.id === activeProjectId)
      if (index < 0) return
      const project = projects[(index + direction + projects.length) % projects.length]
      setActiveCategory(project.category)
      setActiveProjectId(project.id)
    },
    [activeProjectId],
  )

  const startSimilarProject = useCallback((category) => {
    const service = PROJECT_SERVICE_BY_CATEGORY[category]
    setActiveProjectId(null)
    whenUnlocked(() => {
      requestContactIntent(service)
      scrollToSection('project-enquiry', { offset: -88 })
    })
  }, [])

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % WORK_CATEGORIES.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + WORK_CATEGORIES.length) % WORK_CATEGORIES.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = WORK_CATEGORIES.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActiveCategory(WORK_CATEGORIES[nextIndex])
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section id="work" className="relative overflow-hidden bg-ink py-24 text-bone sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 48% 42% at 78% 10%, rgba(79,111,255,0.15), transparent 64%), radial-gradient(ellipse 42% 38% at 8% 86%, rgba(108,92,255,0.1), transparent 66%)',
          }}
        />
        <div
          className="animate-drift absolute -left-[12%] top-[7%] h-[38rem] w-[38rem] rounded-full bg-royal/10 blur-[130px]"
          style={{ animationDelay: '-9s' }}
        />
        <div
          className="animate-drift absolute -right-[8%] top-[42%] h-[34rem] w-[34rem] rounded-full bg-plum/10 blur-[120px]"
          style={{ animationDelay: '-18s', animationDuration: '28s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.075) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 72% 58% at 50% 38%, black, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 72% 58% at 50% 38%, black, transparent 78%)',
          }}
        />
        {AMBIENT_MOTES.map((mote, index) => (
          <span
            key={index}
            className="animate-float-y absolute rounded-full bg-bone/35 shadow-[0_0_12px_rgba(241,237,228,.25)]"
            style={{
              left: mote.left,
              top: mote.top,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDelay: mote.delay,
              animationDuration: mote.duration,
            }}
          />
        ))}
      </div>
      <div className="noise pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="03">Interactive concepts</Eyebrow>
            <SplitHeading
              lines={['Work that earns', 'attention.']}
              className="mt-6 max-w-3xl font-heading text-[clamp(2.6rem,5.5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            />
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-bone/62 sm:text-base">
              A set of interactive concept builds, brought to life end-to-end — strategy, design and
              engineering. Step inside any example to see the thinking, the interface and the details.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/42">
              <span>
                <span className="text-bone/72">{String(projects.length).padStart(2, '0')}</span> concepts
              </span>
              <span className="h-px w-5 bg-white/15" />
              <span>
                <span className="text-bone/72">{String(webCount).padStart(2, '0')}</span> web
              </span>
              <span className="h-px w-5 bg-white/15" />
              <span>
                <span className="text-bone/72">{String(appCount).padStart(2, '0')}</span> app
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-y border-white/10 bg-white/[0.015] backdrop-blur-sm sm:mt-16">
          <div
            className="grid grid-cols-2 gap-1 py-2 sm:flex sm:overflow-x-auto"
            role="tablist"
            aria-label="Concept project categories"
          >
            {WORK_CATEGORIES.map((category, index) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  id={`work-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="work-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveCategory(category)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`relative w-full px-2 py-2.5 text-center font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal sm:w-auto sm:shrink-0 sm:px-4 sm:text-left sm:text-[11px] sm:tracking-[0.14em] ${
                    isActive ? 'text-bone' : 'text-bone/40 hover:text-bone/70'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-tab-indicator"
                      className="absolute inset-0 rounded-sm border border-royal/45 bg-royal/10 shadow-[0_0_28px_rgba(79,111,255,.12)]"
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${activeCategoryIndex}`}
          className="mt-8 sm:mt-10"
        >
          <div className="grid gap-5 lg:min-h-[610px] lg:grid-cols-2 lg:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => {
                const order = projects.findIndex((item) => item.id === project.id) + 1
                return (
                  <motion.div
                    key={project.id}
                    layout
                    className="h-full"
                    initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion ? 0 : index * 0.08,
                      ease: EASE,
                    }}
                  >
                    <ProjectCard
                      project={project}
                      order={order}
                      reduced={reduceMotion}
                      onOpen={() => openProject(project)}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 sm:mt-20 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/42">Your project next</p>
            <p className="mt-3 max-w-md font-heading text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              Have something ambitious in mind?
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="group inline-flex items-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Start a project
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectCaseStudy
            project={activeProject}
            position={activeProjectIndex + 1}
            total={projects.length}
            previousProject={previousProject}
            nextProject={nextProject}
            onNavigate={navigateProject}
            onClose={closeProject}
            onStart={startSimilarProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
