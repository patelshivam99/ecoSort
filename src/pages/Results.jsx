import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from '../components/ResultCard';
import { slideUp, fadeIn } from '../animations/motionVariants';
import { Sparkles, Trash2, ShieldCheck, ChevronRight, Leaf } from 'lucide-react';

export default function Results({ result, onReset }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!result || !result.detectedItems || result.detectedItems.length === 0) {
    return (
      <div className="py-20 text-center glass rounded-3xl max-w-xl mx-auto border border-white/10 mt-10">
        <p className="text-gray-400">No results found. Please try uploading an image again.</p>
        <button onClick={onReset} className="mt-4 px-6 py-2.5 bg-emerald-500 text-[#030704] font-bold rounded-xl">
          Return to Upload
        </button>
      </div>
    );
  }

  const items = result.detectedItems;
  const isMultiple = items.length > 1;

  // Helper to parse CO2 string (e.g. "0.08 kg" -> 0.08)
  const parseCo2Value = (str) => {
    if (!str) return 0;
    const matched = str.match(/([0-9.]+)/);
    return matched ? parseFloat(matched[1]) : 0;
  };

  // Calculate cumulative CO2 reduction
  const totalCo2Saved = items.reduce((sum, item) => sum + parseCo2Value(item.co2Reduction), 0).toFixed(2);

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="py-12 md:py-20 relative z-10"
    >
      {/* Decorative Sparkles Header */}
      <div className="flex items-center justify-center space-x-1.5 mb-3">
        <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
          AI Analysis Complete
        </span>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Scan <span className="text-emerald-400 text-glow-green">Results</span>
        </h2>
        <p className="mt-2 text-gray-400 max-w-md mx-auto text-sm">
          {isMultiple 
            ? `Detected ${items.length} distinct items in the image. Select a tab below to inspect.`
            : `Detected 1 waste item. Inspect its circularity index and sorting tips below.`}
        </p>
      </div>

      {/* Cumulative Overview Banner (Displays when multiple items are detected) */}
      {isMultiple && (
        <div className="w-full max-w-5xl mx-auto px-4 mb-8">
          <div className="glass p-5 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 to-cyan-950/20 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-glow opacity-10 pointer-events-none" />
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Cumulative Segregation Impact</h3>
                <p className="text-xs text-gray-400 mt-0.5">Summary of all classified components in this image.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 pl-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Items Found</span>
                <span className="text-white font-black text-xl font-display">{items.length}</span>
              </div>
              <div className="ml-4">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Total Carbon Savings</span>
                <span className="text-emerald-400 font-black text-xl font-display text-glow-green">{totalCo2Saved} kg CO₂</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Tabs Selector for Multiple Items */}
      {isMultiple && (
        <div className="w-full max-w-5xl mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl overflow-x-auto">
            {items.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center space-x-2 flex-shrink-0 border ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-emerald-500 text-[#030704]' : 'bg-white/5 text-gray-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{item.item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* active ResultCard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <ResultCard result={items[activeIdx]} onReset={onReset} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
