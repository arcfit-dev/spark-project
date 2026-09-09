"use client";

import React, { useState } from "react";
import { Sparkles, Dices, Share2, Printer, Check, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { playChipClick } from "@/components/ui/sound-effects";
import { SparkProject } from "@/types/project";

interface ResultActionsProps {
  project: SparkProject;
  onMakeAnother: () => void;
  onSurpriseMe: () => void;
}

export function ResultActions({ project, onMakeAnother, onSurpriseMe }: ResultActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = () => {
    playChipClick();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00f0ff", "#a855f7", "#10b981", "#fbbf24"],
    });
    setShowShareModal(true);
  };

  const handleCopySummary = () => {
    playChipClick();
    const summary = `⚡ SparkLab Project Brief: ${project.title}\nChallenge: "${project.hook}"\nDifficulty: ${project.difficulty} | Time: ${project.duration} | Cost: ${project.estimated_cost}\n\nSteps:\n${project.steps.map((s) => `0${s.number}. ${s.title}: ${s.description}`).join("\n")}\n\nGenerated with SparkLab AI Project Lab`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 w-full">
      {/* Primary and Secondary Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Primary: Make another idea */}
        <button
          type="button"
          onClick={() => {
            playChipClick();
            onMakeAnother();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Make another idea</span>
        </button>

        {/* Secondary: Surprise me */}
        <button
          type="button"
          onClick={() => {
            playChipClick();
            onSurpriseMe();
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none"
        >
          <Dices className="w-4 h-4 text-cyan-400" />
          <span>Surprise me</span>
        </button>
      </div>

      {/* Share / Print Project Tools */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrint}
          className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Print Project Brief"
        >
          <Printer className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#0d1017] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-left">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Share Project Brief
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Copy this project brief to share with your science teacher or team.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white/80 max-h-48 overflow-y-auto space-y-1 select-all">
              <p className="font-bold text-cyan-300">{project.title}</p>
              <p className="italic text-white/60">&ldquo;{project.hook}&rdquo;</p>
              <p className="pt-2 text-[11px] text-white/50">
                {project.difficulty} • {project.duration} • {project.estimated_cost}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
