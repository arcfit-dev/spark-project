"use client";

import React from "react";
import { GraduationCap, CheckCircle2 } from "lucide-react";

interface LearningOutcomesProps {
  learnings: string[];
}

export function LearningOutcomes({ learnings }: LearningOutcomesProps) {
  return (
    <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 backdrop-blur-md text-left">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap className="w-4 h-4 text-purple-400" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
          What you&apos;ll learn & master
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {learnings.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
