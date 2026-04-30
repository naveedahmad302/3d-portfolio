"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f0f2f8]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="mb-8 text-center">
              <motion.div
                className="text-sm font-mono tracking-[0.3em] text-primary/50 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                INITIALIZING SYSTEM
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                NAVEED.DEV
              </motion.h1>
            </div>

            <div className="w-64 md:w-80 relative">
              <div className="h-[2px] w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #4f46e5, #7c3aed, #06b6d4)",
                    width: `${Math.min(progress, 100)}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-xs font-mono text-foreground/30">
                  LOADING ASSETS
                </span>
                <span className="text-xs font-mono text-primary">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
            </div>

            <motion.div
              className="mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {["TEXTURES", "SHADERS", "MODELS", "SCENES"].map((label, i) => (
                <motion.span
                  key={label}
                  className="text-[10px] font-mono px-2 py-1 rounded border transition-colors"
                  style={{
                    borderColor:
                      progress > (i + 1) * 25
                        ? "rgba(79,70,229,0.3)"
                        : "rgba(0,0,0,0.06)",
                    color:
                      progress > (i + 1) * 25
                        ? "rgba(79,70,229,0.8)"
                        : "rgba(0,0,0,0.2)",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
