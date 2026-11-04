import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'
import ProjectMockup from './work/ProjectMockup'
import ProjectCaseStudy from './work/ProjectCaseStudy'
import { projects, WORK_CATEGORIES } from '../data/projects'
import { gsap } from '../lib/gsap'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import { PROJECT_SERVICE_BY_CATEGORY, requestContactIntent } from '../lib/contactIntent'

function whenUnlocked(callback) {
  if (document.body.classList.contains('is-locked')) {
    window.setTimeout(() => whenUnlocked(callback), 80)
    return
  }
  callback()
}

function ProjectCard({ project, order, onOpen, reduced }) {
  const tiltRef = useRef(null)
  const depthRef = useRef(null)
  const glareRef = useRef(null)
  const parallaxRef = useRef(null)

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

    const draw = () => {
      frame = 0
      rotateX += (targetX - rotateX) * 0.14
      rotateY += (targetY - rotateY) * 0.14
      glareX += (targetGlareX - glareX) * 0.16
      glareY += (targetGlareY - glareY) * 0.16
      glow += (targetGlow - glow) * 0.16

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) translateZ(0)`
      depth.style.transform = `translate3d(${(-rotateY * 1.3).toFixed(2)}px, ${(rotateX * 1.3).toFixed(2)}px, 0)`
      glare.style.transform = `translate3d(${glareX.toFixed(2)}px, ${glareY.toFixed(2)}px, 0) translate(-50%, -50%)`
      glare.style.opacity = glow.toFixed(3)

      const moving =
        Math.abs(targetX - rotateX) > 0.01 ||
        Math.abs(targetY - rotateY) > 0.01 ||
        Math.abs(targetGlareX - glareX) > 0.08 ||
        Math.abs(targetGlareY - glareY) > 0.08 ||
        Math.abs(targetGlow - glow) > 0.004

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
      rect = null
      kick()
    }

    const onEnter = () => {
      if (!visible) return
      rect = card.getBoundingClientRect()
    }

    const onMove = (event) => {
      if (!visible) return
      if (!rect) rect = card.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      targetX = -(y - 0.5) * 8
      targetY = (x - 0.5) * 8
      targetGlareX = (x - 0.5) * rect.width * 0.7
      targetGlareY = (y - 0.5) * rect.height * 0.7
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

  return (
    <div ref={parallaxRef} className="h-full">
      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-label={`Open ${project.title} concept case study`}
        className="group relative flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#0a0e19] text-left transition-colors duration-500 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={glareRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[72%] w-[72%] rounded-full opacity-0 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${project.accent}55, transparent 66%)`,
            transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
          }}
          aria-hidden="true"
        />

        <div ref={depthRef} className="relative flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#080c15]">
            <motion.div
              layoutId={`project-preview-${project.id}`}
              className="absolute inset-0"
              transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
            >
              <ProjectMockup project={project} />
            </motion.div>
            {project.isConcept && (
              <span className="absolute left-4 top-4 z-10 border border-white/20 bg-[#06080f]/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/85 backdrop-blur-sm">
                Concept
              </span>
            )}
            <span className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#06080f]/60 text-bone/75 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/35 group-hover:text-bone">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>
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
                    className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.13em] text-bone/42"
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

  const openProject = useCallback((project) => {
    setActiveProjectId(project.id)
  }, [])

  const closeProject = useCallback(() => {
    setActiveProjectId(null)
  }, [])

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
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 78% 12%, rgba(79,111,255,0.12), transparent 65%), radial-gradient(ellipse 40% 35% at 8% 88%, rgba(108,92,255,0.07), transparent 65%)',
        }}
        aria-hidden="true"
      />
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
              engineering. Open any example to step inside the thinking.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/42">
              <span>{String(projects.filter((project) => project.isConcept).length).padStart(2, '0')} concept projects</span>
              <span className="h-px w-8 bg-white/15" />
              <span>{String(WORK_CATEGORIES.length).padStart(2, '0')} categories</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-y border-white/10 sm:mt-16">
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
                      className="absolute inset-0 border border-royal/50 bg-royal/10"
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
          <div className="grid gap-5 lg:min-h-[570px] lg:grid-cols-2 lg:gap-6">
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
            key={activeProject.id}
            project={activeProject}
            onClose={closeProject}
            onStart={startSimilarProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
