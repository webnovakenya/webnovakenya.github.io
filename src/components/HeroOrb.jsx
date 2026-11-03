import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
    float spec = pow(clamp(dot(normal, halfVector), 0.0, 1.0), 72.0);
    float broad = pow(key, 7.0);
    float band = 0.5 + 0.5 * sin((vUv.y + 0.08 * sin(vUv.x * 17.0)) * 34.0 + uTime * 0.35);
    band = smoothstep(0.55, 1.0, band) * 0.035;

    vec3 base = mix(uDeep, uSilver, clamp(top * 0.82 + key * 0.28, 0.0, 1.0));
    base = mix(base, uCobalt * 0.8, lower * 0.74 + fresnel * 0.16);
    base += uCobalt * fresnel * 1.3;
    base += vec3(1.0, 0.94, 0.84) * (spec * 1.08 + broad * 0.16);
    base += uCobalt * band;
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
          color="#dce4ff"
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
          color="#4f6fff"
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

function Dust({ pointer }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3)
    for (let index = 0; index < 180; index += 1) {
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
        color="#aebfff"
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
      uSilver: { value: new Color('#e1ddd3') },
      uCobalt: { value: new Color('#4f6fff') },
      uDeep: { value: new Color('#101832') },
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
      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(79,111,255,0.26)_0%,rgba(79,111,255,0.09)_38%,transparent_70%)]" />
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
