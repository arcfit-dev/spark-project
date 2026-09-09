"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn tiny burst of reactive particles on click
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1 + Math.random() * 1.5,
          baseAlpha: 0.8,
          alpha: 0.8,
          color: Math.random() > 0.5 ? "rgba(168, 85, 247, " : "rgba(56, 189, 248, ",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Initial ambient particles
    const particleCount = Math.min(45, Math.floor((width * height) / 25000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1 + Math.random() * 1.5,
        baseAlpha: 0.15 + Math.random() * 0.35,
        alpha: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.6 ? "rgba(168, 85, 247, " : "rgba(56, 189, 248, ",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle cursor light glow
      if (mousePos.current.x > 0) {
        const radGrad = ctx.createRadialGradient(
          mousePos.current.x,
          mousePos.current.y,
          0,
          mousePos.current.x,
          mousePos.current.y,
          280
        );
        radGrad.addColorStop(0, "rgba(147, 51, 234, 0.04)");
        radGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.02)");
        radGrad.addColorStop(1, "transparent");
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap or decay burst particles
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Proximity to mouse
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
          p.alpha = Math.min(0.9, p.baseAlpha + force * 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep dark mesh background with ambient gradients */}
      <div className="absolute inset-0 bg-[#07080c]" />
      
      {/* Radial ambient glow orbs in background */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-purple-900/15 via-indigo-950/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-cyan-950/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-violet-950/15 blur-[140px] pointer-events-none" />

      {/* Subtle fine tech grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
