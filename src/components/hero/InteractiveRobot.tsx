"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#c87533";
const DARK_ORANGE = "#a05a20";
const VISOR = "#1a1a2e";
const JOINT = "#2a2a2a";

function RobotEye({
  position,
  mouseRef,
}: {
  position: [number, number, number];
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pupilRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!pupilRef.current) return;
    const targetX = mouseRef.current.x * 0.08;
    const targetY = mouseRef.current.y * 0.06;
    pupilRef.current.position.x = THREE.MathUtils.lerp(
      pupilRef.current.position.x,
      targetX,
      0.1
    );
    pupilRef.current.position.y = THREE.MathUtils.lerp(
      pupilRef.current.position.y,
      targetY,
      0.1
    );
  });

  return (
    <group position={position}>
      {/* Eye white background */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.3} />
      </mesh>
      {/* Pupil */}
      <mesh ref={pupilRef} position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.2} />
      </mesh>
    </group>
  );
}

function RobotMouth() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.08, 0);
    s.quadraticCurveTo(0, -0.04, 0.08, 0);
    return s;
  }, []);

  return (
    <group position={[0, -0.18, 0.42]}>
      <mesh rotation={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial
          color="#ffffff"
          side={THREE.DoubleSide}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Limb({
  position,
  rotation,
  segments,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  segments: {
    radius: number;
    height: number;
    color: string;
    offsetY?: number;
  }[];
}) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {segments.map((seg, i) => (
        <mesh key={i} position={[0, seg.offsetY || 0, 0]}>
          <capsuleGeometry args={[seg.radius, seg.height, 8, 16]} />
          <meshStandardMaterial
            color={seg.color}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function RobotCharacter({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Idle floating animation
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(t * 1.2) * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseRef.current.x * 0.3,
        0.05
      );
    }

    // Head follows cursor
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseRef.current.x * 0.4,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseRef.current.y * 0.2,
        0.08
      );
    }

    // Waving right arm
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        -0.8 + Math.sin(t * 3) * 0.25;
      rightArmRef.current.rotation.x = Math.sin(t * 2.5) * 0.15;
    }

    // Left arm idle sway
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.15 + Math.sin(t * 1.5) * 0.05;
      leftArmRef.current.rotation.x = Math.sin(t * 1.2 + 1) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.3}>
      {/* === HEAD === */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Head dome / helmet */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Head lower */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.48, 0.44, 0.35, 32]} />
          <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Visor / Face screen */}
        <mesh position={[0, 0.02, 0.32]}>
          <planeGeometry args={[0.65, 0.45]} />
          <meshStandardMaterial
            color={VISOR}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
        {/* Visor frame */}
        <mesh position={[0, 0.02, 0.3]}>
          <boxGeometry args={[0.72, 0.52, 0.08]} />
          <meshStandardMaterial color={DARK_ORANGE} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Eyes */}
        <RobotEye position={[-0.15, 0.05, 0.35]} mouseRef={mouseRef} />
        <RobotEye position={[0.15, 0.05, 0.35]} mouseRef={mouseRef} />
        {/* Mouth */}
        <RobotMouth />
        {/* Ear pieces */}
        <mesh position={[-0.5, 0.0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[0.5, 0.0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Helmet brim */}
        <mesh position={[0, 0.28, 0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.55, 0.06, 0.35]} />
          <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.4} />
        </mesh>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
        <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* === TORSO === */}
      <group position={[0, 0.35, 0]}>
        {/* Upper torso */}
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.32, 0.25, 8, 32]} />
          <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Lower torso */}
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.25, 0.15, 8, 32]} />
          <meshStandardMaterial color={ORANGE} roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Waist joint */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* === RIGHT ARM (waving) === */}
      <group ref={rightArmRef} position={[0.45, 0.55, 0]}>
        {/* Shoulder joint */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Upper arm */}
        <Limb
          position={[0, -0.2, 0]}
          segments={[
            { radius: 0.09, height: 0.2, color: ORANGE },
          ]}
        />
        {/* Elbow */}
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Lower arm */}
        <Limb
          position={[0, -0.55, 0]}
          segments={[
            { radius: 0.08, height: 0.15, color: ORANGE },
          ]}
        />
        {/* Hand */}
        <mesh position={[0, -0.72, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Fingers */}
        {[-0.04, 0, 0.04].map((xOff, i) => (
          <mesh key={i} position={[xOff, -0.82, 0]}>
            <capsuleGeometry args={[0.015, 0.04, 4, 8]} />
            <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* === LEFT ARM === */}
      <group ref={leftArmRef} position={[-0.45, 0.55, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.2, 0]}
          segments={[
            { radius: 0.09, height: 0.2, color: ORANGE },
          ]}
        />
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.55, 0]}
          segments={[
            { radius: 0.08, height: 0.15, color: ORANGE },
          ]}
        />
        <mesh position={[0, -0.72, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* === RIGHT LEG === */}
      <group position={[0.18, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.2, 0]}
          segments={[
            { radius: 0.1, height: 0.2, color: ORANGE },
          ]}
        />
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.55, 0]}
          segments={[
            { radius: 0.09, height: 0.18, color: ORANGE },
          ]}
        />
        {/* Foot */}
        <mesh position={[0, -0.75, 0.04]}>
          <boxGeometry args={[0.14, 0.08, 0.22]} />
          <meshStandardMaterial color={DARK_ORANGE} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* === LEFT LEG === */}
      <group position={[-0.18, -0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.2, 0]}
          segments={[
            { radius: 0.1, height: 0.2, color: ORANGE },
          ]}
        />
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={JOINT} roughness={0.5} metalness={0.5} />
        </mesh>
        <Limb
          position={[0, -0.55, 0]}
          segments={[
            { radius: 0.09, height: 0.18, color: ORANGE },
          ]}
        />
        <mesh position={[0, -0.75, 0.04]}>
          <boxGeometry args={[0.14, 0.08, 0.22]} />
          <meshStandardMaterial color={DARK_ORANGE} roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default function InteractiveRobot() {
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
    <div className="w-[280px] h-[350px] md:w-[320px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0.5, 3.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-2, 3, -2]} intensity={0.4} color="#ffa040" />
        <pointLight position={[0, 2, 3]} intensity={0.6} color="#00f5ff" distance={8} />
        <Environment preset="city" />
        <RobotCharacter mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
