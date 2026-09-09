"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const CHECKS = [
  "Age appropriate",
  "Safe for home & school",
  "Affordable / low-cost",
  "Tangible & buildable",
  "Science fair friendly",
];

export function FeasibilityChecklist() {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto mt-5">
      {CHECKS.map((item, idx) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: idx * 0.12,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-medium backdrop-blur-sm shadow-[0_0_12px_rgba(16,185,129,0.2)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.12 + 0.05 }}
            className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center"
          >
            <Check className="w-2.5 h-2.5 text-emerald-300" strokeWidth={3} />
          </motion.div>
          <span>{item}</span>
        </motion.div>
      ))}
    </div>
  );
}
