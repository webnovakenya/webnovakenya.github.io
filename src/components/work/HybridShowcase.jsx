import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Layers, Monitor, Smartphone, Tablet } from 'lucide-react'
import ProjectMockup from './ProjectMockup'
import MobileWebMockup from './MobileWebMockup'
import TabletMockup from './TabletMockup'
import AppPhoneMockup from './AppPhoneMockup'
import { gsap } from '../../lib/gsap'
import { EASE } from '../../lib/motion'

const ProjectAtmosphere = lazy(() => import('./ProjectAtmosphere'))

const VIEWS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'both', label: 'Both', icon: Layers },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
]

function DesktopDevice({ project, layoutId, reduced }) {
  return (
    <div className="relative w-full">
      <div className="relative rounded-[1.15rem] border border-white/16 bg-gradient-to-b from-[#2a3345] via-[#151c29] to-[#0b1019] p-[0.55rem] shadow-[0_50px_120px_rgba(0,0,0,.62)] sm:rounded-[1.4rem] sm:p-[0.7rem]">
        <div className="flex items-center gap-1.5 px-1 pb-[0.45rem]">
          <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-white/8 bg-black/20 px-2.5 py-1">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: project.accent }} />
            <span className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/42">
              {project.id}.webnova.studio
            </span>
          </span>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.12em] text-white/28 sm:block">
            Live
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.7rem] border border-white/10 bg-[#070b13] sm:rounded-[0.85rem]">
          <motion.div
            layoutId={project.kind === 'web' ? layoutId : undefined}
            className="absolute inset-0"
            transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
          >
            <ProjectMockup project={project} className="h-full w-full" />
          </motion.div>
          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.14),transparent_26%,transparent_70%,rgba(255,255,255,.045))] opacity-70 mix-blend-screen"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.035] to-transparent"
            aria-hidden="true"
          />
        </div>
        <div className="flex items-center justify-between px-2 pb-1 pt-[0.42rem]">
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/26">Webnova / device study</span>
          <span className="h-1 w-1 rounded-full bg-white/12" />
        </div>
      </div>
      <div className="relative mx-auto h-2.5 w-[86%] rounded-b-[10px] bg-gradient-to-b from-[#242d3d] to-[#10151f] shadow-[0_14px_26px_rgba(0,0,0,.35)]" />
      <div className="relative mx-auto h-10 w-[26%] rounded-b-[12px] bg-gradient-to-b from-[#1c2432] to-[#0b1019]">
        <span className="absolute left-1/2 top-0 h-1 w-[34%] -translate-x-1/2 rounded-b-full bg-black/30" />
      </div>
      <div className="relative mx-auto h-2 w-[54%] rounded-[50%] bg-gradient-to-b from-[#2a3345] to-[#0b1019] shadow-[0_16px_24px_rgba(0,0,0,.4)]" />
      <div
        className="pointer-events-none mx-auto mt-3 h-12 w-[74%] rounded-[50%] opacity-60 blur-2xl"
        style={{ background: `radial-gradient(ellipse, ${project.accent}36, transparent 68%)` }}
        aria-hidden="true"
      />
    </div>
  )
}

function PhoneDevice({ project, layoutId, reduced }) {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div
        className="pointer-events-none absolute inset-[-12%] rounded-full opacity-70 blur-3xl"
        style={{ background: `radial-gradient(ellipse, ${project.accent}30, transparent 68%)` }}
        aria-hidden="true"
      />
      <motion.div
        layoutId={project.kind === 'app' ? layoutId : undefined}
        className="relative h-full aspect-[9/19.2] rounded-[13%_13%_11%_11%] border border-white/20 bg-[#11151e] p-[0.32em] shadow-[0_45px_100px_rgba(0,0,0,.62)]"
        style={{ fontSize: 'clamp(8px, 1.1vw, 13px)' }}
        transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
      >
        <span className="absolute -right-[2px] top-[19%] h-[10%] w-[2px] rounded-r-full bg-white/25" />
        <span className="absolute -right-[2px] top-[31%] h-[8%] w-[2px] rounded-r-full bg-white/20" />
        <span className="absolute -left-[2px] top-[23%] h-[8%] w-[2px] rounded-l-full bg-white/18" />
        <span className="absolute -left-[2px] top-[33%] h-[8%] w-[2px] rounded-l-full bg-white/18" />
        <div className="relative h-full overflow-hidden rounded-[10%_10%_8%_8%] bg-[#080c15]">
          <span className="absolute left-1/2 top-[0.65em] z-20 h-[1.15em] w-[34%] -translate-x-1/2 rounded-full bg-black" />
          {project.kind === 'app' ? <AppPhoneMockup project={project} /> : <MobileWebMockup project={project} />}
          <span
            className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(120deg,rgba(255,255,255,.16),transparent_28%,transparent_72%,rgba(255,255,255,.05))] opacity-60 mix-blend-screen"
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/4 bg-gradient-to-b from-white/[0.035] to-transparent" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  )
}

