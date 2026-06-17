import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

export default function SustainabilityScore({ score = 70 }) {
  // Determine rating based on score
  const getRating = (val) => {
    if (val >= 90) return { label: "Excellent Circularity", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    if (val >= 70) return { label: "Good Circularity", color: "text-teal-400 border-teal-500/30 bg-teal-500/10" };
    if (val >= 40) return { label: "Moderate Circularity", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    return { label: "Linear (Landfill)", color: "text-red-400 border-red-500/30 bg-red-500/10" };
  };

  const rating = getRating(score);

  // SVG parameters for progress ring
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden h-full">
      <div className="absolute top-2 right-2 flex items-center justify-center text-xs text-gray-500 font-semibold p-1">
        <Award className="w-3.5 h-3.5 mr-1" />
        <span>Circularity Index</span>
      </div>

      <h3 className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-4 mt-2">
        Sustainability Score
      </h3>

      {/* SVG Circular Progress */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-white/5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center">
          <span className="font-display font-black text-3xl text-white leading-none">{score}</span>
          <span className="text-[10px] text-gray-500 uppercase font-bold mt-1">/ 100</span>
        </div>
      </div>

      {/* Rating badge */}
      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${rating.color} mb-3`}>
        {rating.label}
      </div>

      <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
        {score >= 70 
          ? "Highly recyclable item. Correct disposal keeps these resources in the economic loop." 
          : "Limited recycling paths. Focus on reduction, reuse, or specialized hazardous disposal."}
      </p>
    </div>
  );
}
