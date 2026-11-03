import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Info, Lock, X } from 'lucide-react'
import { EASE } from '../../lib/motion'

const demos = {
  aurora: lazy(() => import('./AuroraDemo')),
  halcyon: lazy(() => import('./HalcyonDemo')),
  north: lazy(() => import('./NorthDemo')),
  forge: lazy(() => import('./ForgeDemo')),
}

const paths = {
  aurora: 'aurora.botanical',
  halcyon: 'halcyon.studio',
  north: 'northcabins.co',
  forge: 'app.forge.ops',
}

export default function DemoShell({ project, onClose, onStartProject }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const dialogRef = useRef(null)
  const infoButtonRef = useRef(null)
  const infoCloseRef = useRef(null)
  const infoOpenRef = useRef(false)
  const closeHandlerRef = useRef(onClose)

  infoOpenRef.current = infoOpen
  closeHandlerRef.current = onClose

  const Demo = demos[project.slug]

  useEffect(() => {
    const lenis = window.__lenis
    const root = document.getElementById('root')
    const previousOverflow = document.body.style.overflow
    const previousInert = root?.inert ?? false
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    document.body.classList.add('is-locked')
    if (root) root.inert = true
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 90)

    const onKey = (event) => {
      if (event.key !== 'Escape') return
      if (infoOpenRef.current) {
        setInfoOpen(false)
        window.setTimeout(() => infoButtonRef.current?.focus(), 80)
      } else {
        closeHandlerRef.current()
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(focusTimer)
      lenis?.start()
      document.body.style.overflow = previousOverflow
      document.body.classList.remove('is-locked')
      if (root) root.inert = previousInert
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (!infoOpen) return undefined
    const timer = window.setTimeout(() => infoCloseRef.current?.focus(), 80)
    return () => window.clearTimeout(timer)
  }, [infoOpen])

  const closeInfo = () => {
    setInfoOpen(false)
    window.setTimeout(() => infoButtonRef.current?.focus(), 80)
  }

  const shell = (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      style={{ outline: 'none' }}
      className="fixed inset-0 z-[240] flex flex-col bg-ink text-bone"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} interactive website preview`}
    >
      <header className="relative z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#0b0d12] px-3 text-white sm:h-16 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="hidden h-4 w-px bg-white/12 sm:block" />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Back to examples</span>
            <span className="sm:hidden">Back</span>
          </button>
          <span className="hidden h-4 w-px shrink-0 bg-white/12 sm:block" />
          <span className="min-w-0 truncate font-heading text-sm font-semibold tracking-[-0.02em] text-white/85">
            {project.title}
          </span>
        </div>

        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 md:flex">
          <Lock className="h-3 w-3 text-emerald-400/80" strokeWidth={2} />
          <span className="max-w-[30vw] truncate font-mono text-[10px] tracking-[0.04em] text-white/55">
            webnova.studio/preview/{project.slug}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live demo
          </span>
          <button
            ref={infoButtonRef}
            type="button"
            onClick={() => setInfoOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/65 transition-colors hover:border-white/25 hover:text-white"
            aria-label="Open build notes"
          >
            <Info className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden lg:inline">Build notes</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-white/75 transition-colors hover:bg-white hover:text-ink"
            aria-label="Close demo and return to Webnova"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
        <Suspense
          fallback={
            <div className="flex min-h-full items-center justify-center bg-[#0b0d12]">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-white/15 border-t-white/70 motion-reduce:animate-none" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  Loading {project.title}
                </p>
              </div>
            </div>
          }
        >
          <Demo />
        </Suspense>
      </div>

      <AnimatePresence>
        {infoOpen && (
          <>
            <motion.button
              type="button"
              className="absolute inset-0 z-30 cursor-default bg-ink/65 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeInfo}
              aria-label="Close build notes"
              tabIndex={-1}
            />
            <motion.aside
              className="absolute right-0 top-0 z-40 flex h-full w-full max-w-md flex-col overflow-y-auto bg-bone text-ink shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="build-notes-title"
              data-lenis-prevent
            >
              <div className="flex items-center justify-between border-b border-ink/12 px-6 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">Build notes</p>
                <button
                  ref={infoCloseRef}
                  type="button"
                  onClick={closeInfo}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:text-ink"
                  aria-label="Close build notes"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              <div className="flex-1 px-6 py-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">
                  {project.category} · {project.year}
                </p>
                <h2
                  id="build-notes-title"
                  className="mt-3 font-heading text-4xl font-semibold tracking-[-0.04em]"
                >
                  {project.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{project.description}</p>

                <div className="mt-7 grid grid-cols-3 gap-3 border-y border-ink/12 py-5">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <p className="font-heading text-xl font-semibold tracking-[-0.03em]">{result.value}</p>
                      <p className="mt-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-ink/50">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Scope</p>
                <ul className="mt-3">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between border-b border-ink/10 py-2.5 text-sm text-ink/65"
                    >
                      {item}
                      <span className="h-1 w-1 rounded-full bg-rust" />
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[12px] leading-relaxed text-ink/45">
                  This is a self-contained product demo. Orders, bookings and enquiries stay in your browser and are
                  never submitted anywhere.
                </p>
              </div>

              <div className="border-t border-ink/12 p-6">
                <button
                  type="button"
                  onClick={onStartProject}
                  className="group inline-flex w-full items-center justify-between gap-3 bg-ink px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-rust"
                >
                  Start something similar
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </button>
                <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.15em] text-ink/35">
                  {paths[project.slug]}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return createPortal(<MotionConfig reducedMotion="user">{shell}</MotionConfig>, document.body)
}
