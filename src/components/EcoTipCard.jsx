import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

export default function EcoTipCard({ ecoTip = "", sustainabilityTip = "" }) {
  const activeTip = sustainabilityTip || ecoTip;

  return (
    <div className="glass p-6 rounded-2xl text-left relative overflow-hidden h-full flex flex-col justify-between border-l-2 border-l-amber-500/50">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 blur-xl pointer-events-none" />

      <div>
        <h3 className="text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4 flex items-center space-x-1.5">
          <Lightbulb className="w-4 h-4" />
          <span>AI Generated Eco-Tips</span>
        </h3>

        <p className="text-gray-200 text-sm leading-relaxed mb-6 font-sans">
          {activeTip || "Consider whether the item can be reused or upcycled before depositing it in the bin. Reducing consumption is the primary tier of waste management."}
        </p>
      </div>

      <div className="flex items-start space-x-2 bg-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-xs text-amber-300">
        <Info className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Did you know?</strong> Composing waste at source saves municipal transport carbon footprints. Try to make sorting a daily household habit.
        </p>
      </div>
    </div>
  );
}
