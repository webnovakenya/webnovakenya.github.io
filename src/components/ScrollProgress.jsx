import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[110] h-[2px] w-full origin-left bg-gradient-to-r from-royal via-plum to-rust"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
