import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Zap, Trash2, ShieldCheck, Scale } from 'lucide-react';

export default function EnvironmentalImpactDashboard({ result }) {
  const {
    co2Reduction = "0.08 kg",
    waterSaved = "12.5 L",
    energySaved = "0.45 kWh",
    landfillPrevented = "150g"
  } = result || {};

  // Helper to parse values for display progress
  const getNumericValue = (str) => {
    if (!str) return 50; // default middle progress if missing
    const matched = str.match(/([0-9.]+)/);
    return matched ? parseFloat(matched[1]) : 50;
  };

  // Equivalents calculation
  const co2Num = getNumericValue(co2Reduction);
  const waterNum = getNumericValue(waterSaved);
  const energyNum = getNumericValue(energySaved);
  const landfillNum = getNumericValue(landfillPrevented);

  const stats = [
    {
      title: "Carbon Offset",
      value: co2Reduction,
      subtext: "CO₂ emissions prevented",
      icon: Leaf,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10",
      barColor: "bg-gradient-to-r from-emerald-500 to-teal-400",
      progress: Math.min(100, Math.max(10, co2Num * 400)), // Scale for visualization
      equivalent: `${Math.round(co2Num * 120)} Smartphone Charges`
    },
    {
      title: "Water Conserved",
      value: waterSaved,
      subtext: "Direct water conservation",
      icon: Droplet,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 shadow-cyan-500/10",
      barColor: "bg-gradient-to-r from-cyan-500 to-blue-400",
      progress: Math.min(100, Math.max(10, waterNum * 6)), // Scale for visualization
      equivalent: `${Math.round(waterNum * 2)} Drinking Cups`
    },
    {
      title: "Energy Conserved",
      value: energySaved,
      subtext: "Secondary manufacturing offset",
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400 shadow-amber-500/10",
      barColor: "bg-gradient-to-r from-amber-500 to-orange-400",
      progress: Math.min(100, Math.max(10, energyNum * 180)), // Scale for visualization
      equivalent: `${Math.round(energyNum * 15)} Hours LED Light`
    },
    {
      title: "Landfill Diversion",
      value: landfillPrevented,
      subtext: "Trash prevented from landfill",
      icon: Trash2,
      color: "from-rose-500/20 to-purple-500/20 border-rose-500/30 text-rose-400 shadow-rose-500/10",
      barColor: "bg-gradient-to-r from-rose-500 to-purple-400",
      progress: Math.min(100, Math.max(10, landfillNum / 4)), // Scale for visualization
      equivalent: `${Math.round(landfillNum / 5)} Plastic Bags Weight`
    }
  ];

  return (
    <div className="glass p-6 md:p-8 rounded-3xl text-left relative overflow-hidden border border-white/10 w-full transition-all duration-300 hover:border-emerald-500/10">
      
      {/* Header Block */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-mono block uppercase tracking-wider">
              Ecological Metrics
            </span>
            <h4 className="font-display font-black text-lg text-white mt-0.5">
              Environmental Impact Dashboard
            </h4>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>SDG 12 Calibrated</span>
        </div>
      </div>

      {/* Grid of metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group"
            >
              {/* Highlight gradient backings on hover */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.02] rounded-full blur-xl pointer-events-none group-hover:bg-white/[0.05] transition-all" />

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} border flex items-center justify-center text-glow`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Main value */}
                <div className="mb-2">
                  <h5 className="text-2xl font-display font-black text-white tracking-tight">
                    {stat.value}
                  </h5>
                  <span className="text-[10px] text-gray-500 mt-0.5 block font-sans">
                    {stat.subtext}
                  </span>
                </div>
              </div>

              {/* Progress bar visualizer */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1.5 font-mono">
                  <span>Relative Yield</span>
                  <span>{Math.round(stat.progress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${stat.barColor}`}
                  />
                </div>

                {/* Sustainability equivalents */}
                <div className="mt-3.5 bg-white/[0.02] border border-white/5 rounded-xl px-2.5 py-2 text-[10px] text-gray-400 flex items-center justify-between font-mono">
                  <span className="text-[9px] uppercase font-bold text-emerald-500/80">Equivalent:</span>
                  <span className="text-white font-medium">{stat.equivalent}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
