import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { EASE } from '../lib/motion'

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const instant = setTimeout(onDone, 120)
      return () => clearTimeout(instant)
    }

    let value = 0
    let timeout

    const tick = () => {
      value = Math.min(100, value + Math.max(8, Math.round(Math.random() * 17)))
      setProgress(value)

      if (value < 100) {
        timeout = setTimeout(tick, 35 + Math.random() * 45)
      } else {
        timeout = setTimeout(onDone, 260)
      }
    }

    timeout = setTimeout(tick, 120)
    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-ink p-5 sm:p-8"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-label="Loading Webnova"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 dark-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,120,255,0.2),rgba(91,120,255,0.04)_42%,transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2">
        <span className="hero-orbit hero-orbit-a" />
        <span className="hero-orbit hero-orbit-b" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <Logo height="h-5 sm:h-6" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/65">
          Preparing the experience
        </span>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          className="overflow-hidden"
          initial={{ y: '115%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          <p className="chrome-text font-display text-[clamp(3.25rem,13vw,11rem)] font-extrabold uppercase leading-none tracking-[-0.06em]">
            Webnova
          </p>
        </motion.div>
        <motion.p
          className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="h-px w-8 bg-royal" />
          Independent creative studio
          <span className="h-px w-8 bg-royal" />
        </motion.p>
      </div>

      <div className="relative">
        <div className="h-px w-full overflow-hidden bg-bone/10">
          <motion.div
            className="h-px origin-left bg-gradient-to-r from-royal via-plum to-rust"
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60">
          <span>Design · Develop · Deliver</span>
          <span className="tabular-nums text-bone/75">{String(progress).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  )
}
