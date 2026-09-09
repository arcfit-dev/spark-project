"use client";

import React, { useState } from "react";
import { Sparkles, Trophy, Presentation, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectUpgradesProps {
  presentationIdea: string;
  upgradeIdeas: string[];
  expectedOutput: string;
}

export function ProjectUpgrades({
  presentationIdea,
  upgradeIdeas,
  expectedOutput,
}: ProjectUpgradesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden text-left">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
            Science Fair Pitch & Stretch Goals
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span>{isOpen ? "Collapse" : "Explore"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 pt-0 space-y-4 border-t border-white/5 text-xs text-white/70"
          >
            {/* Expected Output */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <span className="font-mono text-[10px] text-cyan-300 uppercase font-bold tracking-wider block mb-1">
                TANGIBLE OUTPUT
              </span>
              <p className="text-white/80">{expectedOutput}</p>
            </div>

            {/* Presentation Idea */}
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-purple-300 uppercase font-bold tracking-wider mb-1">
                <Presentation className="w-3.5 h-3.5" />
                <span>HOW TO PRESENT TO JUDGES / CLASS</span>
              </div>
              <p className="text-white/80">{presentationIdea}</p>
            </div>

            {/* Upgrade Goals */}
            {upgradeIdeas && upgradeIdeas.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-300 uppercase font-bold tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>STRETCH GOALS / ITERATION OPPORTUNITIES</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-white/80">
                  {upgradeIdeas.map((idea, i) => (
                    <li key={i}>{idea}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
