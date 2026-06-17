import React from 'react';
import { Check, Leaf, Info } from 'lucide-react';

export default function DisposalRecommendationCard({ recommendations = [], environmentalImpact = "" }) {
  // Safe default recommendations if empty
  const items = recommendations.length > 0 ? recommendations : [
    "Verify the local recycling guidelines for this material.",
    "Clean and remove any liquid residues or food contaminants.",
    "Place the sorted component in the designated collection container."
  ];

  return (
    <div className="glass p-6 rounded-2xl text-left relative overflow-hidden h-full flex flex-col justify-between border-l-2 border-l-emerald-500/50">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-5 flex items-center space-x-1.5">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>AI Disposal Recommendation</span>
        </h3>

        {/* 3 checkmark recommendations */}
        <ul className="space-y-4 mb-6">
          {items.slice(0, 3).map((rec, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-sm text-gray-200">
              <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="leading-relaxed font-sans">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Environmental Impact statement */}
      <div className="relative z-10 border-t border-white/5 pt-5">
        <h4 className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-emerald-500/80" />
          <span>Environmental Benefit</span>
        </h4>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
          {environmentalImpact || "Proper recycling prevents landfill contamination, reduces raw resource mining demand, and preserves local ecosystems."}
        </p>
      </div>
    </div>
  );
}
