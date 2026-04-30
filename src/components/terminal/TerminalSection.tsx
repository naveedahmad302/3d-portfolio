"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { terminalCommands } from "@/data/portfolio";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

export default function TerminalSection() {
  const { ref, isInView } = useInView(0.1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: "output",
      content:
        'Welcome to Naveed\'s Terminal v2.0\nType "help" to see available commands.\n',
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", content: cmd },
      ];

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      const output = terminalCommands[trimmed];
      if (output) {
        newLines.push({ type: "output", content: output });
      } else if (trimmed === "") {
        // empty
      } else {
        newLines.push({
          type: "output",
          content: `Command not found: ${trimmed}\nType "help" for available commands.`,
        });
      }

      setLines(newLines);
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    },
    [lines]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <section id="terminal" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-primary/60 uppercase">
            Interactive
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            <span className="text-white">Developer </span>
            <span className="gradient-text">Terminal</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs font-mono text-white/30 ml-2">
              naveed@portfolio:~$
            </span>
          </div>

          <div
            ref={scrollRef}
            className="p-4 md:p-6 h-[400px] overflow-y-auto font-mono text-sm"
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === "input" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-primary">&#x276F;</span>
                    <span className="text-white/80">{line.content}</span>
                  </div>
                ) : (
                  <pre className="text-white/50 whitespace-pre-wrap leading-relaxed">
                    {line.content}
                  </pre>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2">
              <span className="text-primary">&#x276F;</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white/80 caret-primary"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="w-2 h-4 bg-primary/80 animate-blink" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-4 flex flex-wrap gap-2 justify-center"
        >
          {["about", "skills", "projects", "experience", "contact", "matrix"].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  processCommand(cmd);
                  setCurrentInput("");
                }}
                className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-white/10 text-white/30 hover:text-primary hover:border-primary/30 transition-all"
              >
                {cmd}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
