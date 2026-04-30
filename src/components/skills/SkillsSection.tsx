"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { skills } from "@/data/portfolio";

function SkillNode({
  skill,
  position,
  index,
}: {
  skill: (typeof skills)[0];
  position: [number, number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5 + index;
  });

  const size = (skill.level / 100) * 0.3 + 0.15;

  return (
    <Float speed={1 + index * 0.1} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.5 : 0.15}
            roughness={0.2}
            metalness={0.6}
            transparent
            opacity={hovered ? 0.95 : 0.8}
          />
        </mesh>

        {hovered && (
          <Text
            position={[0, size + 0.3, 0]}
            fontSize={0.15}
            color="#1a1a2e"
            anchorX="center"
            anchorY="middle"
            font="/fonts/mono.woff"
          >
            {`${skill.name} ${skill.level}%`}
          </Text>
        )}

        <mesh>
          <sphereGeometry args={[size + 0.05, 32, 32]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={hovered ? 0.15 : 0.05}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const positions: number[] = [];
    const skillPositions = skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = 3.5;
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ];
    });

    for (let i = 0; i < skillPositions.length; i++) {
      for (let j = i + 1; j < skillPositions.length; j++) {
        const dist = Math.sqrt(
          Math.pow(skillPositions[i][0] - skillPositions[j][0], 2) +
            Math.pow(skillPositions[i][1] - skillPositions[j][1], 2) +
            Math.pow(skillPositions[i][2] - skillPositions[j][2], 2)
        );
        if (dist < 4) {
          positions.push(...skillPositions[i], ...skillPositions[j]);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#4f46e5" transparent opacity={0.08} />
    </lineSegments>
  );
}

function SkillsGalaxy() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = 3.5;
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          index={i}
        />
      ))}
      <ConnectionLines />
    </group>
  );
}

const categories = ["all", "language", "frontend", "backend", "database", "devops", "ai", "mobile"];

export default function SkillsSection() {
  const { ref, isInView } = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary/50 uppercase">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            <span className="text-foreground">Skills </span>
            <span className="gradient-text">Galaxy</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[400px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden glass"
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={["#f0f2f8"]} />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.6} color="#4f46e5" />
            <pointLight position={[-10, -10, 10]} intensity={0.4} color="#7c3aed" />
            <SkillsGalaxy />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
            />
          </Canvas>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "text-foreground/40 border border-foreground/10 hover:text-foreground/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer group"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-3 group-hover:animate-pulse-glow"
                style={{ backgroundColor: skill.color }}
              />
              <div className="text-sm font-medium text-foreground/80 mb-1">
                {skill.name}
              </div>
              <div className="text-[10px] font-mono text-foreground/30">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
