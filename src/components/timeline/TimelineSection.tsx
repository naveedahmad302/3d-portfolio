"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { experiences } from "@/data/portfolio";

function TimelineCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const { ref, isInView } = useInView(0.2);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 mb-16 md:mb-24 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:flex-row`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`w-full md:w-1/2 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
      >
        <div className="glass rounded-2xl p-6 md:p-8 hover:glow-primary transition-all duration-500">
          <span className="text-xs font-mono tracking-wider text-primary/50 uppercase">
            {experience.period}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2 mb-1">
            {experience.role}
          </h3>
          <p className="text-sm text-accent/70 font-medium mb-4">
            {experience.company}
          </p>
          <p className="text-foreground/40 text-sm leading-relaxed mb-4">
            {experience.description}
          </p>

          <ul className="space-y-2 mb-4">
            {experience.highlights.map((h) => (
              <li key={h} className="text-xs text-foreground/50 flex items-start gap-2">
                <span className="text-primary mt-0.5">&#x25B8;</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-primary/15 text-primary/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary items-center justify-center z-10"
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary/50 uppercase">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            <span className="text-foreground">Experience </span>
            <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 via-accent/15 to-transparent" />

          {experiences.map((exp, i) => (
            <TimelineCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
