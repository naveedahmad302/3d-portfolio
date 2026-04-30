"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { personalInfo } from "@/data/portfolio";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const InteractiveRobot = dynamic(() => import("./InteractiveRobot"), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <HeroScene />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="flex items-center justify-center gap-8 lg:gap-16 max-w-6xl w-full">
          <motion.div
            className="text-center lg:text-left flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="text-xs md:text-sm font-mono tracking-[0.4em] text-primary/60 uppercase">
                Welcome to my digital universe
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9]"
            >
              <span className="block text-foreground">{personalInfo.name.split(" ")[0]}</span>
              <span className="block gradient-text">
                {personalInfo.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="text-lg md:text-xl text-foreground/40 mb-8 font-light max-w-2xl lg:mx-0 mx-auto"
            >
              {personalInfo.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-3 rounded-full overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-sm font-semibold text-white">
                  Explore Work
                </span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 rounded-full border border-foreground/15 text-sm font-medium text-foreground/60 hover:text-foreground hover:border-primary/40 transition-all"
              >
                Get in Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Interactive Robot - follows cursor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
            className="hidden md:flex items-center justify-center flex-shrink-0"
          >
            <InteractiveRobot />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-foreground/25 tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-5 h-8 rounded-full border border-foreground/15 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1.5 rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
