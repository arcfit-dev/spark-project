"use client";

import React, { useState } from "react";
import { Check, Package } from "lucide-react";
import { playChipClick } from "@/components/ui/sound-effects";

interface InteractiveChecklistProps {
  materials: string[];
}

export function InteractiveChecklist({ materials }: InteractiveChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    playChipClick();
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="rounded-2xl p-4 bg-white/[0.03] border border-white/10 backdrop-blur-md text-left">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
            Materials & Gear Checklist
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
          {checkedCount} / {materials.length} Ready
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {materials.map((item) => {
          const isChecked = !!checkedItems[item];
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item)}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border select-none cursor-pointer ${
                isChecked
                  ? "bg-cyan-950/30 border-cyan-500/40 text-white/90"
                  : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? "bg-cyan-500 border-cyan-400 text-black"
                    : "border-white/30 bg-black/40"
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-xs ${isChecked ? "line-through text-white/50" : ""}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
