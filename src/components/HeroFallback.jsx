const motes = [
  { left: '10%', top: '27%', size: 2, opacity: 0.55 },
  { left: '21%', top: '64%', size: 1.5, opacity: 0.4 },
  { left: '33%', top: '12%', size: 1, opacity: 0.5 },
  { left: '58%', top: '7%', size: 2, opacity: 0.35 },
  { left: '76%', top: '29%', size: 1.5, opacity: 0.6 },
  { left: '88%', top: '59%', size: 2.5, opacity: 0.4 },
  { left: '69%', top: '83%', size: 1, opacity: 0.45 },
  { left: '26%', top: '88%', size: 2, opacity: 0.32 },
]

const shards = [
  {
    className: 'right-[10%] top-[21%] h-5 w-5 rotate-[24deg]',
    clip: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  {
    className: 'left-[9%] bottom-[25%] h-4 w-4 rotate-[12deg]',
    clip: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  },
  {
    className: 'right-[22%] bottom-[16%] h-3 w-3 -rotate-12',
    clip: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  },
]

export default function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative aspect-square w-[84%] max-w-[760px]">
        <div className="absolute inset-[1%] rounded-full bg-[radial-gradient(circle,rgba(91,120,255,0.28)_0%,rgba(91,120,255,0.08)_38%,transparent_69%)]" />
        <div className="hero-orbit hero-orbit-a z-0" />
        <div className="hero-orb absolute inset-[18%] z-10 rounded-full" />
        <div className="absolute inset-[18%] rounded-full bg-[conic-gradient(from_210deg,transparent_0deg,rgba(255,255,255,0.11)_32deg,transparent_70deg,transparent_240deg,rgba(91,120,255,0.16)_268deg,transparent_310deg)] mix-blend-screen" />
        <div className="hero-orbit hero-orbit-b z-20" />
        <div className="absolute left-1/2 top-1/2 z-30 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone shadow-[0_0_26px_7px_rgba(91,120,255,0.5)]" />

        {motes.map((mote) => (
          <span
            key={`${mote.left}-${mote.top}`}
            className="absolute z-30 rounded-full bg-[#b6c5ff]"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              opacity: mote.opacity,
            }}
          />
        ))}

        {shards.map((shard) => (
          <span
            key={shard.className}
            className={`absolute z-30 border border-white/30 bg-gradient-to-br from-white via-[#a9b2c8] to-[#202840] ${shard.className}`}
            style={{ clipPath: shard.clip }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
