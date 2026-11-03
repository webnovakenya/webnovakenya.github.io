import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const xValue = useMotionValue(0)
  const yValue = useMotionValue(0)
  const x = useSpring(xValue, { stiffness: 180, damping: 16, mass: 0.4 })
  const y = useSpring(yValue, { stiffness: 180, damping: 16, mass: 0.4 })

  const handleMove = (event) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    xValue.set((event.clientX - rect.left - rect.width / 2) * strength)
    yValue.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleLeave = () => {
    xValue.set(0)
    yValue.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
