import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Dust({ color }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(96 * 3)
    for (let index = 0; index < 96; index += 1) {
      const radius = 2 + Math.random() * 3.4
      const angle = Math.random() * Math.PI * 2
      values[index * 3] = Math.cos(angle) * radius
      values[index * 3 + 1] = (Math.random() - 0.5) * 5
      values[index * 3 + 2] = Math.sin(angle) * radius - 1
    }
    return values
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.025
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.06
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.025} transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  )
}

function Sculpture({ color }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const time = clock.elapsedTime
    ref.current.rotation.y = time * 0.065
    ref.current.rotation.x = 0.35 + Math.sin(time * 0.18) * 0.12
    ref.current.position.y = Math.sin(time * 0.35) * 0.08
  })

  return (
    <group ref={ref} position={[0, 0, -0.4]}>
      <mesh rotation={[1.28, 0.25, 0.2]}>
        <torusGeometry args={[1.45, 0.004, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.82, -0.55, -0.3]}>
        <torusGeometry args={[1.78, 0.003, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[0.8, 0.4, 0]}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function ProjectAtmosphere({ accent, className = '' }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none' }}
      >
        <Sculpture color={accent} />
        <Dust color={accent} />
      </Canvas>
    </div>
  )
}
