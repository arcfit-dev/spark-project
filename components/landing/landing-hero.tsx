"use client";

import React from "react";
import { ThinkingOrbWrapper } from "@/components/ui/thinking-orb-wrapper";
import { ChoiceCards } from "./choice-cards";
import { Atom } from "lucide-react";

interface LandingHeroProps {
  onSelectBuild: () => void;
  onSelectSurprise: () => void;
}

export function LandingHero({ onSelectBuild, onSelectSurprise }: LandingHeroProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto z-10 py-6 my-auto w-full">
      {/* Central hero Thinking Orb in breathing (idle) state */}
      <div className="mb-4">
        <ThinkingOrbWrapper state="breathing" variant="hero" speed={0.9} />
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md shadow-sm">
        <Atom className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
        <span>AI PROJECT LAB</span>
      </div>

      {/* Huge headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.1]">
        What could you{" "}
        <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
          build?
        </span>
      </h1>

      {/* Supporting copy */}
      <p className="text-base sm:text-lg text-white/70 mt-3 max-w-lg font-normal leading-relaxed">
        Give me a curiosity. I&apos;ll turn it into a project you can actually make.
      </p>

      {/* Two interactive choices */}
      <div className="w-full flex justify-center">
        <ChoiceCards onSelectBuild={onSelectBuild} onSelectSurprise={onSelectSurprise} />
      </div>

      {/* Bottom subtle assurance */}
      <div className="mt-6 flex items-center gap-5 text-xs text-white/40 font-mono tracking-wide">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          Ages 13–15
        </span>
        <span>•</span>
        <span>Science fair & classroom ready</span>
        <span>•</span>
        <span>Zero login required</span>
      </div>
    </div>
  );
}
