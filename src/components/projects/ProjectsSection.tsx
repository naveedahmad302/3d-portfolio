"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { projects } from "@/data/portfolio";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: (typeof projects)[0];
  index: number;
  onSelect: () => void;
}) {
  const { ref, isInView } = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onClick={onSelect}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={
        {
          "--project-color": project.color,
        } as React.CSSProperties
      }
    >
      <div className="glass rounded-2xl p-6 md:p-8 h-full transition-all duration-500 hover:border-[var(--project-color)]/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.color}, transparent 40%)`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-mono tracking-wider uppercase"
              style={{ color: project.color }}
            >
              {project.subtitle}
            </span>
            <span className="text-xs font-mono text-white/20">
              0{index + 1}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-glow transition-all">
            {project.title}
          </h3>

          <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-white/50"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-white/30">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-xs font-medium flex items-center gap-2 group-hover:gap-3 transition-all"
              style={{ color: project.color }}
            >
              View Details
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto glass rounded-3xl p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <span
            className="text-xs font-mono tracking-wider uppercase mb-2 block"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h2>
          <p className="text-white/50 leading-relaxed">{project.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3
              className="text-sm font-mono uppercase tracking-wider mb-4"
              style={{ color: project.color }}
            >
              Key Features
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-white/60 text-sm"
                >
                  <span style={{ color: project.color }} className="mt-1">
                    &#x25B8;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-mono uppercase tracking-wider mb-4"
              style={{ color: project.color }}
            >
              Architecture
            </h3>
            <div className="glass rounded-xl p-4">
              <code className="text-xs text-white/50 font-mono">
                {project.architecture}
              </code>
            </div>

            <h3
              className="text-sm font-mono uppercase tracking-wider mb-4 mt-6"
              style={{ color: project.color }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border text-white/60"
                  style={{ borderColor: `${project.color}30` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full glass text-sm font-medium text-white/70 hover:text-white transition-all"
          >
            View Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-medium text-black"
            style={{ backgroundColor: project.color }}
          >
            Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary/60 uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
