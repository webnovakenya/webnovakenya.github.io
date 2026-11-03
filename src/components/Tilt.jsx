import { useEffect, useRef } from 'react'

export default function Tilt({ children, className = '', max = 6, scale = 1.008, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let rect = null
    let frame = 0
    let rotateX = 0
    let rotateY = 0
    let hovering = false

    const apply = () => {
      frame = 0
      const active = hovering && (Math.abs(rotateX) > 0.02 || Math.abs(rotateY) > 0.02)
      element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${active ? scale : 1})`
    }

    const onEnter = () => {
      hovering = true
      rect = element.getBoundingClientRect()
      element.style.transition = 'transform 160ms ease-out'
    }

    const onMove = (event) => {
      if (!rect) rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      rotateY = x * max
      rotateX = -y * max
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      hovering = false
      rotateX = 0
      rotateY = 0
      rect = null
      element.style.transition = 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)'
      element.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    element.addEventListener('pointerenter', onEnter)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointerenter', onEnter)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [max, scale])

  return (
    <div
      ref={ref}
      className={`[transform-style:preserve-3d] ${className}`}
      style={{ willChange: 'transform' }}
      {...rest}
    >
      {children}
    </div>
  )
}
