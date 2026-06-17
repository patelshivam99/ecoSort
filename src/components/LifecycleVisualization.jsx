import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, ArrowRight, Activity } from 'lucide-react';

export default function LifecycleVisualization({ result }) {
  const steps = result?.lifecycleVisualizationSteps || [
    "Discarded Material",
    "Recycling Collector",
    "Sorting Plant",
    "Processed Material",
    "New Product Loop"
  ];

  return (
    <div className="glass p-6 md:p-8 rounded-3xl text-left relative overflow-hidden border border-white/10 w-full transition-all duration-300 hover:border-cyan-500/20">
      {/* Glow Effect background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Header Block */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
            <Recycle className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-mono block uppercase tracking-wider">
              Circular Economy Insight
            </span>
            <h4 className="font-display font-black text-lg text-white mt-0.5">
              Material Lifecycle Visualization
            </h4>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-3 py-1.5 rounded-lg font-mono">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Active Loop</span>
        </div>
      </div>

      {/* Animated Flow Layout */}
      <div className="relative mt-4">
        {/* Row Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 relative">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Node Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-500/30 group cursor-pointer relative z-10"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                      Phase {idx + 1}
                    </span>
                    <span className="text-white text-xs font-bold sm:text-sm block mt-0.5 leading-snug group-hover:text-cyan-300 transition-colors">
                      {step}
                    </span>
                  </div>
                </motion.div>

                {/* Connecting arrow/line with moving pulse */}
                {!isLast && (
                  <div className="flex items-center justify-center shrink-0 w-full md:w-auto my-1 md:my-0">
                    {/* Desktop horizontal path */}
                    <div className="hidden md:block relative w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      />
                    </div>
                    {/* Mobile vertical indicator */}
                    <div className="md:hidden relative w-1 h-8 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                        className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
