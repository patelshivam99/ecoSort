import React, { useState, useEffect } from 'react';
import { Leaf, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  const [statusText, setStatusText] = useState("Initializing vision model...");

  const statusLogs = [
    "Initializing vision model...",
    "Scanning material transparency...",
    "Analyzing item boundary layers...",
    "Cross-referencing municipal database...",
    "Calculating Circularity Score...",
    "Estimating CO₂ offsets...",
    "Compiling ethical validation guardrails...",
    "Rendering results..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statusLogs.length;
      setStatusText(statusLogs[index]);
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto glass p-12 rounded-3xl border border-emerald-500/20 text-center relative overflow-hidden flex flex-col items-center justify-center">
      {/* Glow Backdrops */}
      <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

      {/* Pulsing AI Leaf Logo */}
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf className="w-12 h-12 text-emerald-400" />
        </motion.div>
        
        {/* Orbiting Ring */}
        <div className="absolute inset-0 rounded-2xl border border-dashed border-emerald-400/40 animate-[spin_12s_linear_infinite]" />
      </div>

      {/* Progress Bars */}
      <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden mb-4 border border-white/5 relative">
        <motion.div 
          className="h-full bg-emerald-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>

      {/* Scrolling Text Status */}
      <div className="h-6 overflow-hidden flex items-center justify-center">
        <motion.p
          key={statusText}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="text-emerald-400 font-mono text-sm tracking-wide font-medium flex items-center justify-center"
        >
          <Cpu className="w-4 h-4 mr-2 animate-spin" />
          <span>{statusText}</span>
        </motion.p>
      </div>

      {/* Simulated Scanner Line overlaying container */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-scan" />
    </div>
  );
}
