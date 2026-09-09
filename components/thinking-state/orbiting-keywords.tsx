"use client";

import React from "react";
import { motion } from "framer-motion";

interface OrbitingKeywordsProps {
  isOrbiting: boolean;
  keywords?: string[];
}

const DEFAULT_KEYWORDS = [
  "AI",
  "SENSORS",
  "DATA",
  "SCHOOL",
  "PHYSICS",
  "ENERGY",
  "PROTOTYPE",
  "EXPERIMENT",
];

export function OrbitingKeywords({ isOrbiting, keywords = DEFAULT_KEYWORDS }: OrbitingKeywordsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {keywords.slice(0, 6).map((word, i) => {
        const angle = (i / 6) * 2 * Math.PI;
        const radius = isOrbiting ? 130 : 160;
        const initialX = Math.cos(angle) * radius;
        const initialY = Math.sin(angle) * (radius * 0.55);

        return (
          <motion.div
            key={word}
            initial={{ opacity: 0, scale: 0.6, x: 0, y: 0 }}
            animate={
              isOrbiting
                ? {
                    opacity: [0.7, 1, 0.7],
                    scale: [0.85, 1.05, 0.85],
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI) * radius,
                      Math.cos(angle + 2 * Math.PI) * radius,
                    ],
                    y: [
                      Math.sin(angle) * (radius * 0.45),
                      Math.sin(angle + Math.PI) * (radius * 0.45),
                      Math.sin(angle + 2 * Math.PI) * (radius * 0.45),
                    ],
                  }
                : {
                    opacity: 0.85,
                    scale: 1,
                    x: initialX,
                    y: initialY,
                  }
            }
            transition={
              isOrbiting
                ? {
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : {
                    duration: 0.6,
                    delay: i * 0.08,
                    type: "spring",
                  }
            }
            className="absolute px-2.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-[11px] font-mono tracking-wider font-semibold text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md"
          >
            {word}
          </motion.div>
        );
      })}
    </div>
  );
}
