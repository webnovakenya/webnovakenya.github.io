import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../lib/motion'

export default function Reveal({ children, className = '', delay = 0, y = 32, once = true }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
