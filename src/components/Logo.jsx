export default function Logo({ className = '', variant = 'mark', height = 'h-6' }) {
  const full = variant === 'full'

  return (
    <img
      src={full ? '/web-logo.png' : '/web-mark.png'}
      alt="Webnova — Design. Develop. Dominate."
      width={354}
      height={full ? 94 : 58}
      draggable={false}
      className={`w-auto select-none ${height} ${className}`}
    />
  )
}
