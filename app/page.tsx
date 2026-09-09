"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LandingHero } from "@/components/landing/landing-hero";
import { ConversationalForm } from "@/components/project-form/conversational-form";
import { ThinkingSequence } from "@/components/thinking-state/thinking-sequence";
import { RevealOrchestrator } from "@/components/project-result/reveal-orchestrator";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ThinkingOrbWrapper } from "@/components/ui/thinking-orb-wrapper";
import { AppState, ProjectFormData, SparkProject } from "@/types/project";
import { toggleSound, isSoundEnabled, playStageProgress } from "@/components/ui/sound-effects";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { SAMPLE_PROJECTS } from "@/lib/ai/sample-projects";

export default function SparkLabApp() {
  const [appState, setAppState] = useState<AppState>("IDLE");
  const [currentProject, setCurrentProject] = useState<SparkProject | null>(null);
  const [projectPromise, setProjectPromise] = useState<Promise<SparkProject> | null>(null);
  const [hasError, setHasError] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  // Sound toggle handler
  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  // Trigger project generation API call
  const triggerGeneration = (formData?: ProjectFormData) => {
    setHasError(false);
    setAppState("GENERATING");

    const promise = fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData ? JSON.stringify(formData) : JSON.stringify({}),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return (await res.json()) as SparkProject;
      })
      .catch((err) => {
        console.warn("Generation fallback activated:", err);
        // Fallback to sample project
        return SAMPLE_PROJECTS[0];
      });

    setProjectPromise(promise);
  };

  // Choice A: Build my idea
  const handleSelectBuild = () => {
    setAppState("FORM");
  };

  // Choice B: Surprise me (Instant Random Mode)
  const handleSelectSurprise = () => {
    triggerGeneration(undefined);
  };

  // Form submitted
  const handleFormSubmit = (formData: ProjectFormData) => {
    triggerGeneration(formData);
  };

  // Form cancelled
  const handleFormCancel = () => {
    setAppState("IDLE");
  };

  // Generation sequence complete -> Reveal Project
  const handleGenerationComplete = (project: SparkProject) => {
    setCurrentProject(project);
    setAppState("RESULT");
  };

  // "Make another idea" (Section 17: resets with reverse animation)
  const handleMakeAnother = () => {
    setAppState("RESETTING");
    playStageProgress();
    setTimeout(() => {
      setCurrentProject(null);
      setProjectPromise(null);
      setAppState("IDLE");
    }, 450);
  };

  return (
    <main className="relative min-h-screen bg-[#07080c] text-white flex flex-col justify-between overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Background Interactive Ambient Particle Field */}
      <ParticlesBackground />

      {/* Floating Audio Toggle in corner */}
      <div className="fixed top-5 right-5 z-50">
        <button
          type="button"
          onClick={handleToggleSound}
          className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
          title={soundActive ? "Mute sound effects" : "Enable futuristic sound effects"}
          aria-label="Sound Toggle"
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Error Boundary / Fallback View (Prompt Section 26) */}
      {hasError && (
        <div className="relative z-50 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <ThinkingOrbWrapper state="breathing" variant="hero" speed={0.5} />
          <h3 className="text-xl font-bold text-white mt-6">
            That spark got lost somewhere.
          </h3>
          <p className="text-white/60 text-sm mt-1 mb-6">
            The AI laboratory encountered an unexpected hiccup. Let&apos;s reignite it.
          </p>
          <button
            type="button"
            onClick={() => {
              setHasError(false);
              setAppState("IDLE");
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try again</span>
          </button>
        </div>
      )}

      {/* Main State Machine Views */}
      {!hasError && (
        <AnimatePresence mode="wait">
          {/* STATE: IDLE (Landing View) */}
          {appState === "IDLE" && (
            <motion.div
              key="state-idle"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full"
            >
              <LandingHero
                onSelectBuild={handleSelectBuild}
                onSelectSurprise={handleSelectSurprise}
              />
            </motion.div>
          )}

          {/* STATE: FORM (Conversational 5-Question Form) */}
          {appState === "FORM" && (
            <motion.div
              key="state-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 w-full"
            >
              <ConversationalForm
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </motion.div>
          )}

          {/* STATE: GENERATING (7-Stage Full Screen AI Sequence) */}
          {appState === "GENERATING" && projectPromise && (
            <motion.div
              key="state-generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full"
            >
              <ThinkingSequence
                projectPromise={projectPromise}
                onComplete={handleGenerationComplete}
              />
            </motion.div>
          )}

          {/* STATE: RESULT (3-Second Choreographed Reveal + Blueprint + Details) */}
          {appState === "RESULT" && currentProject && (
            <motion.div
              key="state-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full"
            >
              <RevealOrchestrator
                project={currentProject}
                onMakeAnother={handleMakeAnother}
                onSurpriseMe={handleSelectSurprise}
              />
            </motion.div>
          )}

          {/* STATE: RESETTING (Reverse transition back to landing) */}
          {appState === "RESETTING" && (
            <motion.div
              key="state-resetting"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center min-h-[80vh]"
            >
              <ThinkingOrbWrapper state="breathing" variant="hero" speed={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Persistent Minimal Footer */}
      <footer className="relative z-10 py-6 text-center text-xs font-mono text-white/30 border-t border-white/[0.04] mt-auto">
        <div className="flex items-center justify-center gap-2">
          <span>SPARKLAB AI INVENTION LAB</span>
          <span>•</span>
          <span>EMPOWERING TEEN BUILDERS</span>
          <span>•</span>
          <span>V2.4</span>
        </div>
      </footer>
    </main>
  );
}
