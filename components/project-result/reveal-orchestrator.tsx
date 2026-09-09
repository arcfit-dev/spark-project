"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkProject } from "@/types/project";
import { BlueprintCanvas } from "@/components/project-visual/blueprint-canvas";
import { ProjectHeader } from "./project-header";
import { ProjectMetaPills } from "./project-meta-pills";
import { LearningOutcomes } from "./learning-outcomes";
import { InteractiveChecklist } from "./interactive-checklist";
import { ProjectSteps } from "./project-steps";
import { ProjectUpgrades } from "./project-upgrades";
import { ResultActions } from "./result-actions";
import { ThinkingOrbWrapper } from "@/components/ui/thinking-orb-wrapper";
import { playRevealChime } from "@/components/ui/sound-effects";

interface RevealOrchestratorProps {
  project: SparkProject;
  onMakeAnother: () => void;
  onSurpriseMe: () => void;
}

export function RevealOrchestrator({
  project,
  onMakeAnother,
  onSurpriseMe,
}: RevealOrchestratorProps) {
  // Reveal timing stage state:
  // 0: 0.0 - 0.6s (Center Orb energy expansion)
  // 1: 0.6 - 1.2s (Left visual emerges, scales 92% -> 100%, unblurs)
  // 2: 1.2 - 1.8s (Right details slide up)
  // 3: 1.8 - 2.6s (Steps expand with connector line)
  // 4: 2.6 - 3.0s+ (Settle, title glow, READY TO BUILD, orb docked)
  const [revealStage, setRevealStage] = useState<number>(0);

  useEffect(() => {
    playRevealChime();

    // 0.6s: Stage 1 - Left visual emerges
    const t1 = setTimeout(() => {
      setRevealStage(1);
    }, 600);

    // 1.2s: Stage 2 - Right details slide up
    const t2 = setTimeout(() => {
      setRevealStage(2);
    }, 1200);

    // 1.8s: Stage 3 - Steps expand
    const t3 = setTimeout(() => {
      setRevealStage(3);
    }, 1800);

    // 2.6s: Stage 4 - Ready to build & Settle
    const t4 = setTimeout(() => {
      setRevealStage(4);
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[90vh] flex flex-col justify-between z-10">
      {/* 0.0s - 0.6s Energy Shockwave & Center Transition */}
      <AnimatePresence>
        {revealStage === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            {/* Center Thinking Orb before docking */}
            <ThinkingOrbWrapper state="shaping" variant="hero" speed={1.5} />

            {/* Expanding energy ring outward */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border-4 border-cyan-400 shadow-[0_0_50px_#00f0ff]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Docked Header Bar: App Brand + Docked Thinking Orb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: revealStage >= 1 ? 1 : 0, y: revealStage >= 1 ? 0 : -10 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between pb-6 border-b border-white/10"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            SL
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              SparkLab
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PROTOTYPE ACTIVE
              </span>
            </h2>
          </div>
        </div>

        {/* Thinking Orb docked smoothly to top bar (Section 14 & 4) */}
        <ThinkingOrbWrapper state="working" variant="docked" speed={0.8} />
      </motion.div>

      {/* 2-Column Responsive Layout:
          Desktop: 55% Left Blueprint / 45% Right Details (Section 10)
          Mobile: Vertical stacked recomposition (Section 22)
      */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
        {/* Left Side: 55% (~7 of 12 cols on desktop) - WORKING IMAGE / BLUEPRINT */}
        <motion.div
          initial={{ opacity: 0.7, scale: 0.95, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            scale: revealStage >= 1 ? 1 : 0.96,
            filter: revealStage >= 1 ? "blur(0px)" : "blur(2px)",
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 h-full"
        >
          <BlueprintCanvas
            project={project}
            revealProgress={revealStage >= 1 ? 1 : 0.6}
          />
        </motion.div>

        {/* Right Side: 45% (~5 of 12 cols on desktop) - PROJECT DETAILS & HOW TO BUILD IT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: revealStage >= 2 ? 1 : 0,
            y: revealStage >= 2 ? 0 : 30,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          {/* Top Right: Project Title, Challenge Hook, Pills */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <ProjectHeader
              title={project.title}
              hook={project.hook}
              domain={project.domain}
              isReady={revealStage >= 4}
            />

            <ProjectMetaPills project={project} />

            <p className="text-xs text-white/60 leading-relaxed text-left pt-1">
              {project.why_it_matters}
            </p>
          </div>

          {/* Learning Outcomes */}
          <LearningOutcomes learnings={project.what_you_will_learn} />

          {/* Interactive Materials Checklist */}
          <InteractiveChecklist materials={project.materials} />

          {/* How to Build It - 01 to 05 Steps with Animated Line */}
          <ProjectSteps
            steps={project.steps}
            revealSteps={revealStage >= 3}
          />

          {/* Stretch Goals & Science Fair Presentation Coach */}
          <ProjectUpgrades
            presentationIdea={project.presentation_idea}
            upgradeIdeas={project.upgrade_ideas}
            expectedOutput={project.expected_output}
          />
        </motion.div>
      </div>

      {/* Bottom Result Actions (Make Another, Surprise Me, Share) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealStage >= 3 ? 1 : 0 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <ResultActions
          project={project}
          onMakeAnother={onMakeAnother}
          onSurpriseMe={onSurpriseMe}
        />
      </motion.div>
    </div>
  );
}
