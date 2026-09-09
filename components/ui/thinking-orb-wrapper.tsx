"use client";

import React from "react";
import { ThinkingOrb } from "thinking-orbs";
import { ThinkingOrbState } from "@/types/project";
import { motion } from "framer-motion";

interface ThinkingOrbWrapperProps {
  state: ThinkingOrbState;
  variant?: "hero" | "companion" | "docked";
  showAura?: boolean;
  className?: string;
  speed?: number;
}

export function ThinkingOrbWrapper({
  state,
  variant = "hero",
  showAura = true,
  className = "",
  speed = 1,
}: ThinkingOrbWrapperProps) {
  // Color aura accents matching the current AI cognitive state
  const stateColors: Record<ThinkingOrbState, { ring: string; glow: string; label: string }> = {
    breathing: {
      ring: "rgba(139, 92, 246, 0.25)",
      glow: "rgba(139, 92, 246, 0.15)",
      label: "Ready & Breathing",
    },
    listening: {
      ring: "rgba(56, 189, 248, 0.35)",
      glow: "rgba(56, 189, 248, 0.2)",
      label: "Listening to your inputs...",
    },
    searching: {
      ring: "rgba(168, 85, 247, 0.4)",
      glow: "rgba(168, 85, 247, 0.25)",
      label: "Searching scientific connections...",
    },
    connecting: {
      ring: "rgba(99, 102, 241, 0.4)",
      glow: "rgba(99, 102, 241, 0.25)",
      label: "Connecting concepts...",
    },
    weaving: {
      ring: "rgba(236, 72, 153, 0.35)",
      glow: "rgba(236, 72, 153, 0.2)",
      label: "Weaving project blueprint...",
    },
    working: {
      ring: "rgba(245, 158, 11, 0.4)",
      glow: "rgba(245, 158, 11, 0.2)",
      label: "Synthesizing build steps...",
    },
    solving: {
      ring: "rgba(16, 185, 129, 0.45)",
      glow: "rgba(16, 185, 129, 0.25)",
      label: "Verifying safety & feasibility...",
    },
    composing: {
      ring: "rgba(147, 51, 234, 0.45)",
      glow: "rgba(147, 51, 234, 0.25)",
      label: "Composing full experiment guide...",
    },
    shaping: {
      ring: "rgba(6, 182, 212, 0.5)",
      glow: "rgba(6, 182, 212, 0.3)",
      label: "Preparing visual blueprint...",
    },
  };

  const currentMeta = stateColors[state] || stateColors.breathing;

  if (variant === "docked") {
    return (
      <div className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md ${className}`}>
        <div className="relative flex items-center justify-center w-6 h-6">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: currentMeta.ring }}
          />
          <ThinkingOrb state={state} size={20} theme="dark" speed={speed} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/70">
            AI LAB ACTIVE
          </span>
        </div>
      </div>
    );
  }

  if (variant === "companion") {
    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-16 h-16 flex items-center justify-center">
          {showAura && (
            <div
              className="absolute inset-0 rounded-full blur-lg transition-colors duration-700"
              style={{ backgroundColor: currentMeta.glow }}
            />
          )}
          <div className="relative z-10 p-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm shadow-inner">
            <ThinkingOrb state={state} size={64} theme="dark" speed={speed} />
          </div>
        </div>
      </div>
    );
  }

  // "hero" variant
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer ambient radiant glow */}
      {showAura && (
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 rounded-full blur-3xl transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: currentMeta.glow }}
        />
      )}

      {/* Rotating technological orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 rounded-full border border-dashed border-white/[0.08] pointer-events-none"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-36 h-36 rounded-full border border-dotted border-white/[0.12] pointer-events-none"
      />

      {/* Glass orb housing */}
      <div className="relative z-10 w-28 h-28 flex items-center justify-center rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 scale-125 transition-transform duration-500">
        {/* Subtle lens reflection highlights */}
        <div className="absolute top-2 left-4 w-6 h-3 rounded-full bg-white/10 blur-[1px] rotate-[-25deg] pointer-events-none" />
        
        {/* The Thinking Orb component from 'thinking-orbs' */}
        <ThinkingOrb
          state={state}
          size={64}
          theme="dark"
          speed={speed}
          aria-label={currentMeta.label}
        />
      </div>

      {/* Subtle bottom shadow anchor */}
      <div className="w-24 h-4 mt-3 rounded-full bg-black/80 blur-md pointer-events-none" />
    </div>
  );
}
