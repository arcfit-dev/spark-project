"use client";

import React from "react";
import { motion } from "framer-motion";
import { playChipClick } from "@/components/ui/sound-effects";
import { Check } from "lucide-react";

interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
}

export function ChipSelector({
  options,
  selected,
  onChange,
  multiSelect = true,
}: ChipSelectorProps) {
  const toggleOption = (option: string) => {
    playChipClick();
    if (multiSelect) {
      if (selected.includes(option)) {
        onChange(selected.filter((item) => item !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange([option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto py-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            layout
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={`group relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none ${
              isSelected
                ? "bg-purple-500/20 text-white border-purple-400/80 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-[1.03]"
                : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {/* Animated neon travelling perimeter glow for selected item */}
            {isSelected && (
              <motion.span
                layoutId="chip-glow"
                className="absolute -inset-px rounded-xl border border-purple-400 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-3.5 h-3.5 text-purple-300" />
              </motion.span>
            )}

            <span>{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