function TabletDevice({ project }) {
  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] rounded-[1.45rem] border border-white/18 bg-gradient-to-br from-[#303a4e] via-[#171f2d] to-[#0b1019] p-[0.55rem] shadow-[0_50px_120px_rgba(0,0,0,.6)] sm:rounded-[1.9rem] sm:p-[0.7rem]">
        <span className="absolute -right-[2px] top-[18%] h-[9%] w-[2px] rounded-r-full bg-white/22" />
        <span className="absolute -right-[2px] top-[30%] h-[6%] w-[2px] rounded-r-full bg-white/16" />
        <div className="relative h-full overflow-hidden rounded-[0.95rem] border border-white/10 bg-[#070b13] sm:rounded-[1.2rem]">
          <TabletMockup project={project} />
          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,.14),transparent_24%,transparent_72%,rgba(255,255,255,.045))] opacity-60 mix-blend-screen"
            aria-hidden="true"
          />
          <span className="absolute left-1/2 top-[0.38rem] h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-white/10 bg-black/50" />
        </div>
      </div>
      <div
        className="pointer-events-none mx-auto mt-3 h-12 w-[70%] rounded-[50%] opacity-55 blur-2xl"
        style={{ background: `radial-gradient(ellipse, ${project.accent}30, transparent 68%)` }}
        aria-hidden="true"
      />
    </div>
  )
}

function hiddenState(device, width, height) {
  if (device === 'desktop') {
    return { opacity: 0, x: -width * 0.16, y: height * 0.08, scale: 0.76, rotateX: 2, rotateY: 8, rotateZ: 0 }
  }
  if (device === 'phone') {
    return { opacity: 0, x: width * 0.2, y: height * 0.08, scale: 0.78, rotateX: -1, rotateY: -8, rotateZ: 1 }
  }
  return { opacity: 0, x: 0, y: 0, scale: 0.7, rotateX: 0, rotateY: -6, rotateZ: 0 }
}

function layoutState(view, width, height) {
  const narrow = width < 560
  const medium = width < 780

  const states = {
    desktop: hiddenState('desktop', width, height),
    phone: hiddenState('phone', width, height),
    tablet: hiddenState('tablet', width, height),
  }

  if (view === 'desktop') {
    states.desktop = { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }
  }

  if (view === 'mobile') {
    states.phone = { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }
  }

  if (view === 'tablet') {
    states.tablet = { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }
  }

  if (view === 'both') {
    if (narrow) {
      states.desktop = {
        opacity: 1,
        x: -width * 0.04,
        y: -height * 0.1,
        scale: 0.68,
        rotateX: 3,
        rotateY: 9,
        rotateZ: -0.5,
      }
      states.phone = {
        opacity: 1,
        x: width * 0.19,
        y: height * 0.08,
        scale: 0.79,
        rotateX: -1,
        rotateY: -7,
        rotateZ: 1.2,
      }
    } else if (medium) {
      states.desktop = {
        opacity: 1,
        x: -width * 0.065,
        y: -6,
        scale: 0.7,
        rotateX: 2,
        rotateY: 7,
        rotateZ: -0.4,
      }
      states.phone = {
        opacity: 1,
        x: width * 0.225,
        y: 26,
        scale: 0.8,
        rotateX: -1,
        rotateY: -7,
        rotateZ: 1.2,
      }
    } else {
      states.desktop = {
        opacity: 1,
        x: -width * 0.09,
        y: -4,
        scale: 0.8,
        rotateX: 2,
        rotateY: 7,
        rotateZ: -0.4,
      }
      states.phone = {
        opacity: 1,
        x: width * 0.3,
        y: 18,
        scale: 0.94,
        rotateX: -1,
        rotateY: -7,
        rotateZ: 1.2,
      }
    }
  }

  return states
}

