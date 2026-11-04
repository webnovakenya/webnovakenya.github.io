import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { ACESFilmicToneMapping, MathUtils } from 'three'

function Knot({ accent }) {
  const group = useRef(null)
  const inner = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += delta * 0.16
    group.current.rotation.x = Math.sin(t * 0.22) * 0.15 - 0.08
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.1
      inner.current.rotation.y += delta * 0.08
    }
  })

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={2.6} color="#fff8ee" />
      <pointLight position={[-4, 2, 3]} intensity={20} distance={12} color={accent} />
      <pointLight position={[4, -3, 2]} intensity={12} distance={10} color="#ff7b55" />

      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3.4} position={[0, 4, -6]} scale={[8, 8, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.2} position={[-5, 0, 2]} scale={[4, 7, 1]} color={accent} />
        <Lightformer form="rect" intensity={1.5} position={[5, 1, 3]} scale={[4, 4, 1]} color="#ffb89f" />
        <Lightformer form="ring" intensity={2} position={[0, -4, 1]} scale={3} color={accent} />
      </Environment>

      <group ref={group} rotation={[0.38, 0.2, 0.1]}>
        <mesh>
          <torusKnotGeometry args={[0.92, 0.285, 184, 28, 2, 3]} />
          <meshStandardMaterial color="#c5cad6" metalness={0.95} roughness={0.16} envMapIntensity={1.2} />
        </mesh>
        <mesh scale={1.045}>
          <torusKnotGeometry args={[0.92, 0.285, 120, 16, 2, 3]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={0.09} depthWrite={false} />
        </mesh>
      </group>

      <group ref={inner}>
        <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[1.85, 0.006, 4, 200]} />
          <meshBasicMaterial color={accent} transparent opacity={0.45} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.8, -0.5, 0.2]}>
          <torusGeometry args={[2.12, 0.003, 4, 200]} />
          <meshBasicMaterial color="#e5e9f3" transparent opacity={0.24} toneMapped={false} />
        </mesh>
      </group>

      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.4}>
        <mesh position={[1.65, 0.9, 0.4]} scale={0.11}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#eef0f4" metalness={0.95} roughness={0.14} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.3} floatIntensity={1.8}>
        <mesh position={[-1.6, -1.05, 0.5]} scale={0.08}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={accent} metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>
    </>
  )
}

export default function ServiceSculpture({ accent = '#5b78ff', className = '' }) {
  const hostRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    const element = hostRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.02 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <div ref={hostRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        frameloop={inView && pageVisible ? 'always' : 'never'}
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 4.85], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 1
        }}
      >
        <Knot accent={accent} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(8,10,15,0.55)_80%)]" />
    </div>
  )
}
