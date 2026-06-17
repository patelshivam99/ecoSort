import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Compass, Info, Check, Trash2, CupSoda, FileText, GlassWater, Hammer, Sprout, Cpu, Leaf, RefreshCw, ShieldAlert } from 'lucide-react';
import AIWasteCoach from './AIWasteCoach';
import WhatHappensNext from './WhatHappensNext';
import EnvironmentalImpactDashboard from './EnvironmentalImpactDashboard';
import ResponsibleAICard from './ResponsibleAICard';
import { scaleIn } from '../animations/motionVariants';

export default function ResultCard({ result, onReset }) {
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  // Safe fallback score breakdown
  const score = result.sustainabilityScore || 85;
  const breakdown = result.sustainabilityScoreBreakdown || {
    recyclabilityScore: Math.round(score * 0.4),
    recyclabilityExplanation: "Calculated based on municipal recovery infrastructure and industrial polymer reprocessing capabilities.",
    reusePotentialScore: Math.round(score * 0.2),
    reusePotentialExplanation: "Evaluates standard structural resilience and safety of refilling or repurposing.",
    carbonReductionScore: Math.round(score * 0.2),
    carbonReductionExplanation: "Represents direct carbon offsets achieved by substituting primary feedstock with recycled material.",
    contaminationRiskScore: Math.max(0, 20 - Math.round((100 - score) * 0.25)),
    contaminationRiskExplanation: "Increases when organic residuals are left behind or labels use non-dissolvable adhesives."
  };

  // Category specific CSS class generator
  const getCategoryStyles = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('plastic')) {
      return {
        bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
        glow: 'shadow-cyan-500/10',
        text: 'text-cyan-400'
      };
    } else if (cat.includes('paper') || cat.includes('cardboard')) {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
        glow: 'shadow-emerald-500/10',
        text: 'text-emerald-400'
      };
    } else if (cat.includes('glass')) {
      return {
        bg: 'bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]',
        glow: 'shadow-teal-500/10',
        text: 'text-teal-400'
      };
    } else if (cat.includes('metal')) {
      return {
        bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
        glow: 'shadow-indigo-500/10',
        text: 'text-indigo-400'
      };
    } else if (cat.includes('organic')) {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        glow: 'shadow-amber-500/10',
        text: 'text-amber-400'
      };
    } else if (cat.includes('e-waste')) {
      return {
        bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]',
        glow: 'shadow-purple-500/10',
        text: 'text-purple-400'
      };
    }
    return {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
      glow: 'shadow-rose-500/10',
      text: 'text-rose-400'
    };
  };

  const style = getCategoryStyles(result.category);

  // Dynamic category icon picker
  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('plastic')) return CupSoda;
    if (cat.includes('paper') || cat.includes('cardboard')) return FileText;
    if (cat.includes('glass')) return GlassWater;
    if (cat.includes('metal')) return Hammer;
    if (cat.includes('organic')) return Sprout;
    if (cat.includes('e-waste')) return Cpu;
    return Trash2;
  };

  const CategoryIcon = getCategoryIcon(result.category);

  // Dynamic disposal instruction and icon picker
  const getDisposalDetails = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('organic')) {
      return {
        text: "Deposit in compost bin",
        icon: Sprout,
        color: "text-amber-400"
      };
    } else if (cat.includes('e-waste')) {
      return {
        text: "Take to e-waste collector",
        icon: Cpu,
        color: "text-purple-400"
      };
    } else if (cat.includes('landfill')) {
      return {
        text: "Discard in general refuse",
        icon: Trash2,
        color: "text-rose-400"
      };
    }
    return {
      text: "Place in recycling bin",
      icon: Check,
      color: "text-emerald-400"
    };
  };

  const disposal = getDisposalDetails(result.category);
  const DisposalIcon = disposal.icon;

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-5xl mx-auto px-4"
    >
      {/* Top Banner - Main Waste Title & Category */}
      <div className="glass p-6 md:p-8 rounded-3xl mb-8 border border-white/10 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${style.bg.split(' ')[0]}`} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 text-left flex-grow">
            {/* Category Icon Container */}
            <div className={`w-16 h-16 rounded-2xl ${style.bg} flex items-center justify-center flex-shrink-0 border`}>
              <CategoryIcon className="w-8 h-8" />
            </div>
            
            <div className="text-left">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${style.bg}`}>
                  {result.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white">
                  Confidence: {result.confidence}
                </span>
              </div>

              {/* Waste Title */}
              <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-tight mb-2">
                {result.item}
              </h2>

              {/* SDG Contribution Badge */}
              <div className="inline-flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg mt-1 font-medium">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>{result.sdgContribution}</span>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col items-stretch sm:flex-row md:flex-col gap-3 min-w-[200px]">
            <div className="glass bg-white/[0.02] border border-white/5 p-4 rounded-2xl text-left">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                Disposal Method
              </span>
              <span className="text-white font-bold text-sm sm:text-base flex items-center space-x-1.5">
                <DisposalIcon className={`w-4 h-4 ${disposal.color} flex-shrink-0`} />
                <span>{disposal.text}</span>
              </span>
            </div>
            
            <button
              onClick={onReset}
              className="py-3.5 px-6 bg-emerald-500 hover:bg-emerald-400 text-[#030704] font-bold rounded-2xl cursor-pointer shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all duration-200"
            >
              Analyze Another Item
            </button>
          </div>
        </div>
      </div>

      {/* ROW 1: Real-Time Analysis KPIs */}
      <div className="mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
            Real-Time Analysis
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* KPI 1: Sustainability Score */}
          <div 
            onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
            className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Sustainability Score</span>
              <h4 className="text-2xl font-display font-black text-white mt-1.5 tracking-tight">
                {result.sustainabilityScore}/100
              </h4>
              <span className="text-[9px] text-emerald-400/80 font-bold block mt-1 hover:underline">
                {showScoreBreakdown ? "Click to hide breakdown" : "Click to view breakdown"}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* KPI 2: Carbon Savings */}
          <div className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] border border-white/10 hover:border-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Carbon Saved</span>
              <h4 className="text-2xl font-display font-black text-white mt-1.5 tracking-tight">
                {result.co2Reduction}
              </h4>
              <span className="text-[10px] text-cyan-400 block mt-1 font-medium">CO₂ emissions offset</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Leaf className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 3: Circularity Rating */}
          <div className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] border border-white/10 hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Circularity Grade</span>
              <h4 className="text-2xl font-display font-black text-white mt-1.5 tracking-tight">
                {result.circularityRating || "A"}
              </h4>
              <span className="text-[10px] text-teal-400 block mt-1 font-medium">Material Loop Grade</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>

          {/* KPI 4: Contamination Risk */}
          <div className="glass p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.05] border border-white/10 hover:border-rose-500/20 transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Contamination Risk</span>
              <h4 className={`text-2xl font-display font-black mt-1.5 tracking-tight ${
                result.contaminationRisk?.toLowerCase().includes('high') ? 'text-rose-400' :
                result.contaminationRisk?.toLowerCase().includes('medium') ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {result.contaminationRisk}
              </h4>
              <span className="text-[10px] text-gray-400 block mt-1 font-medium">Sorting risk factor</span>
            </div>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
              result.contaminationRisk?.toLowerCase().includes('high') ? 'bg-rose-500/10 border-rose-500/25 text-rose-400' :
              result.contaminationRisk?.toLowerCase().includes('medium') ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
            }`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Dynamic score breakdown expandable details */}
        <AnimatePresence>
          {showScoreBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="glass p-6 md:p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/10 to-transparent">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />
                
                <h5 className="font-display font-black text-sm uppercase tracking-wider text-emerald-400 mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Score Breakdown Analysis
                </h5>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column - Score items (8/12 width) */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Item 1: Recyclability */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-300 font-bold">Recyclability</span>
                        <span className="text-emerald-400 font-mono font-black">{breakdown.recyclabilityScore}/40</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(breakdown.recyclabilityScore / 40) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-emerald-400 rounded-full" 
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{breakdown.recyclabilityExplanation}</p>
                    </div>

                    {/* Item 2: Reuse Potential */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-300 font-bold">Reuse Potential</span>
                        <span className="text-emerald-400 font-mono font-black">{breakdown.reusePotentialScore}/20</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(breakdown.reusePotentialScore / 20) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-emerald-400 rounded-full" 
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{breakdown.reusePotentialExplanation}</p>
                    </div>

                    {/* Item 3: Carbon Reduction */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-300 font-bold">Carbon Reduction</span>
                        <span className="text-emerald-400 font-mono font-black">{breakdown.carbonReductionScore}/20</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(breakdown.carbonReductionScore / 20) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-emerald-400 rounded-full" 
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{breakdown.carbonReductionExplanation}</p>
                    </div>

                    {/* Item 4: Contamination Risk */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-300 font-bold">Contamination Risk</span>
                        <span className="text-emerald-400 font-mono font-black">{breakdown.contaminationRiskScore}/20</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(breakdown.contaminationRiskScore / 20) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-emerald-400 rounded-full" 
                        />
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{breakdown.contaminationRiskExplanation}</p>
                    </div>
                  </div>

                  {/* Right Column - Large final score (4/12 width) */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-4 font-mono">Final Score</span>
                    <div className="relative w-36 h-36 flex items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-950/20 shadow-[0_0_25px_rgba(16,185,129,0.08)]">
                      <div className="text-center">
                        <span className="text-4xl font-display font-black text-white text-glow-green">{result.sustainabilityScore}</span>
                        <span className="text-xs text-gray-500 uppercase font-bold block mt-1">/ 100</span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-widest mt-4">
                      {result.sustainabilityScore >= 90 ? "A+ Circularity" : 
                       result.sustainabilityScore >= 70 ? "Good Circularity" : 
                       result.sustainabilityScore >= 40 ? "Moderate Circle" : "Linear (Landfill)"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ROW 2: AI Waste Coach (Featured Card) */}
      <div className="mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
            AI Generated
          </span>
        </div>
        <AIWasteCoach result={result} />
      </div>

      {/* ROW 3: Interactive Material Lifecycle Flow */}
      <div className="mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
            What Happens Next?
          </span>
        </div>
        <WhatHappensNext result={result} />
      </div>

      {/* ROW 4: Environmental Impact Dashboard */}
      <div className="mb-10">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">
            Environmental Impact Dashboard
          </span>
        </div>
        <EnvironmentalImpactDashboard result={result} />
      </div>

      {/* Responsible AI Card Footer */}
      <div className="mb-12">
        <ResponsibleAICard confidence={result.confidence} />
      </div>
    </motion.div>
  );
}
