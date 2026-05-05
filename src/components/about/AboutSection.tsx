"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { personalInfo } from "@/data/portfolio";

const stats = [
  { label: "Years Experience", value: "5+" },
  { label: "Projects Completed", value: "50+" },
  { label: "Technologies", value: "20+" },
  { label: "Lines of Code", value: "500K+" },
];

export default function AboutSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary/60 uppercase">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            <span className="text-white">Crafting </span>
            <span className="gradient-text">Digital Experiences</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl shadow-white/5"
          >
            <p className="text-white/70 leading-relaxed text-lg mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-white/50 leading-relaxed">
              With expertise spanning frontend artistry to backend architecture,
              I transform complex problems into elegant, performant solutions.
              Every project is an opportunity to push boundaries and create
              something extraordinary.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-primary hover:bg-white/20 transition-all"
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 shadow-lg shadow-white/5 hover:bg-white/15 hover:border-white/30 transition-all duration-500"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
