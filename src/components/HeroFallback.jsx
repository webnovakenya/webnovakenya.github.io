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

export default function HeroFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative aspect-square w-[84%] max-w-[720px]">
        <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(79,111,255,0.28)_0%,rgba(79,111,255,0.08)_38%,transparent_69%)]" />
        <div className="hero-orbit hero-orbit-a z-0" />
        <div className="hero-orb absolute inset-[18%] z-10 rounded-full" />
        <div className="hero-orbit hero-orbit-b z-20" />
        <div className="absolute left-1/2 top-1/2 z-30 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone shadow-[0_0_26px_7px_rgba(79,111,255,0.5)]" />

        {motes.map((mote) => (
          <span
            key={`${mote.left}-${mote.top}`}
            className="absolute z-30 rounded-full bg-[#aebfff]"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              opacity: mote.opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}
