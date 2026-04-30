"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function GlassSphere({ position, scale, color, speed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    ref.current.position.x = position[0] + Math.sin(t * speed * 0.7) * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshTransmissionMaterial
        color={color}
        thickness={0.5}
        roughness={0.1}
        transmission={0.95}
        ior={1.5}
        chromaticAberration={0.03}
        backside
      />
    </mesh>
  );
}

function FloatingRing({ position, scale, color, rotationSpeed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * rotationSpeed;
    ref.current.rotation.z = t * rotationSpeed * 0.5;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.08, 16, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.35}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function GlassCard({ position, rotation, scale }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 0.15;
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.1;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1.4]} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.12}
        roughness={0.05}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function MorphingSphere({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.3}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function ScrollReactiveObjects({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouseRef.current.x * 0.3;
    const targetY = mouseRef.current.y * 0.2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.1, 0.02);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.05, 0.02);
  });

  const objects = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push({
        position: [
          (seededRandom(i * 3) - 0.5) * 16,
          (seededRandom(i * 3 + 1) - 0.5) * 12,
          (seededRandom(i * 3 + 2) - 0.5) * 8 - 4,
        ] as [number, number, number],
        scale: seededRandom(i * 7) * 0.4 + 0.15,
        color: ["#4f46e5", "#7c3aed", "#06b6d4", "#a78bfa", "#818cf8"][i % 5],
        speed: seededRandom(i * 11) * 0.4 + 0.3,
      });
    }
    return items;
  }, []);

  const rings = useMemo(() => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        position: [
          (seededRandom(i * 5 + 50) - 0.5) * 14,
          (seededRandom(i * 5 + 51) - 0.5) * 10,
          (seededRandom(i * 5 + 52) - 0.5) * 6 - 3,
        ] as [number, number, number],
        scale: seededRandom(i * 9 + 60) * 0.8 + 0.5,
        color: ["#4f46e5", "#7c3aed", "#06b6d4"][i % 3],
        rotationSpeed: seededRandom(i * 13 + 70) * 0.3 + 0.1,
      });
    }
    return items;
  }, []);

  const cards = useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push({
        position: [
          (seededRandom(i * 4 + 100) - 0.5) * 12,
          (seededRandom(i * 4 + 101) - 0.5) * 8,
          (seededRandom(i * 4 + 102) - 0.5) * 4 - 5,
        ] as [number, number, number],
        rotation: [
          seededRandom(i * 4 + 103) * 0.5,
          seededRandom(i * 4 + 104) * Math.PI,
          seededRandom(i * 4 + 105) * 0.3,
        ] as [number, number, number],
        scale: [
          seededRandom(i * 4 + 106) * 1.5 + 1,
          seededRandom(i * 4 + 107) * 1.5 + 1,
          1,
        ] as [number, number, number],
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <GlassSphere key={`sphere-${i}`} {...obj} />
      ))}
      {rings.map((ring, i) => (
        <FloatingRing key={`ring-${i}`} {...ring} />
      ))}
      {cards.map((card, i) => (
        <GlassCard key={`card-${i}`} {...card} />
      ))}
      <MorphingSphere position={[-5, 2, -6]} color="#a78bfa" />
      <MorphingSphere position={[4, -2, -8]} color="#06b6d4" />
      <MorphingSphere position={[6, 3, -5]} color="#4f46e5" />
    </group>
  );
}

export default function ParticleBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} color="#a78bfa" />
        <pointLight position={[0, 5, 5]} intensity={0.4} color="#4f46e5" distance={20} />
        <ScrollReactiveObjects mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
