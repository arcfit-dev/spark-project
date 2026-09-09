"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, Dices } from "lucide-react";
import { playChipClick } from "@/components/ui/sound-effects";

interface ChoiceCardsProps {
  onSelectBuild: () => void;
  onSelectSurprise: () => void;
}

export function ChoiceCards({ onSelectBuild, onSelectSurprise }: ChoiceCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<"build" | "surprise" | null>(null);

  const handleBuild = () => {
    playChipClick();
    onSelectBuild();
  };

  const handleSurprise = () => {
    playChipClick();
    onSelectSurprise();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl px-4 mt-8">
      {/* Choice A: Build my idea */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        onHoverStart={() => setHoveredCard("build")}
        onHoverEnd={() => setHoveredCard(null)}
        onClick={handleBuild}
        className="group relative cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-purple-500/50 backdrop-blur-xl shadow-2xl transition-all duration-300 overflow-hidden text-left"
      >
        {/* Subtle radial sheen glow on hover */}
        <div
          className={`absolute -inset-px rounded-2xl transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/20 via-transparent to-transparent ${
            hoveredCard === "build" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient background particles for hover effect */}
        {hoveredCard === "build" && (
          <div className="absolute top-2 right-4 flex gap-1 pointer-events-none animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Build my idea
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Custom
              </span>
            </h3>

            <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
              Tell me what you&apos;re interested in.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
            <span>Start creating</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>

      {/* Choice B: Surprise me */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        onHoverStart={() => setHoveredCard("surprise")}
        onHoverEnd={() => setHoveredCard(null)}
        onClick={handleSurprise}
        className="group relative cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/50 backdrop-blur-xl shadow-2xl transition-all duration-300 overflow-hidden text-left"
      >
        {/* Subtle radial sheen glow on hover */}
        <div
          className={`absolute -inset-px rounded-2xl transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent ${
            hoveredCard === "surprise" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient background particles for hover effect */}
        {hoveredCard === "surprise" && (
          <div className="absolute top-2 right-4 flex gap-1 pointer-events-none animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="w-1 h-1 rounded-full bg-amber-400" />
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Zap className="w-5 h-5 text-cyan-300" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Surprise me
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Dices className="w-3 h-3" /> Instant
              </span>
            </h3>

            <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
              Give me a completely unexpected project.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
            <span>Generate randomly</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
