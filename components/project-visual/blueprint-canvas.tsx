"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SparkProject, VisualType } from "@/types/project";
import { Layers, Eye, Info, Sparkles, ZoomIn } from "lucide-react";

interface BlueprintCanvasProps {
  project: SparkProject;
  revealProgress: number; // 0 to 1
}

interface Hotspot {
  x: number; // percentage
  y: number; // percentage
  label: string;
  detail: string;
}

export function BlueprintCanvas({ project, revealProgress }: BlueprintCanvasProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showCallouts, setShowCallouts] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const visualType: VisualType = project.visual_type || "environment";

  // Dynamic Hotspot definitions for each project archetype
  const hotspots: Record<VisualType, Hotspot[]> = {
    environment: [
      { x: 30, y: 38, label: "Multi-Stream Audit Bins", detail: "Color-coded bins for clear classroom waste categorization." },
      { x: 68, y: 32, label: "Digital Audit Log", detail: "Smartphone camera logs daily bag weights and photo proof." },
      { x: 74, y: 72, label: "Trend Analytics", detail: "Auto-calculated weekly charts pinpointing waste spikes." },
      { x: 26, y: 76, label: "Precision Spring Scale", detail: "Measures waste mass down to 50g increments safely." },
    ],
    electronics: [
      { x: 32, y: 55, label: "Microcontroller (Arduino/micro:bit)", detail: "Processes analog sensor voltage in a 10ms sampling loop." },
      { x: 65, y: 35, label: "Analog Sound Microphone", detail: "Sensitivity pot calibrates classroom quiet vs study noise." },
      { x: 70, y: 75, label: "RGB LED Traffic Light", detail: "Green (quiet) -> Yellow (creeping) -> Red (needs reset)." },
      { x: 28, y: 28, label: "5V USB / Battery Rail", detail: "Powers circuit cleanly without any high voltage or mains hazard." },
    ],
    app: [
      { x: 35, y: 45, label: "Webcam Input Feed", detail: "Real-time 30 FPS video frame grabber via HTML5 canvas." },
      { x: 66, y: 35, label: "Vision ML Classifier", detail: "Runs TensorFlow.js neural net client-side with zero latency." },
      { x: 68, y: 70, label: "Feedback UI HUD", detail: "Bold green/yellow card showing instant destination bin." },
      { x: 25, y: 75, label: "Edge Decision Engine", detail: "Confidence threshold check (>90%) before flashing confirmation." },
    ],
    science: [
      { x: 48, y: 22, label: "Inflow Chamber", detail: "Measured sample with standardized soil turbidity." },
      { x: 48, y: 42, label: "Activated Charcoal Strata", detail: "Adsorbs fine dissolved dyes, odors, and chemical residues." },
      { x: 48, y: 62, label: "Fractionated Silica Sand", detail: "Traps particulate debris down to 20 microns." },
      { x: 48, y: 82, label: "Secchi Clarity Tube", detail: "Transparent test vial confirms crystal-clear effluent." },
    ],
    mechanical: [
      { x: 30, y: 40, label: "Differential Rocker Bar", detail: "Balances chassis pitch across uneven Martian obstacles." },
      { x: 68, y: 45, label: "Articulated Bogie Joint", detail: "Enables multi-wheel ground contact without axles." },
      { x: 48, y: 70, label: "Center of Gravity Anchor", detail: "Low mass payload cradle prevents rollover on 45° inclines." },
      { x: 78, y: 76, label: "High-Traction Tread", detail: "Rubberized rim caps grip loose gravel and books." },
    ],
    art: [
      { x: 48, y: 38, label: "Chladni Resonator Plate", detail: "Thin 20cm brass sheet vibrating at harmonic frequencies." },
      { x: 48, y: 70, label: "Transducer Driver Post", detail: "Couples audio speaker vibrations directly to plate center." },
      { x: 24, y: 50, label: "Nodal Wave Geometry", detail: "Sand particles migrate to stillness at zero-velocity nodes." },
      { x: 74, y: 35, label: "Frequency Generator Dial", detail: "Synthesizes pure sine waves from 100 Hz to 2000 Hz." },
    ],
    blueprint: [
      { x: 35, y: 40, label: "Input Sensor Node", detail: "Gathers real-time classroom telemetry." },
      { x: 65, y: 40, label: "Processing Core", detail: "Evaluates empirical test criteria." },
      { x: 50, y: 75, label: "Action Output", detail: "Displays tangible results to students and teachers." },
    ],
  };

  const currentHotspots = hotspots[visualType] || hotspots.blueprint;

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] flex flex-col justify-between rounded-3xl bg-[#090b11] border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.08)] overflow-hidden">
      {/* Blueprint Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/15 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
              TECHNICAL BLUEPRINT // SCHEMATIC {visualType.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-white/40">
              SCALE 1:1 • REV 2.4 • SYSTEM READY
            </span>
          </div>
        </div>

        {/* Blueprint view controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
              showGrid
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-white/[0.04] border-white/10 text-white/40 hover:text-white"
            }`}
            title="Toggle Grid"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCallouts(!showCallouts)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
              showCallouts
                ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                : "bg-white/[0.04] border-white/10 text-white/40 hover:text-white"
            }`}
            title="Toggle Hotspots"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pins</span>
          </button>

          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 ${
              isZoomed
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-white/[0.04] border-white/10 text-white/40 hover:text-white"
            }`}
            title="Toggle Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Diagram Render Area */}
      <div className="relative flex-1 flex items-center justify-center p-6 overflow-hidden select-none">
        {/* Technical Blueprint Isometric Grid */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        )}

        {/* Laser Vertical Scan Line (Sweeps across image during reveal) */}
        <motion.div
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff] pointer-events-none z-20"
        />

        {/* Scalable Container for SVG Isometric Diagram */}
        <motion.div
          animate={{
            scale: isZoomed ? 1.25 : 1,
            filter: revealProgress < 0.4 ? "blur(4px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-lg aspect-square flex items-center justify-center"
        >
          {/* Dynamic SVG Technical Diagram tailored to Project Visual Type */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Common Blueprint Construction Circle & Guides */}
            <circle cx="250" cy="250" r="220" stroke="#00f0ff" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
            <circle cx="250" cy="250" r="160" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 4" opacity="0.2" />
            <line x1="30" y1="250" x2="470" y2="250" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 6" opacity="0.2" />
            <line x1="250" y1="30" x2="250" y2="470" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 6" opacity="0.2" />

            {/* Render archetype-specific technical components */}
            {visualType === "environment" && (
              <g className="diagram-environment">
                {/* School Audit Station - Isometric Bins */}
                <path d="M120 180 L200 140 L280 180 L200 220 Z" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="2" />
                <path d="M120 180 L120 280 L200 320 L200 220 Z" fill="#06b6d4" fillOpacity="0.1" stroke="#06b6d4" strokeWidth="2" />
                <path d="M280 180 L280 280 L200 320 L200 220 Z" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="2" />

                {/* Smartphone Logger on Right */}
                <rect x="310" y="140" width="110" height="180" rx="14" fill="#090b14" stroke="#a855f7" strokeWidth="2.5" />
                <rect x="325" y="165" width="80" height="120" rx="6" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="335" y1="185" x2="395" y2="185" stroke="#a855f7" strokeWidth="2" />
                <line x1="335" y1="205" x2="385" y2="205" stroke="#a855f7" strokeWidth="2" />
                <line x1="335" y1="225" x2="370" y2="225" stroke="#a855f7" strokeWidth="2" />

                {/* Hanging Spring Scale on Left */}
                <line x1="90" y1="280" x2="90" y2="380" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="90" cy="320" r="16" fill="#090b14" stroke="#00f0ff" strokeWidth="2" />
                <path d="M90 336 L90 380 L80 395" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />

                {/* Connecting Data Flow Vector Arrow */}
                <path d="M200 220 Q260 170 310 200" stroke="#00f0ff" strokeWidth="2" strokeDasharray="5 5" />
                <polygon points="312,197 318,202 312,207" fill="#00f0ff" />

                {/* Metric Summary Card Bottom */}
                <rect x="160" y="340" width="220" height="70" rx="10" fill="#090b14" stroke="#10b981" strokeWidth="1.5" />
                <line x1="180" y1="385" x2="220" y2="385" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                <line x1="235" y1="365" x2="275" y2="365" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                <line x1="290" y1="375" x2="330" y2="375" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                <text x="180" y="360" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">WASTE REDUCTION: -42%</text>
              </g>
            )}

            {visualType === "electronics" && (
              <g className="diagram-electronics">
                {/* Microcontroller PCB Board */}
                <rect x="90" y="180" width="180" height="150" rx="8" fill="#065f46" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
                <rect x="120" y="215" width="80" height="70" rx="4" fill="#090b14" stroke="#10b981" strokeWidth="1.5" />
                <text x="135" y="255" fill="#10b981" fontSize="12" fontFamily="monospace">ATMEGA</text>

                {/* Sound Sensor Module */}
                <rect x="290" y="110" width="110" height="90" rx="6" fill="#1e1b4b" fillOpacity="0.4" stroke="#818cf8" strokeWidth="2" />
                <circle cx="345" cy="155" r="22" fill="#090b14" stroke="#818cf8" strokeWidth="2" />
                <circle cx="345" cy="155" r="12" fill="#818cf8" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1" />
                <text x="320" y="130" fill="#818cf8" fontSize="10" fontFamily="monospace">MIC SENSOR</text>

                {/* Traffic Light LED Tower */}
                <rect x="320" y="240" width="65" height="160" rx="12" fill="#090b14" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="352" cy="275" r="16" fill="#ef4444" fillOpacity="0.8" stroke="#ef4444" strokeWidth="2" />
                <circle cx="352" cy="320" r="16" fill="#f59e0b" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="352" cy="365" r="16" fill="#10b981" fillOpacity="0.9" stroke="#10b981" strokeWidth="2" />

                {/* Circuit Wires */}
                <path d="M290 155 L240 155 L240 180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M270 240 L320 275" stroke="#ef4444" strokeWidth="2" />
                <path d="M270 260 L320 320" stroke="#f59e0b" strokeWidth="2" />
                <path d="M270 280 L320 365" stroke="#10b981" strokeWidth="2" />
              </g>
            )}

            {visualType === "app" && (
              <g className="diagram-app">
                {/* Laptop & Webcam Scan Area */}
                <rect x="80" y="160" width="220" height="150" rx="10" fill="#090b14" stroke="#00f0ff" strokeWidth="2" />
                <polygon points="60,310 320,310 340,330 40,330" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
                
                {/* Screen UI elements with Bounding Box */}
                <rect x="100" y="180" width="180" height="110" rx="4" fill="#0284c7" fillOpacity="0.1" stroke="#00f0ff" strokeWidth="1" />
                <rect x="130" y="200" width="70" height="70" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" />
                <text x="132" y="195" fill="#22c55e" fontSize="10" fontFamily="monospace">CANTEEN TRASH: 98%</text>
                
                {/* Target Destination Bin */}
                <rect x="330" y="180" width="110" height="140" rx="12" fill="#090b14" stroke="#a855f7" strokeWidth="2" />
                <path d="M350 220 L370 250 L410 200" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <text x="345" y="280" fill="#a855f7" fontSize="12" fontFamily="monospace" fontWeight="bold">RECYCLING</text>

                {/* Data Flow Ray */}
                <path d="M200 235 Q270 210 330 230" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 4" />
              </g>
            )}

            {visualType === "science" && (
              <g className="diagram-science">
                {/* Multi-Layer Gravity Filter Column */}
                <rect x="180" y="90" width="140" height="300" rx="14" fill="#090b14" stroke="#00f0ff" strokeWidth="2" />
                
                {/* Layer 1: Pebbles */}
                <rect x="182" y="100" width="136" height="50" fill="#64748b" fillOpacity="0.3" stroke="#64748b" strokeWidth="1" />
                <text x="215" y="130" fill="#94a3b8" fontSize="11" fontFamily="monospace">GRAVEL</text>
                
                {/* Layer 2: Coarse Sand */}
                <rect x="182" y="152" width="136" height="60" fill="#eab308" fillOpacity="0.2" stroke="#eab308" strokeWidth="1" />
                <text x="200" y="185" fill="#fde047" fontSize="11" fontFamily="monospace">COARSE SAND</text>

                {/* Layer 3: Fine Sand */}
                <rect x="182" y="214" width="136" height="60" fill="#ca8a04" fillOpacity="0.3" stroke="#ca8a04" strokeWidth="1" />
                <text x="210" y="248" fill="#fef08a" fontSize="11" fontFamily="monospace">FINE SAND</text>

                {/* Layer 4: Activated Charcoal */}
                <rect x="182" y="276" width="136" height="60" fill="#1e293b" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1" />
                <text x="195" y="310" fill="#38bdf8" fontSize="11" fontFamily="monospace">CHARCOAL</text>

                {/* Clean Effluent Catch Flask */}
                <path d="M200 390 L300 390 L330 460 L170 460 Z" fill="#0284c7" fillOpacity="0.25" stroke="#00f0ff" strokeWidth="2" />
                <text x="210" y="435" fill="#00f0ff" fontSize="12" fontFamily="monospace" fontWeight="bold">PURIFIED</text>
              </g>
            )}

            {visualType === "mechanical" && (
              <g className="diagram-mechanical">
                {/* Rocker-Bogie Chassis Arm Geometry */}
                <path d="M120 280 L220 200 L340 230 L400 320" stroke="#00f0ff" strokeWidth="5" strokeLinecap="round" />
                <path d="M220 200 L260 300" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
                <circle cx="220" cy="200" r="8" fill="#ffffff" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="260" cy="300" r="8" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />

                {/* 6 Rover Wheels */}
                <circle cx="120" cy="280" r="28" fill="#090b14" stroke="#00f0ff" strokeWidth="3" />
                <circle cx="260" cy="300" r="28" fill="#090b14" stroke="#a855f7" strokeWidth="3" />
                <circle cx="400" cy="320" r="28" fill="#090b14" stroke="#00f0ff" strokeWidth="3" />

                {/* Center of Mass Payload Box */}
                <rect x="180" y="140" width="110" height="50" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="200" y="170" fill="#f59e0b" fontSize="11" fontFamily="monospace">PAYLOAD</text>

                {/* Obstacle rock terrain */}
                <path d="M60 350 L180 350 L220 310 L270 350 L440 350" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            )}

            {visualType === "art" && (
              <g className="diagram-art">
                {/* Square Chladni Plate */}
                <rect x="110" y="110" width="280" height="280" rx="4" fill="#090b14" stroke="#00f0ff" strokeWidth="2.5" />
                
                {/* Intricate Geometric Cymatics Nodal Curves */}
                <circle cx="250" cy="250" r="90" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 4" />
                <circle cx="250" cy="250" r="50" stroke="#ec4899" strokeWidth="2" />
                <path d="M110 110 Q250 200 390 110" stroke="#a855f7" strokeWidth="2" />
                <path d="M110 390 Q250 300 390 390" stroke="#a855f7" strokeWidth="2" />
                <path d="M110 110 Q200 250 110 390" stroke="#a855f7" strokeWidth="2" />
                <path d="M390 110 Q300 250 390 390" stroke="#a855f7" strokeWidth="2" />

                {/* Center Speaker Driver Hub */}
                <circle cx="250" cy="250" r="18" fill="#ec4899" fillOpacity="0.4" stroke="#ffffff" strokeWidth="2" />
                <text x="205" y="425" fill="#00f0ff" fontSize="12" fontFamily="monospace">RESONANCE: 880 Hz</text>
              </g>
            )}
          </svg>

          {/* Interactive Hotspot Pins & Callouts */}
          {showCallouts &&
            currentHotspots.map((spot, i) => (
              <div
                key={spot.label}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot?.label === spot.label ? null : spot)}
                  className="group relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-black font-mono font-bold text-[10px] shadow-[0_0_15px_#00f0ff] hover:scale-125 transition-transform cursor-pointer"
                >
                  <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60 pointer-events-none" />
                  <span>0{i + 1}</span>
                </button>
              </div>
            ))}
        </motion.div>
      </div>

      {/* Interactive Tooltip Card on Hotspot Click/Hover */}
      {activeHotspot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="relative z-30 mx-4 mb-4 p-3.5 rounded-2xl bg-black/85 border border-cyan-500/40 backdrop-blur-xl shadow-2xl flex items-start gap-3 text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-300">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
              {activeHotspot.label}
            </h4>
            <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
              {activeHotspot.detail}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveHotspot(null)}
            className="text-white/40 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
          >
            Close
          </button>
        </motion.div>
      )}

      {/* Bottom Blueprint Title Block & Metadata Strip */}
      <div className="relative z-20 px-5 py-3 border-t border-cyan-500/15 bg-black/50 backdrop-blur-md flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white/70">PROTOTYPE SCHEMATIC</span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">{project.title}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>GRID: 32PX ISOMETRIC</span>
          <span>FEASIBILITY: {project.feasibility_score}%</span>
        </div>
      </div>
    </div>
  );
}
