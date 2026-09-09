"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ProjectHeaderProps {
  title: string;
  hook: string;
  domain: string;
  isReady: boolean;
}

export function ProjectHeader({ title, hook, domain, isReady }: ProjectHeaderProps) {
  return (
    <div className="space-y-3 text-left">
      {/* Eyebrow and Ready Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-purple-400 font-bold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            YOUR PROJECT // {domain.toUpperCase()}
          </span>
        </div>

        {/* READY TO BUILD indicator (Unlocks at t = 2.6s - 3.0s) */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tracking-wider uppercase">READY TO BUILD</span>
          </motion.div>
        )}
      </div>

      {/* Huge Project Title with Subtle Glow */}
      <div className="relative">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>
        {/* Glow sheen over title */}
        {isReady && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent pointer-events-none"
          />
        )}
      </div>

      {/* Compelling Challenge Hook */}
      <p className="text-base sm:text-lg text-cyan-200/90 font-medium leading-relaxed">
        &ldquo;{hook}&rdquo;
      </p>
    </div>
  );
}
