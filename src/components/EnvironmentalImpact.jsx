
import { Leaf,  Zap, Flame } from 'lucide-react';


export default function EnvironmentalImpact({ co2Reduction = "0.00 kg CO₂", impactText = "" }) {
  // Convert co2Reduction text (e.g., "0.08 kg CO₂") to a number for equivalents math
  const getCo2Num = (str) => {
    const matched = str.match(/([0-9.]+)/);
    return matched ? parseFloat(matched[1]) : 0;
  };

  const co2Value = getCo2Num(co2Reduction);
  
  // Calculate relative equivalents
  const smartphoneCharges = Math.round(co2Value * 120);
  const lightbulbHours = Math.round(co2Value * 40);

  return (
    <div className="glass p-6 rounded-2xl text-left relative overflow-hidden h-full flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />

      <div>
        <h3 className="text-gray-400 text-xs font-semibold tracking-wider uppercase mb-4 flex items-center space-x-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Environmental Impact</span>
        </h3>

        {/* CO2 Saving Large Stat */}
        <div className="mb-4">
          <span className="text-3xl font-display font-black text-white text-glow-green">
            {co2Reduction}
          </span>
          <span className="text-emerald-400 font-semibold text-xs block mt-1">
            Estimated Carbon Emissions Prevented
          </span>
        </div>

        {/* Detailed Impact Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans border-t border-white/5 pt-4">
          {impactText || "Correct waste segregation prevents materials from decomposition in landfills, reducing direct emissions of methane and leachate."}
        </p>
      </div>

      {/* Sustainability Equivalents Grid */}
      {co2Value > 0 && (
        <div className="bg-white/2 border border-white/5 rounded-xl p-4">
          <h4 className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-3">
            Recycling Equivalents
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold text-sm block">{smartphoneCharges}</span>
                <span className="text-[10px] text-gray-400">Smartphone Charges</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold text-sm block">{lightbulbHours} hrs</span>
                <span className="text-[10px] text-gray-400">LED Bulb Lifespan</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
