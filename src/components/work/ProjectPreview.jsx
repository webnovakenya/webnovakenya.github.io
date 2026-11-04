import { motion } from 'framer-motion'
import ProjectMockup from './ProjectMockup'
import AppPhoneMockup from './AppPhoneMockup'
import LivePreview from './LivePreview'
import { EASE } from '../../lib/motion'

export default function ProjectPreview({
  project,
  layoutId,
  active = false,
  reduced = false,
  className = '',
}) {
  const isApp = project.kind === 'app'
  const transition = { duration: reduced ? 0 : 0.65, ease: EASE }

  if (isApp) {
    return (
      <LivePreview project={project} active={active} reduced={reduced} className={className}>
        <div className="flex h-full w-full items-center justify-center">
          <motion.div
            layoutId={layoutId}
            className="relative h-[94%] max-h-[640px] min-h-[220px] aspect-[9/19.2] rounded-[13%_13%_11%_11%] border border-white/20 bg-[#11151e] p-[0.32em] shadow-[0_35px_90px_rgba(0,0,0,.55)]"
            style={{ fontSize: 'clamp(9px, 2.8vw, 18px)' }}
            transition={transition}
          >
            <span className="absolute -right-[2px] top-[19%] h-[13%] w-[2px] rounded-r-full bg-white/25" />
            <span className="absolute -left-[2px] top-[23%] h-[9%] w-[2px] rounded-l-full bg-white/18" />
            <span className="absolute -left-[2px] top-[35%] h-[9%] w-[2px] rounded-l-full bg-white/18" />
            <div className="relative h-full overflow-hidden rounded-[10%_10%_8%_8%] bg-[#080c15]">
              <span className="absolute left-1/2 top-[0.65em] z-20 h-[1.15em] w-[34%] -translate-x-1/2 rounded-full bg-black" />
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} concept preview`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <AppPhoneMockup project={project} />
              )}
            </div>
          </motion.div>
        </div>
      </LivePreview>
    )
  }

  return (
    <LivePreview project={project} active={active} reduced={reduced} className={className}>
      <motion.div
        layoutId={layoutId}
        className="relative h-full w-full overflow-hidden bg-[#080c15]"
        transition={transition}
      >
        <ProjectMockup project={project} className="h-full w-full" />
      </motion.div>
    </LivePreview>
  )
}
