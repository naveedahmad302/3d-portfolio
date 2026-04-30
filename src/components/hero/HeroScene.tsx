"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Stars,
  MeshDistortMaterial,
  Sphere,
  Torus,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField() {
  const count = 2000;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 30;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 30;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 30;

      const c = new THREE.Color();
      c.setHSL(0.5 + seededRandom(i * 7) * 0.3, 0.8, 0.6);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[-3, 1, -2]}>
          <MeshDistortMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={3} floatIntensity={1.5}>
        <Torus args={[1.2, 0.15, 16, 100]} position={[3, -1, -3]}>
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[0, 2, -4]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, -2, -5]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={4} floatIntensity={0.8}>
        <mesh position={[4, 2, -6]}>
          <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
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
        <color attach="background" args={["#050510"]} />
        <fog attach="fog" args={["#050510", 10, 30]} />

        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00f5ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color="#ff00ff" />
        <pointLight position={[0, 5, -5]} intensity={0.4} color="#00ff88" />

        <ParticleField />
        <FloatingGeometries />
        <Stars
          radius={50}
          depth={80}
          count={3000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
        <CameraRig />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
