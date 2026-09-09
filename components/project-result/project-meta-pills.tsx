"use client";

import React from "react";
import { SparkProject } from "@/types/project";
import { Gauge, Clock, Coins, Users } from "lucide-react";

interface ProjectMetaPillsProps {
  project: SparkProject;
}

export function ProjectMetaPills({ project }: ProjectMetaPillsProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "text-emerald-300 bg-emerald-500/10 border-emerald-500/30";
      case "medium":
        return "text-amber-300 bg-amber-500/10 border-amber-500/30";
      case "challenging":
        return "text-rose-300 bg-rose-500/10 border-rose-500/30";
      default:
        return "text-cyan-300 bg-cyan-500/10 border-cyan-500/30";
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 pt-2">
      {/* Difficulty */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium ${getDifficultyColor(
          project.difficulty
        )}`}
      >
        <Gauge className="w-3.5 h-3.5" />
        <span>Difficulty: {project.difficulty}</span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-white/80 text-xs font-mono font-medium">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <span>Time: {project.duration}</span>
      </div>

      {/* Cost */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-white/80 text-xs font-mono font-medium">
        <Coins className="w-3.5 h-3.5 text-amber-400" />
        <span>Cost: {project.estimated_cost}</span>
      </div>

      {/* Age */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-white/80 text-xs font-mono font-medium">
        <Users className="w-3.5 h-3.5 text-purple-400" />
        <span>Ages: {project.age_range}</span>
      </div>
    </div>
  );
}
