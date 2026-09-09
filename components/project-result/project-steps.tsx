"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectStep } from "@/types/project";
import { Wrench, Lightbulb } from "lucide-react";

interface ProjectStepsProps {
  steps: ProjectStep[];
  revealSteps: boolean;
}

export function ProjectSteps({ steps, revealSteps }: ProjectStepsProps) {
  return (
    <div className="rounded-3xl p-6 bg-white/[0.03] border border-white/10 backdrop-blur-xl text-left relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              How to build it
            </h2>
            <p className="text-xs text-white/50">
              5 actionable stages from first test to final presentation
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-cyan-400/80 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          5-STAGE SEQUENCE
        </span>
      </div>

      {/* Steps List with Vertical Timeline & Animated Connector Line */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Animated Connector Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: revealSteps ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ originY: 0 }}
          className="absolute left-[17px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
        />

        {steps.map((step, idx) => (
          <motion.div
            key={step.number || idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: revealSteps ? 1 : 0, x: revealSteps ? 0 : 20 }}
            transition={{
              delay: idx * 0.14,
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            className="relative flex items-start gap-4 group"
          >
            {/* Step Number Badge */}
            <div className="relative z-10 w-9 h-9 rounded-xl bg-[#090b14] border border-cyan-400/50 flex items-center justify-center shrink-0 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 group-hover:border-cyan-300 transition-transform">
              0{step.number}
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-white/[0.02] border border-white/5 group-hover:border-white/15 p-4 rounded-2xl transition-all">
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                {step.title}
              </h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                {step.description}
              </p>

              {step.tip && (
                <div className="mt-2.5 flex items-start gap-1.5 text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong className="font-semibold text-amber-200">Pro-tip:</strong> {step.tip}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
