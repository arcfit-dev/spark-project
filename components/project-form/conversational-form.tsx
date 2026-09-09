"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThinkingOrbWrapper } from "@/components/ui/thinking-orb-wrapper";
import { ChipSelector } from "./chip-selector";
import { DynamicPlaceholder } from "./dynamic-placeholder";
import { ProjectFormData, Domain, ProjectType, Timeframe, Resource } from "@/types/project";
import { playStageProgress, playChipClick } from "@/components/ui/sound-effects";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";

interface ConversationalFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

const INTEREST_OPTIONS: Domain[] = [
  "Science",
  "Technology",
  "Environment",
  "AI & Robotics",
  "Space",
  "Art & Design",
  "Business",
  "Psychology",
  "Sports",
  "Health & Fitness",
  "Social Impact",
];

const PROJECT_TYPE_OPTIONS: ProjectType[] = [
  "Build something",
  "Run an experiment",
  "Investigate something",
  "Create something",
  "Solve a problem",
  "Make an app",
  "Build with AI",
  "Make a game",
];

const TIME_OPTIONS: Timeframe[] = [
  "This weekend",
  "1–2 weeks",
  "About a month",
  "Long-term",
];

const RESOURCE_OPTIONS: Resource[] = [
  "Laptop",
  "Phone",
  "Basic materials",
  "Electronics / Arduino",
  "3D printer",
  "Art supplies",
  "Small budget",
  "Almost nothing",
];

export function ConversationalForm({ onSubmit, onCancel }: ConversationalFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form State
  const [interests, setInterests] = useState<Domain[]>([]);
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [timeframe, setTimeframe] = useState<Timeframe | "">("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [customThought, setCustomThought] = useState("");

  const handleNext = () => {
    playStageProgress();
    if (step < 5) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      // Submit form
      onSubmit({
        interests,
        projectType: (projectType as ProjectType) || "Investigate something",
        timeframe: (timeframe as Timeframe) || "1–2 weeks",
        resources: resources.length > 0 ? resources : ["Phone", "Laptop"],
        customThought: customThought.trim() || undefined,
      });
    }
  };

  const handleBack = () => {
    playChipClick();
    if (step > 1) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    } else {
      onCancel();
    }
  };

  const isStepValid = () => {
    if (step === 1) return interests.length > 0;
    if (step === 2) return Boolean(projectType);
    if (step === 3) return Boolean(timeframe);
    if (step === 4) return resources.length > 0;
    return true; // Step 5 is optional
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center min-h-[85vh] justify-between z-10"
    >
      {/* Top Header: Cancel + Companion Thinking Orb + Step Counter */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Lab</span>
        </button>

        {/* Central Companion Orb in listening mode */}
        <div className="flex items-center gap-3">
          <ThinkingOrbWrapper state="listening" variant="companion" />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
              AI INGREDIENT COLLECTOR
            </p>
            <p className="text-[11px] text-white/40">Step {step} of 5</p>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-6 bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  : i < step
                  ? "w-2 bg-white/40"
                  : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Staged Question Body with Spring Physics */}
      <div className="w-full my-auto py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="text-center"
            >
              <span className="text-xs font-mono text-purple-400 tracking-wider uppercase px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                Question 01 — Interests
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                What are you curious about?
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-6">
                Pick as many topics as you like. We&apos;ll cross-pollinate them.
              </p>
              <ChipSelector
                options={INTEREST_OPTIONS}
                selected={interests}
                onChange={(vals) => setInterests(vals as Domain[])}
                multiSelect={true}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="text-center"
            >
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Question 02 — Project Style
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                What do you want to make?
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-6">
                Do you want to build hardware, code an app, or run a science test?
              </p>
              <ChipSelector
                options={PROJECT_TYPE_OPTIONS}
                selected={[projectType]}
                onChange={(vals) => setProjectType(vals[0] as ProjectType)}
                multiSelect={false}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="text-center"
            >
              <span className="text-xs font-mono text-amber-400 tracking-wider uppercase px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                Question 03 — Timeline
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                How much time do you have?
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-6">
                We will size the experiments so you can comfortably finish.
              </p>
              <ChipSelector
                options={TIME_OPTIONS}
                selected={[timeframe]}
                onChange={(vals) => setTimeframe(vals[0] as Timeframe)}
                multiSelect={false}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="text-center"
            >
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Question 04 — Gear & Resources
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                What can you use?
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-6">
                Select whatever tools or supplies you have lying around.
              </p>
              <ChipSelector
                options={RESOURCE_OPTIONS}
                selected={resources}
                onChange={(vals) => setResources(vals as Resource[])}
                multiSelect={true}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step-5"
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="text-center max-w-xl mx-auto"
            >
              <span className="text-xs font-mono text-purple-400 tracking-wider uppercase px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                Question 05 — Wildcard Thought (Optional)
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
                Got a random thought?
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-6">
                Any pet peeve, weird observation, or crazy idea in your head?
              </p>

              <div className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-4 focus-within:border-purple-400/80 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all">
                <textarea
                  value={customThought}
                  onChange={(e) => setCustomThought(e.target.value)}
                  rows={3}
                  className="w-full bg-transparent text-white text-base outline-none resize-none placeholder:text-transparent"
                  placeholder="Maybe something involving..."
                />

                {!customThought && (
                  <div className="absolute top-4 left-4 right-4 pointer-events-none">
                    <DynamicPlaceholder />
                  </div>
                )}
              </div>

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-2 justify-center mt-4 text-xs text-white/50">
                <span className="self-center">Try:</span>
                {[
                  "Plastic waste in canteen",
                  "Classroom noise meter",
                  "Plants vs light",
                  "Heavy school bags",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setCustomThought(tag)}
                    className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons (Back & Next/Generate) */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/70 hover:text-white transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? "Cancel" : "Back"}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg select-none cursor-pointer ${
            isStepValid()
              ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/10 text-white/30 cursor-not-allowed border border-white/5"
          }`}
        >
          {step === 5 ? (
            <>
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
              <span>Invent My Project</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
