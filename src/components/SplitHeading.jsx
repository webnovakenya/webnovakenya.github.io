import { Fragment, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '../lib/gsap'

export default function SplitHeading({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassNames = [],
  delay = 0,
  stagger = 0.014,
  start = 'top 88%',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const label = lines.join(' ')

  useEffect(() => {
    if (reduced || !ref.current) return undefined
    const characters = ref.current.querySelectorAll('.split-char')

    const context = gsap.context(() => {
      gsap.fromTo(
        characters,
        { yPercent: 118, rotate: 5, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
          onComplete: () => {
            gsap.set(characters, { clearProps: 'willChange' })
          },
        },
      )
    }, ref)

    return () => context.revert()
  }, [reduced, delay, stagger, start])

  return (
    <Tag ref={ref} className={className} aria-label={label}>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`} className={`block ${lineClassNames[lineIndex] || ''}`}>
            {line.split(' ').map((word, wordIndex, words) => (
              <Fragment key={`${word}-${wordIndex}`}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  {word.split('').map((character, characterIndex) => (
                    <span
                      key={`${character}-${characterIndex}`}
                      className="split-char inline-block"
                      style={{ willChange: 'transform' }}
                    >
                      {character}
                    </span>
                  ))}
                </span>
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  )
}
