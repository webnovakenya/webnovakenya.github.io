import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import ProjectMockup from './ProjectMockup'
import { EASE } from '../../lib/motion'

function PhonePreview({ project }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.4rem] bg-[#080c15] text-bone">
      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-[28%] -translate-x-1/2 rounded-full bg-black" />
      <div className="flex items-center justify-between px-2.5 pb-2 pt-6">
        <span className="grid h-4 w-4 place-items-center rounded-full font-heading text-[5px] font-bold text-ink" style={{ backgroundColor: project.accent }}>
          {project.title.charAt(0)}
        </span>
        <span className="font-mono text-[4px] uppercase tracking-[0.15em] text-white/35">{project.category}</span>
        <span className="flex flex-col gap-0.5">
          <span className="block h-px w-2.5 bg-white/55" />
          <span className="block h-px w-2.5 bg-white/55" />
        </span>
      </div>
      <div className="px-2.5">
        <p className="font-mono text-[4px] uppercase tracking-[0.18em]" style={{ color: project.accent }}>
          Concept preview
        </p>
        <p className="mt-1 font-heading text-[clamp(.72rem,1.4vw,1rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
          {project.title}
        </p>
        <div className="relative mt-2 aspect-[4/3] overflow-hidden bg-white/[0.035]">
          <div
            className="absolute inset-0 opacity-70"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accent}77, transparent 65%)` }}
          />
          <div className="absolute left-[14%] top-[16%] h-[64%] w-[48%] border border-white/15 bg-white/[0.045]" />
          <div className="absolute bottom-[16%] right-[12%] h-[38%] w-[34%] border border-white/10 bg-white/[0.025]" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between">
            <span className="h-[2px] w-[42%] bg-white/25" />
            <span className="h-[2px] w-[16%]" style={{ backgroundColor: project.accent }} />
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <span className="block h-[2px] w-[88%] bg-white/13" />
          <span className="block h-[2px] w-[66%] bg-white/9" />
        </div>
        <span
          className="mt-2 grid h-4 place-items-center font-mono text-[4px] uppercase tracking-[0.1em] text-ink"
          style={{ backgroundColor: project.accent }}
        >
          Explore
        </span>
      </div>
      <div className="absolute bottom-1.5 left-1/2 h-[2px] w-[28%] -translate-x-1/2 rounded-full bg-white/35" />
    </div>
  )
}

function DeviceStill({ project, reduced }) {
  return (
    <div className="relative mx-auto max-w-3xl pb-20 sm:pb-24">
      <div className="relative">
        <div className="rounded-t-xl border border-white/15 bg-[#171d29] p-1.5 shadow-[0_40px_100px_rgba(0,0,0,.45)] sm:p-2.5">
          <motion.div
            layoutId={`project-preview-${project.id}`}
            className="aspect-[16/10] overflow-hidden bg-[#080c15]"
            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          >
            <ProjectMockup project={project} />
          </motion.div>
        </div>
        <div className="relative mx-auto h-3 w-[103%] -translate-x-[1.5%] rounded-b-[14px] bg-gradient-to-b from-[#303849] via-[#1b2230] to-[#10141d] shadow-[0_18px_30px_rgba(0,0,0,.35)]">
          <span className="absolute left-1/2 top-0 h-1 w-[12%] -translate-x-1/2 rounded-b-full bg-black/30" />
        </div>
      </div>
      <div className="absolute -bottom-1 right-0 w-[30%] min-w-[105px] max-w-[180px] sm:-bottom-3 sm:right-3">
        <div className="rounded-[1.7rem] border border-white/20 bg-[#11151e] p-1 shadow-[0_30px_60px_rgba(0,0,0,.45)]">
          <div className="aspect-[9/18] overflow-hidden rounded-[1.3rem]">
            <PhonePreview project={project} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectCaseStudy({ project, onClose, onStart }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const openerRef = useRef(null)
  const reduceMotion = useReducedMotion() ?? false

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

  return (
    <motion.div
      ref={panelRef}
      className="fixed inset-0 z-[180] overflow-y-auto overscroll-contain bg-[#06080f] text-bone"
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
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 78% 18%, ${project.accent}1c, transparent 65%), radial-gradient(ellipse 45% 45% at 20% 80%, rgba(79,111,255,.08), transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 noise opacity-50" aria-hidden="true" />

      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#06080f]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55">
            {project.isConcept ? 'Concept case study' : 'Case study'} / {project.category}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone focus-visible:text-bone"
          >
            <span className="hidden sm:block">Close</span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1600px] gap-12 px-4 pb-24 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:items-start lg:gap-10 lg:pt-20">
        <motion.div
          className="lg:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE, delay: reduceMotion ? 0 : 0.12 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {project.isConcept && (
              <span className="border border-royal/40 bg-royal/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-royal">
                Concept
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">{project.category}</span>
          </div>

          <h2
            id={`case-study-${project.id}`}
            className="mt-6 max-w-xl font-heading text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
          >
            {project.title}
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-bone/68 sm:text-lg">{project.description}</p>

          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/42">Concept toolkit</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/12 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {project.isConcept && (
            <p className="mt-8 max-w-md border-l border-white/15 pl-4 text-sm leading-relaxed text-bone/48">
              This is a self-initiated concept study, not a delivered client project. It is here to
              show how we think, design and build.
            </p>
          )}

          <button
            type="button"
            onClick={() => onStart(project.category)}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-royal px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-bone"
          >
            Start a project like this
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </button>
        </motion.div>

        <motion.div
          className="lg:col-span-7 lg:pl-4"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE, delay: reduceMotion ? 0 : 0.08 }}
        >
          <div className="mb-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-bone/38">
            <span>{project.isConcept ? 'Responsive concept preview' : 'Responsive preview'}</span>
            <span>Desktop / Mobile</span>
          </div>
          <DeviceStill project={project} reduced={reduceMotion} />
        </motion.div>
      </div>
    </motion.div>
  )
}
