import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Edges } from '@react-three/drei'

// A rotating wireframe icosahedron
function WireframeShape({ position, speed = 0.5, scale = 1, rotationOffsets = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * 0.5
      meshRef.current.rotation.y += delta * speed
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={rotationOffsets}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#111112" transparent opacity={0.5} />
      <Edges color="#555555" threshold={15} />
    </mesh>
  )
}

function FloatingShapes() {
  return (
    <>
      <WireframeShape position={[-8, 0, -5]} scale={2} speed={0.2} />
      <WireframeShape position={[8, 3, -10]} scale={3} speed={-0.15} rotationOffsets={[Math.PI / 4, 0, 0]} />
      <WireframeShape position={[10, -5, -8]} scale={1.5} speed={0.3} />
      <WireframeShape position={[-9, 6, -12]} scale={2.5} speed={-0.2} />
    </>
  )
}

export default function BrutalistLayout({ children }) {
  return (
    <div className="brutalist-layout">
      {/* 1. Structural Grid Overlay */}
      <div className="brutalist-grid-overlay" />

      {/* 2. Interactive 3D Background */}
      <div className="brutalist-canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <FloatingShapes />
        </Canvas>
      </div>

      {/* 3. Telemetry Corners */}
      <div className="telemetry telemetry-tl">SYS.STAT: ONLINE</div>
      <div className="telemetry telemetry-tr">SEQ // 4029.11</div>
      <div className="telemetry telemetry-bl">LAT: 20.5937 / LNG: 78.9629</div>
      <div className="telemetry telemetry-br">MATCH.SEQ: ACTIVE</div>

      {/* 4. Vertical Marquees */}
      <div className="vertical-marquee left">
        <div className="marquee-track">
          <div className="marquee-content">
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="marquee-content" aria-hidden="true">
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div className="vertical-marquee right">
        <div className="marquee-track reverse">
          <div className="marquee-content">
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="marquee-content" aria-hidden="true">
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
            SCHOLARBRIDGE // 2026 // INDIA // SECURE YOUR FUNDING // &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="brutalist-content-wrapper">
        {children}
        
        {/* ── Global Footer ── */}
        <footer className="footer">
          <div className="noise-overlay"></div>
          <span className="footer-brand">ScholarBridge</span> | eYIC 2026-27 Hackathon Track
        </footer>
      </div>
    </div>
  )
}
