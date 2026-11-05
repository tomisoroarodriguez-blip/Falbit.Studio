"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { hawkPoints } from "@/data/hawk";

function Hawk() {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape(hawkPoints.map(([x, y]) => new THREE.Vector2(x, y)));
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.1,
      bevelSegments: 1,
    });
    g.center();
    return g;
  }, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.4 + Math.sin(t * 0.4) * 0.08, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.22 + 0.18, 3, dt);
    g.rotation.z = Math.sin(t * 0.6) * 0.03;
    g.position.y = Math.sin(t * 0.8) * 0.12;
  });

  // Escala responsiva: el halcón mide ~10 unidades de ancho.
  const s = Math.min(1, (viewport.width * 0.92) / 10.4);

  return (
    <group ref={group} scale={s}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#c9a57a" metalness={0.55} roughness={0.38} flatShading />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#f0dcc0" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c9a57a" size={0.045} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HawkScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={3.2} color="#fff1dc" />
      <pointLight position={[-6, -2, 3]} intensity={30} color="#c9a57a" />
      <Hawk />
      <Dust />
    </Canvas>
  );
}
