import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  ShieldQuestion, 
  AlertTriangle, 
  Leaf, 
  Lightbulb, 
  ChevronRight, 
  Recycle,
  GitCommit
} from 'lucide-react';

export default function AIWasteCoach({ result }) {
  const {
    recommendations = [],
    contaminationRisk = "Low",
    contaminationExplanation = "",
    circularEconomyJourney = [],
    commonMistake = "",
    sustainabilityImpact = "",
    environmentalImpact = "",
    ecoTip = "",
    estimatedCompletionTime = "2 mins"
  } = result;

  // Safe default recommendations if empty
  const checklistItems = recommendations.length > 0 ? recommendations : [
    "Verify the local recycling guidelines for this material.",
    "Clean and remove any liquid residues or food contaminants.",
    "Place the sorted component in the designated collection container."
  ];

  // Safe default journey if empty
  const journeySteps = circularEconomyJourney.length > 0 ? circularEconomyJourney : [
    "Discarded Item",
    "Collection",
    "Sorting facility",
    "Material processing",
    "Secondary manufacturing"
  ];

  // Helper for Contamination Risk Badge styles
  const getRiskStyles = (risk) => {
    const r = (risk || "Low").toLowerCase();
    if (r.includes('high')) {
      return {
        bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
        label: 'High Contamination Risk',
        icon: ShieldAlert
      };
    }
    if (r.includes('medium')) {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        label: 'Medium Contamination Risk',
        icon: ShieldQuestion
      };
    }
    return {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      label: 'Low Contamination Risk',
      icon: ShieldCheck
    };
  };

  const risk = getRiskStyles(contaminationRisk);
  const RiskIcon = risk.icon;

  return (
    <div className="glass p-6 md:p-8 rounded-3xl text-left relative overflow-hidden border border-white/10 w-full transition-all duration-300 hover:border-emerald-500/20">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-500/3 blur-3xl pointer-events-none" />

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Featured Card
              </span>
              <span className="text-[10px] text-gray-500 font-mono">AI Coach v2.1</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mt-1">
              AI Waste Coach
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs text-gray-400 bg-white/3 border border-white/5 px-3 py-2 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
            <span>Duration: <strong className="text-white">{estimatedCompletionTime}</strong></span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Asymmetric columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (7/12 width) - Main Flow and Steps */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8">
          
          {/* Section 1: Recommended Actions */}
          <div className="space-y-4">
            <h4 className="text-sm text-white font-bold tracking-wide uppercase flex items-center gap-2">
              <span className="w-1.5 h-3 bg-emerald-500 rounded-full" />
              Recommended Disposal Steps
            </h4>
            
            <ul className="space-y-4">
              {checklistItems.slice(0, 3).map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-3.5 bg-white/[0.01] border border-white/[0.03] hover:border-white/5 p-4 rounded-2xl transition-all duration-200">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 font-mono text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-gray-200 text-sm leading-relaxed font-sans">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Circular Economy Journey */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm text-white font-bold tracking-wide uppercase flex items-center gap-2">
              <Recycle className="w-4 h-4 text-cyan-400" />
              Circular Economy Journey
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Material lifecycles are loop systems. Correct sorting directs this item through the following recovery phases:
            </p>

            {/* Journey Timeline Flow */}
            <div className="relative mt-6 pl-4 sm:pl-0">
              {/* Desktop view (Horizontal Timeline) */}
              <div className="hidden sm:flex items-center justify-between relative">
                {/* Horizontal line running behind nodes */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 transform -translate-y-1/2 z-0" />
                
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10 flex-1 px-1">
                    <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] mb-3">
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider max-w-[90px] block">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile view (Vertical Timeline) */}
              <div className="sm:hidden relative pl-6 space-y-6">
                <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-white/5 z-0" />
                
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.15)] font-mono text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs text-gray-200 font-bold uppercase tracking-wide">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5/12 width) - Diagnostics and Warnings */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:border-l lg:border-white/5 lg:pl-8">
          
          {/* Section 2: Contamination Analysis */}
          <div className="space-y-3">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              Contamination Analysis
            </span>
            <div className={`px-4 py-3 rounded-2xl border flex flex-col gap-2 ${risk.bg}`}>
              <div className="flex items-center space-x-2 font-bold text-xs">
                <RiskIcon className="w-4.5 h-4.5 shrink-0" />
                <span>{risk.label}</span>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {contaminationExplanation || "Materials mixed with organic waste or oils degrade recycling batch outputs."}
              </p>
            </div>
          </div>

          {/* Section 4: Common Mistakes (Warning Box) */}
          {commonMistake && (
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                Sorting Warning
              </span>
              <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-2xl flex items-start space-x-3 shadow-[0_0_15px_rgba(244,63,94,0.05)]">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wide">Common Sorting Mistake</h5>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed mt-1">
                    {commonMistake}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Environmental Benefit */}
          <div className="space-y-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              Ecological Benefit
            </span>
            <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-start space-x-3">
              <Leaf className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wide">Environmental Benefit</h5>
                <p className="text-xs text-gray-300 font-sans leading-relaxed mt-1">
                  {sustainabilityImpact || environmentalImpact || "Sorting this item correctly prevents material degradation and supports SDG 12 targets."}
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Sustainability Tip */}
          {ecoTip && (
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                Eco-Advisory Tip
              </span>
              <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-2xl flex items-start space-x-3 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide font-display">Advisor Tip</h5>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed mt-1">
                    {ecoTip}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
