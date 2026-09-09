"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThinkingOrbWrapper } from "@/components/ui/thinking-orb-wrapper";
import { OrbitingKeywords } from "./orbiting-keywords";
import { FeasibilityChecklist } from "./feasibility-checklist";
import { ThinkingOrbState, SparkProject } from "@/types/project";
import { playStageProgress } from "@/components/ui/sound-effects";

interface ThinkingSequenceProps {
  onComplete: (project: SparkProject) => void;
  projectPromise: Promise<SparkProject>;
}

export function ThinkingSequence({ onComplete, projectPromise }: ThinkingSequenceProps) {
  const [stage, setStage] = useState<number>(1);
  const [orbState, setOrbState] = useState<ThinkingOrbState>("listening");
  const [mainText, setMainText] = useState("Got it.");
  const [subText, setSubText] = useState("Understanding what you're into...");
  const [resolvedProject, setResolvedProject] = useState<SparkProject | null>(null);

  // Fetch / resolve the project in the background while stages advance
  useEffect(() => {
    projectPromise.then((proj) => {
      setResolvedProject(proj);
    });
  }, [projectPromise]);

  useEffect(() => {
    // Stage 1 (0.8s) -> listening
    const t1 = setTimeout(() => {
      setStage(2);
      setOrbState("searching");
      setMainText("Looking for interesting connections...");
      setSubText("Scanning scientific principles and physical materials...");
      playStageProgress();
    }, 900);

    // Stage 2 (1.0s) -> searching
    const t2 = setTimeout(() => {
      setStage(3);
      setOrbState("connecting");
      setMainText("Connecting a few ideas...");
      setSubText("Synthesizing problem constraints and measurable variables...");
      playStageProgress();
    }, 2000);

    // Stage 3 (0.9s) -> connecting
    const t3 = setTimeout(() => {
      setStage(4);
      setOrbState("weaving");
      setMainText("Turning them into something you can build...");
      setSubText("Architecting physical and digital prototypes...");
      playStageProgress();
    }, 3100);

    // Stage 4 (1.1s) -> weaving -> solving
    const t4 = setTimeout(() => {
      setStage(5);
      setOrbState("solving");
      setMainText("Checking if you can actually do it...");
      setSubText("Running internal safety & feasibility validation engine...");
      playStageProgress();
    }, 4200);

    // Stage 5 (1.1s) -> composing
    const t5 = setTimeout(() => {
      setStage(6);
      setOrbState("composing");
      setMainText("Building your project...");
      setSubText("Structuring step-by-step execution and presentation strategy...");
      playStageProgress();
    }, 5500);

    // Stage 6 (0.8s) -> shaping
    const t6 = setTimeout(() => {
      setStage(7);
      setOrbState("shaping");
      setMainText("Almost there...");
      setSubText("Rendering technical isometric blueprint visualization...");
      playStageProgress();
    }, 6600);

    // Dramatic transition: orb expands and morphs into final result
    const t7 = setTimeout(() => {
      if (resolvedProject) {
        onComplete(resolvedProject);
      } else {
        // Wait another 300ms if project is still parsing
        projectPromise.then((proj) => onComplete(proj));
      }
    }, 7700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete, resolvedProject, projectPromise]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 max-w-2xl mx-auto z-10 select-none">
      {/* Central orb container with stage-dependent animations */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <ThinkingOrbWrapper
          state={orbState}
          variant="hero"
          speed={stage === 7 ? 1.6 : 1.2}
        />

        {/* Floating tokens appear in Stage 2, orbit in Stage 3 & 4 */}
        {(stage === 2 || stage === 3 || stage === 4) && (
          <OrbitingKeywords isOrbiting={stage >= 3} />
        )}

        {/* Expanding shockwave ring at stage 7 */}
        {stage === 7 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-cyan-400 pointer-events-none"
          />
        )}
      </div>

      {/* Stage progress pill */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] font-mono tracking-widest uppercase text-white/40 mb-3 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10"
      >
        Stage 0{stage} / 07 • {orbState.toUpperCase()}
      </motion.div>

      {/* Changing text messages */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mainText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="space-y-2"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {mainText}
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
            {subText}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Feasibility checks animated during stage 5 */}
      {stage >= 5 && <FeasibilityChecklist />}
    </div>
  );
}
