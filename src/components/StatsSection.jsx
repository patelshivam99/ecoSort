import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Trash2, Zap, ArrowUpRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '../animations/motionVariants';

export default function StatsSection() {
  const stats = [
    {
      icon: Trash2,
      value: "2.01B Tons",
      label: "Annual Solid Waste",
      desc: "Global municipal solid waste generated each year, with at least 33% not managed in an environmentally safe manner.",
      color: "from-amber-400 to-red-500",
      glowColor: "rgba(245, 158, 11, 0.15)"
    },
    {
      icon: Globe,
      value: "91%",
      label: "Unrecycled Plastics",
      desc: "Of all plastic produced globally, only about 9% gets recycled. The rest ends up in landfills, incinerators, or oceans.",
      color: "from-red-400 to-pink-500",
      glowColor: "rgba(239, 68, 68, 0.15)"
    },
    {
      icon: Zap,
      value: "95% Energy",
      label: "Saved via Recycling",
      desc: "Recycling aluminum cans saves 95% of the energy needed to refine bauxite ore. Paper recycling saves 60% energy.",
      color: "from-emerald-400 to-teal-500",
      glowColor: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            The Global <span className="text-emerald-400 text-glow-green">Waste Crisis</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Our consumption habits are outpacing our planet's regenerative capabilities. Actionable sorting helps drive immediate change.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between"
              style={{ boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 20px ${stat.glowColor}` }}
            >
              <div>
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Stat Display */}
                <h3 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight bg-gradient-to-r bg-clip-text text-transparent bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-500">
                  {stat.value}
                </h3>
                
                {/* Label */}
                <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mt-2">
                  {stat.label}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mt-6 leading-relaxed border-t border-white/5 pt-4">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
