"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function SoftParticles() {
  const count = 800;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 25;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 25;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 25;
      sz[i] = seededRandom(i * 7) * 0.04 + 0.01;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a78bfa"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-3, 1, -2]}>
          <MeshDistortMaterial
            color="#818cf8"
            roughness={0.1}
            metalness={0.3}
            distort={0.35}
            speed={2}
            transparent
            opacity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Torus args={[1.2, 0.12, 16, 100]} position={[3, -1, -3]}>
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.1}
            metalness={0.6}
            transparent
            opacity={0.4}
          />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[0, 2, -4]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, -2, -5]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#4f46e5"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={3} floatIntensity={0.8}>
        <mesh position={[4, 2, -6]}>
          <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.1) * 0.5;
    state.camera.position.y = Math.cos(t * 0.15) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#f0f2f8"]} />
        <fog attach="fog" args={["#f0f2f8", 12, 30]} />

        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 3, 5]} intensity={0.4} color="#a78bfa" />
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#06b6d4" />

        <SoftParticles />
        <FloatingGeometries />
        <CameraRig />
        <Environment preset="apartment" />
      </Canvas>
    </div>
  );
}
