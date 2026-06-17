import React from 'react';
import { ShieldAlert, ExternalLink, HelpCircle } from 'lucide-react';

export default function ResponsibleAICard({ confidence = "90%" }) {
  return (
    <div className="glass p-6 rounded-3xl text-left border border-white/5 bg-gradient-to-br from-white/[0.01] to-white/[0.03] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow-cyan opacity-20 pointer-events-none" />

      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm tracking-wide">Responsible AI Safeguard</h4>
          <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Verification Model Active</p>
        </div>
      </div>

      <p className="text-gray-300 text-xs leading-relaxed mb-4">
        This result is generated using a computer vision prototype with a confidence score of <strong>{confidence}</strong>. Model predictions can vary based on lighting, camera angles, or contaminated packaging.
      </p>

      <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="text-[10px] text-gray-500 flex items-center">
          <HelpCircle className="w-3.5 h-3.5 mr-1" />
          Always cross-reference with municipal rules.
        </span>
        <a 
          href="https://www.un.org/sustainabledevelopment/sustainable-consumption-production/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center space-x-1 transition-colors duration-200"
        >
          <span>Read SDG Guidelines</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
