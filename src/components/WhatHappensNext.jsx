import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Factory, 
  Droplet, 
  Sprout, 
  Leaf, 
  ShieldAlert, 
  Cpu, 
  Battery, 
  Zap, 
  Shirt, 
  Box, 
  Wrench, 
  Recycle, 
  Trash2, 
  HelpCircle, 
  Activity, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Map string keys to Lucide Components for dynamic icons
const iconMap = {
  truck: Truck,
  factory: Factory,
  droplet: Droplet,
  sprout: Sprout,
  leaf: Leaf,
  shieldalert: ShieldAlert,
  cpu: Cpu,
  battery: Battery,
  zap: Zap,
  shirt: Shirt,
  box: Box,
  wrench: Wrench,
  recycle: Recycle,
  trash: Trash2
};

export default function WhatHappensNext({ result }) {
  const [activeStep, setActiveStep] = useState(0);

  // Fallback defaults if Gemini didn't return steps
  const steps = result?.whatHappensNext || [
    {
      step: "Collection",
      description: "Waste is gathered from designated residential and commercial smart bins.",
      icon: "truck"
    },
    {
      step: "Sorting Facility",
      description: "Optical sorting systems segregate materials by material composition and quality.",
      icon: "factory"
    },
    {
      step: "Cleaning & Shredding",
      description: "Contaminants are washed off, and material is shredded into secondary flakes.",
      icon: "droplet"
    },
    {
      step: "Material Conversion",
      description: "Flakes are melted down and pelletized into raw manufacturing polymers or composites.",
      icon: "zap"
    },
    {
      step: "New Product Manufacturing",
      description: "Recycled resins are spun into textiles or molded into new eco-friendly containers.",
      icon: "shirt"
    }
  ];

  // Helper to render matching icon
  const getIcon = (iconName) => {
    const key = (iconName || "recycle").toLowerCase();
    return iconMap[key] || Recycle;
  };

  const activeDetails = steps[activeStep] || steps[0];
  const ActiveIcon = getIcon(activeDetails.icon);

  return (
    <div className="glass p-6 md:p-8 rounded-3xl text-left relative overflow-hidden border border-white/10 w-full transition-all duration-300 hover:border-cyan-500/20">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Header Block */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <Recycle className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-mono block uppercase tracking-wider">
              Circular Economy Insight
            </span>
            <h4 className="font-display font-black text-lg text-white mt-0.5">
              What Happens Next?
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-3 py-1.5 rounded-lg font-mono">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Interactive Journey</span>
        </div>
      </div>

      {/* Timeline Nodes */}
      <div className="relative mb-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-3 relative">
          {steps.map((item, idx) => {
            const isLast = idx === steps.length - 1;
            const isActive = activeStep === idx;
            const IconComponent = getIcon(item.icon);

            return (
              <React.Fragment key={idx}>
                {/* Timeline Node Icon Card */}
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 flex items-center space-x-3.5 p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative z-10 w-full group ${
                    isActive 
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.04] hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/5'
                  }`}>
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Phase 0{idx + 1}</span>
                    <span className="text-white text-xs font-bold block truncate mt-0.5">{item.step}</span>
                  </div>
                </button>

                {/* Connecting arrow/line with moving pulse */}
                {!isLast && (
                  <div className="flex items-center justify-center shrink-0 w-full md:w-auto my-1 md:my-0">
                    {/* Desktop horizontal path */}
                    <div className="hidden md:block relative w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className={`absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-cyan-400 to-transparent`}
                      />
                    </div>
                    {/* Mobile vertical indicator */}
                    <div className="md:hidden relative w-1 h-6 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className="absolute left-0 right-0 h-6 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detail Panel (Interactive description) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="bg-white/[0.02] border border-cyan-500/10 rounded-2xl p-5 md:p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/3 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Active Stage {activeStep + 1} of {steps.length}
                </span>
                <span className="text-[10px] text-gray-500">Real-World Circular Impact</span>
              </div>
              <h5 className="text-white font-bold text-base mt-2">{activeDetails.step}</h5>
              <p className="text-gray-300 text-sm leading-relaxed mt-1 font-sans">
                {activeDetails.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-mono shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Circular Loop Verified</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
