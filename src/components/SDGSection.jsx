
import { motion } from 'framer-motion';
import { Award, ShieldAlert, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { staggerContainer, staggerItem } from '../animations/motionVariants';

export default function SDGSection() {
  const targets = [
    {
      icon: ShieldAlert,
      num: "12.4",
      title: "Chemicals & Waste Management",
      desc: "Achieve environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks."
    },
    {
      icon: RefreshCw,
      num: "12.5",
      title: "Substantially Reduce Waste",
      desc: "Substantially reduce waste generation through prevention, reduction, recycling, and reuse by sorting items accurately and recovering precious resources."
    },
    {
      icon: Eye,
      num: "12.8",
      title: "Information & Lifestyles",
      desc: "Ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="glow-spot w-100 h-100 bg-emerald-500/5 right-10 top-10 animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass p-8 md:p-16 rounded-[40px] border border-white/10 relative overflow-hidden">
          {/* Ambient card background glow */}
          <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - SDG 12 Badge & Concept */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6 tracking-wide uppercase">
                <Award className="w-4 h-4" />
                <span>UN Sustainable Development Goals</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
                Goal 12: <br/>
                <span className="text-amber-400 text-glow-cyan">Responsible</span> <br/>
                Consumption
              </h2>
              <p className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                EcoSort AI is engineered to advance UN SDG 12 targets. By placing machine learning classification at the fingertips of households, schools, and offices, we bridge the gap between waste generation and intelligent resource recovery.
              </p>
              <div className="mt-8 flex items-center space-x-3 text-sm text-gray-400 font-medium">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Enabling circular economies through AI.</span>
              </div>
            </div>

            {/* Right Column - Target Details Grid */}
            <div className="lg:col-span-7">
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 gap-6"
              >
                {targets.map((target, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="glass bg-white/2 hover:bg-white/5 border border-white/5 p-6 rounded-2xl flex items-start space-x-4 text-left transition-all duration-300 hover:border-emerald-500/20"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-display font-extrabold text-base">
                      {target.num}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base tracking-wide mb-1">
                        {target.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {target.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
