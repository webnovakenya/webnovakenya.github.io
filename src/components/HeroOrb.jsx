import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { ACESFilmicToneMapping, AdditiveBlending, Color, MathUtils } from 'three'
import HeroFallback from './HeroFallback'

// Tweak point: orb palette and light direction live in these shader uniforms/vectors.
const orbVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`

const orbFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSilver;
  uniform vec3 uCobalt;
  uniform vec3 uDeep;

  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormalW);
    vec3 view = normalize(vViewDir);
    vec3 keyLight = normalize(vec3(-0.58, 0.88, 0.7));
    vec3 fillLight = normalize(vec3(0.8, 0.18, 0.5));
    vec3 halfVector = normalize(keyLight + view);

    float facing = clamp(dot(normal, view), 0.0, 1.0);
    float fresnel = pow(1.0 - facing, 2.5);
    float key = clamp(dot(normal, keyLight), 0.0, 1.0);
    float fill = clamp(dot(normal, fillLight), 0.0, 1.0);
    float top = smoothstep(-0.25, 0.92, normal.y);
    float lower = 1.0 - smoothstep(-0.88, 0.02, normal.y);
    float spec = pow(clamp(dot(normal, halfVector), 0.0, 1.0), 110.0);
    float broad = pow(key, 6.0);
    float band = 0.5 + 0.5 * sin((vUv.y + 0.08 * sin(vUv.x * 17.0)) * 30.0 + uTime * 0.28);
    band = smoothstep(0.58, 1.0, band) * 0.03;
    float brushed = smoothstep(0.74, 1.0, sin(vUv.y * 230.0 + sin(vUv.x * 20.0)) * 0.5 + 0.5);

    vec3 base = mix(uDeep, uSilver, clamp(top * 0.76 + key * 0.3, 0.0, 1.0));
    base = mix(base, uCobalt * 0.68, lower * 0.78 + fresnel * 0.2);
    base += uCobalt * fresnel * 1.22;
    base += vec3(1.0, 0.95, 0.86) * (spec * 0.92 + broad * 0.12);
    base += uCobalt * band;
    base += vec3(0.06, 0.07, 0.1) * brushed * 0.28;
    base += vec3(0.025, 0.04, 0.085) * fill * 0.7;

    gl_FragColor = vec4(base, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

function OrbitRings() {
  const group = useRef(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.z += delta * 0.035
  })

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.15, 0.12, 0.28]}>
        <torusGeometry args={[1.56, 0.0032, 3, 168]} />
        <meshBasicMaterial
          color="#e5ecff"
          transparent
          opacity={0.42}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.7, -0.32, -0.5]}>
        <torusGeometry args={[1.78, 0.0024, 3, 168]} />
        <meshBasicMaterial
          color="#5b78ff"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function ChromeShard({ position, scale, rotation, speed = 1.4, color = '#dfe5f2', geometry = 'octa' }) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.4}>
      <mesh position={position} scale={scale} rotation={rotation}>
        {geometry === 'octa' ? <octahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial color={color} metalness={0.94} roughness={0.16} />
      </mesh>
    </Float>
  )
}

function Dust({ pointer }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(150 * 3)
    for (let index = 0; index < 150; index += 1) {
      const radius = 1.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[index * 3 + 1] = radius * Math.cos(phi) * 0.78
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    return values
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y += delta * (0.018 + pointer.current.x * 0.004)
    ref.current.rotation.x = Math.sin(t * 0.11) * 0.07
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#b6c5ff"
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

function Orb({ pointer }) {
  const group = useRef(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSilver: { value: new Color('#e8e3d9') },
      uCobalt: { value: new Color('#5b78ff') },
      uDeep: { value: new Color('#0d1529') },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return

    const t = state.clock.elapsedTime
    const px = pointer.current.x
    const py = pointer.current.y

    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, t * 0.085 + px * 0.34, 2.2, delta)
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -py * 0.18 + Math.sin(t * 0.28) * 0.05,
      2.2,
      delta,
    )
    group.current.position.x = MathUtils.damp(group.current.position.x, px * 0.08, 3, delta)
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      Math.sin(t * 0.42) * 0.045 - py * 0.035,
      3,
      delta,
    )
    uniforms.uTime.value = t
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.3, 48, 48]} />
        <shaderMaterial
          vertexShader={orbVertex}
          fragmentShader={orbFragment}
          uniforms={uniforms}
        />
      </mesh>
      <OrbitRings />
      <Dust pointer={pointer} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 4]} intensity={2.4} color="#fff8ed" />
      <pointLight position={[-3, 1, 3]} intensity={24} distance={9} color="#5b78ff" />
      <pointLight position={[3.4, -2.2, 2]} intensity={14} distance={8} color="#ff7b55" />

      <ChromeShard
        position={[1.6, 0.78, 0.55]}
        scale={0.13}
        rotation={[0.4, 0.2, 0.5]}
        speed={1.7}
      />
      <ChromeShard
        position={[-1.5, -0.95, 0.62]}
        scale={0.1}
        rotation={[0.8, 0.4, 0.2]}
        speed={1.2}
        geometry="tetra"
        color="#f3e7d3"
      />
      <ChromeShard
        position={[1.05, -1.2, 0.4]}
        scale={0.065}
        rotation={[0.2, 0.9, 0.4]}
        speed={2}
        geometry="tetra"
        color="#ccd5ee"
      />
      <ChromeShard
        position={[-1.7, 1.05, 0.2]}
        scale={0.07}
        rotation={[0.5, 0.3, 0.9]}
        speed={1.5}
      />
    </group>
  )
}

export default function HeroOrb({ className = '' }) {
  const hostRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  useEffect(() => {
    const element = hostRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 },
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
    <div
      ref={hostRef}
      className={`pointer-events-none relative h-full w-full ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(91,120,255,0.26)_0%,rgba(91,120,255,0.09)_38%,transparent_70%)]" />
      <Canvas
        className="!absolute inset-0"
        frameloop={inView && pageVisible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.9], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false }}
        fallback={<HeroFallback />}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 1.05
        }}
      >
        <Orb pointer={pointer} />
      </Canvas>
    </div>
  )
}
