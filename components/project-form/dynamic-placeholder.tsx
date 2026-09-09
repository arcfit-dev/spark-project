"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROTATING_PROMPTS = [
  "Maybe something involving classroom noise...",
  "Maybe detecting if my dog is sleeping or awake...",
  "Maybe measuring plastic waste in the school canteen...",
  "Maybe a solar powered cooker out of a pizza box...",
  "Maybe an AI that sorts recycling from cafeteria trash...",
  "Maybe seeing if studying with video game music works...",
  "Maybe a rover suspension that climbs over textbooks...",
  "Maybe measuring if school bags are hurting our backs...",
];

export function DynamicPlaceholder() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-5 overflow-hidden text-white/30 text-sm italic pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 truncate"
        >
          {ROTATING_PROMPTS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
