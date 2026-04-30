"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function InteractiveRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const eyeX = useTransform(mouseX, [-1, 1], [-6, 6]);
  const eyeY = useTransform(mouseY, [-1, 1], [-4, 4]);
  const headRotate = useTransform(mouseX, [-1, 1], [-8, 8]);
  const headTiltY = useTransform(mouseY, [-1, 1], [3, -3]);
  const bodyTilt = useTransform(mouseX, [-1, 1], [-2, 2]);
  const antennaRotate = useTransform(mouseX, [-1, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x: nx, y: ny });
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const leftBrow = mouse.y > 0.2 ? -3 : mouse.y < -0.3 ? 3 : 0;
  const rightBrow = mouse.y > 0.2 ? -3 : mouse.y < -0.3 ? 3 : 0;
  const mouthWidth = Math.abs(mouse.x) > 0.5 ? 28 : 20;

  return (
    <div ref={containerRef} className="relative select-none pointer-events-none">
      <motion.div
        style={{ rotate: bodyTilt }}
        className="relative w-[180px] h-[220px] md:w-[220px] md:h-[260px]"
      >
        {/* Glow effect behind robot */}
        <div className="absolute inset-0 rounded-full bg-primary/8 blur-3xl scale-150" />
        
        {/* Antenna */}
        <motion.div
          style={{ rotate: antennaRotate }}
          className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
        >
          <div className="w-[2px] h-8 md:h-10 bg-gradient-to-t from-primary/40 to-transparent mx-auto" />
          <motion.div
            animate={{
              boxShadow: [
                "0 0 8px 2px rgba(79,70,229,0.4)",
                "0 0 16px 4px rgba(79,70,229,0.7)",
                "0 0 8px 2px rgba(79,70,229,0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary mx-auto -mt-1"
          />
        </motion.div>

        {/* Head */}
        <motion.div
          style={{ rotate: headRotate, y: headTiltY }}
          className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 w-[120px] h-[90px] md:w-[150px] md:h-[110px] origin-bottom"
        >
          {/* Head shell */}
          <div className="absolute inset-0 rounded-[28px] md:rounded-[32px] bg-gradient-to-b from-white to-[#e8e8f0] border border-foreground/10 overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent" />
          </div>

          {/* Visor / Eye area */}
          <div className="absolute top-[22px] md:top-[28px] left-1/2 -translate-x-1/2 w-[90px] md:w-[110px] h-[32px] md:h-[38px] rounded-[16px] bg-[#f0f0f8] border border-foreground/8 flex items-center justify-center gap-[20px] md:gap-[28px] overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            
            {/* Left eye */}
            <div className="relative w-[22px] h-[22px] md:w-[26px] md:h-[26px]">
              <div className="absolute inset-0 rounded-full bg-primary/10" />
              <motion.div
                style={{ x: eyeX, y: eyeY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-primary"
              >
                <div className="absolute top-[1px] left-[2px] w-[3px] h-[3px] md:w-[4px] md:h-[4px] rounded-full bg-white/80" />
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                />
              </motion.div>
              {/* Left eyebrow */}
              <motion.div
                animate={{ y: leftBrow }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute -top-[6px] left-0 w-full h-[3px] rounded-full bg-primary/30"
              />
            </div>

            {/* Right eye */}
            <div className="relative w-[22px] h-[22px] md:w-[26px] md:h-[26px]">
              <div className="absolute inset-0 rounded-full bg-accent/10" />
              <motion.div
                style={{ x: eyeX, y: eyeY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-full bg-accent"
              >
                <div className="absolute top-[1px] left-[2px] w-[3px] h-[3px] md:w-[4px] md:h-[4px] rounded-full bg-white/80" />
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full bg-accent/30 blur-sm"
                />
              </motion.div>
              {/* Right eyebrow */}
              <motion.div
                animate={{ y: rightBrow }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute -top-[6px] left-0 w-full h-[3px] rounded-full bg-accent/30"
              />
            </div>
          </div>

          {/* Mouth */}
          <div className="absolute bottom-[12px] md:bottom-[14px] left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ width: mouthWidth }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-[3px] rounded-full bg-gradient-to-r from-primary/40 via-neon/50 to-accent/40"
            />
          </div>
        </motion.div>

        {/* Neck */}
        <div className="absolute top-[92px] md:top-[112px] left-1/2 -translate-x-1/2 w-[16px] md:w-[20px] h-[10px] md:h-[12px]">
          <div className="w-full h-full bg-gradient-to-b from-[#e8e8f0] to-[#d8d8e8] rounded-sm border-x border-foreground/5" />
        </div>

        {/* Body */}
        <div
          className="absolute top-[100px] md:top-[122px] left-1/2 -translate-x-1/2 w-[100px] h-[80px] md:w-[130px] md:h-[100px]"
        >
          <div className="absolute inset-0 rounded-[20px] md:rounded-[24px] bg-gradient-to-b from-white to-[#e8e8f0] border border-foreground/10 overflow-hidden shadow-lg">
            {/* Chest light */}
            <div className="absolute top-[16px] md:top-[20px] left-1/2 -translate-x-1/2">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 6px 2px rgba(6,182,212,0.3)",
                    "0 0 12px 4px rgba(6,182,212,0.6)",
                    "0 0 6px 2px rgba(6,182,212,0.3)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full bg-neon/70 border border-neon/30"
              />
            </div>
            
            {/* Circuit lines */}
            <div className="absolute top-[36px] md:top-[44px] left-[16px] md:left-[20px] right-[16px] md:right-[20px] space-y-[6px] md:space-y-[8px]">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
              <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent" />
          </div>

          {/* Shoulder joints */}
          <div className="absolute top-[8px] md:top-[10px] -left-[8px] md:-left-[10px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] rounded-full bg-white border border-foreground/10 shadow-sm" />
          <div className="absolute top-[8px] md:top-[10px] -right-[8px] md:-right-[10px] w-[12px] h-[12px] md:w-[16px] md:h-[16px] rounded-full bg-white border border-foreground/10 shadow-sm" />
        </div>

        {/* Floating particles around robot */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.15, 0.4, 0.15],
              x: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "#4f46e5" : "#7c3aed",
              top: `${20 + i * 15}%`,
              left: i % 2 === 0 ? `-${10 + i * 3}%` : `${100 + i * 3}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
