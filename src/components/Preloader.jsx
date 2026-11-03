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
      value = Math.min(100, value + Math.max(2, Math.round(Math.random() * 8)))
      setProgress(value)

      if (value < 100) {
        timeout = setTimeout(tick, 65 + Math.random() * 55)
      } else {
        timeout = setTimeout(onDone, 380)
      }
    }

    timeout = setTimeout(tick, 260)
    return () => clearTimeout(timeout)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-ink p-5 sm:p-8"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: EASE }}
      aria-label="Loading Webnova"
      role="status"
    >
      <div className="flex items-center justify-between">
        <Logo height="h-5 sm:h-6" />
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/75 sm:text-[11px]">
          Loading experience
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="overflow-hidden"
          initial={{ y: '115%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        >
          <p className="font-display text-[clamp(3.25rem,13vw,11rem)] font-extrabold uppercase leading-none tracking-[-0.05em] text-bone">
            Webnova
          </p>
        </motion.div>
        <motion.p
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.36em] text-bone/72 sm:text-[11px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Digital creative studio
        </motion.p>
      </div>

      <div>
        <div className="h-px w-full overflow-hidden bg-bone/10">
          <motion.div
            className="h-px origin-left bg-royal"
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-bone/72 sm:text-[11px]">
          <span>Design · Develop · Dominate</span>
          <span className="tabular-nums text-bone/75">{String(progress).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  )
}