export default function HybridShowcase({ project, layoutId }) {
  const [deviceView, setDeviceView] = useState('both')
  const [canUse3D, setCanUse3D] = useState(false)
  const reduceMotion = useReducedMotion() ?? false
  const stageRef = useRef(null)
  const tiltRef = useRef(null)
  const desktopRef = useRef(null)
  const phoneRef = useRef(null)
  const tabletRef = useRef(null)

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseQuery = window.matchMedia('(pointer: coarse)')
    const narrowQuery = window.matchMedia('(max-width: 767px)')

    const update = () => {
      const cores = navigator.hardwareConcurrency || 8
      const memory = navigator.deviceMemory || 8
      setCanUse3D(
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

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const apply = (animate) => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      const states = layoutState(deviceView, width, height)
      const duration = animate && !reduceMotion ? 0.95 : 0
      const ease = 'power3.inOut'

      const targets = [
        [desktopRef.current, states.desktop],
        [phoneRef.current, states.phone],
        [tabletRef.current, states.tablet],
      ]

      targets.forEach(([element, state]) => {
        if (!element) return
        gsap.to(element, {
          ...state,
          duration,
          ease,
          overwrite: 'auto',
          transformPerspective: 1400,
          transformOrigin: '50% 50%',
        })
      })
    }

    apply(false)

    const observer = new ResizeObserver(() => apply(false))
    observer.observe(stage)

    return () => {
      observer.disconnect()
      gsap.killTweensOf([desktopRef.current, phoneRef.current, tabletRef.current])
    }
  }, [deviceView, reduceMotion])

  useEffect(() => {
    if (!tiltRef.current) return undefined
    gsap.set(tiltRef.current, {
      transformPerspective: 2000,
      transformStyle: 'preserve-3d',
    })
    return () => {
      gsap.killTweensOf(tiltRef.current)
    }
  }, [])

  const handleMove = (event) => {
    if (reduceMotion || !stageRef.current || !tiltRef.current) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    gsap.to(tiltRef.current, {
      rotateX: -y * 3.2,
      rotateY: x * 3.6,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const resetTilt = () => {
    if (!tiltRef.current) return
    gsap.to(tiltRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: reduceMotion ? 0 : 1,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  return (
    <div data-hybrid-showcase data-device-view={deviceView}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Choose device preview"
          className="grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
        >
          {VIEWS.map((view) => {
            const Icon = view.icon
            const isActive = deviceView === view.id
            return (
              <button
                key={view.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setDeviceView(view.id)}
                className="relative rounded-xl px-2 py-2 text-[9px] font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal sm:px-3 sm:text-[10px]"
              >
                {isActive && (
                  <motion.span
                    layoutId="device-view-active"
                    className="absolute inset-0 rounded-xl border border-royal/45 bg-royal/12 shadow-[0_0_22px_rgba(91,120,255,.14)]"
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center gap-1.5 ${isActive ? 'text-bone' : 'text-bone/38'}`}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} style={isActive ? { color: project.accent } : undefined} />
                  {view.label}
                </span>
              </button>
            )
          })}
        </div>
        <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45">
          <span className="h-px w-5 bg-white/14" />
          Desktop / mobile / tablet
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {VIEWS.find((view) => view.id === deviceView)?.label} device preview selected.
      </p>

      <div
        ref={stageRef}
        role="img"
        aria-label={`${project.title} desktop, mobile and tablet concept preview`}
        onPointerMove={handleMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        className="relative h-[clamp(600px,66vh,700px)] overflow-x-clip [perspective:1800px]"
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
          style={{ background: `radial-gradient(ellipse, ${project.accent}2e, transparent 66%)` }}
          aria-hidden="true"
        />
        {canUse3D && (
          <Suspense fallback={null}>
            <ProjectAtmosphere accent={project.accent} className="absolute inset-[-8%] opacity-80" />
          </Suspense>
        )}

        <div ref={tiltRef} className="absolute inset-0 [transform-style:preserve-3d]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(100%,980px)] -translate-x-1/2 -translate-y-1/2"
            aria-hidden={deviceView !== 'desktop' && deviceView !== 'both'}
          >
            <div ref={desktopRef} data-device-layer="desktop" className="will-change-transform" style={{ opacity: 0 }}>
              <DesktopDevice project={project} layoutId={layoutId} reduced={reduceMotion} />
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[min(68vh,610px)] -translate-x-1/2 -translate-y-1/2"
            aria-hidden={deviceView !== 'mobile' && deviceView !== 'both'}
          >
            <div ref={phoneRef} data-device-layer="phone" className="h-full will-change-transform" style={{ opacity: 0 }}>
              <PhoneDevice project={project} layoutId={layoutId} reduced={reduceMotion} />
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[min(100%,780px)] -translate-x-1/2 -translate-y-1/2"
            aria-hidden={deviceView !== 'tablet'}
          >
            <div ref={tabletRef} data-device-layer="tablet" className="will-change-transform" style={{ opacity: 0 }}>
              <TabletDevice project={project} />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-1 left-1/2 h-10 w-[64%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-2xl"
          aria-hidden="true"
        />
      </div>

      <div className="mt-1 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/38">
        <span className="h-px w-8 bg-white/10" />
        Move to explore / switch devices above
        <span className="h-px w-8 bg-white/10" />
      </div>
    </div>
  )
}
