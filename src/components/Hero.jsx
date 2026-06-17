import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trash2, Award, Zap, Compass } from 'lucide-react';
import { fadeIn, slideUp, hoverScale, float } from '../animations/motionVariants';

export default function Hero({ setCurrentPage }) {
  const statsPreview = [
    { icon: Trash2, label: "2.01B Tons", text: "Global waste yearly" },
    { icon: Zap, label: "95% Saved", text: "Metal recycling energy" },
    { icon: Compass, label: "SDG Target 12.5", text: "Prevention & reduction" }
  ];

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center py-12 md:py-20 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="glow-spot w-96 h-96 bg-emerald-500/10 top-10 left-10 animate-pulse-slow" />
      <div className="glow-spot w-[450px] h-[450px] bg-cyan-500/5 bottom-10 right-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Left Column: Headings and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* SDG 12 Badge */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/35 mb-8 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <Award className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Supporting SDG 12: Responsible Consumption and Production</span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6"
            >
              EcoSort <span className="text-emerald-400 text-glow-green">AI</span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-gray-300 font-medium text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 font-display"
            >
              AI-Powered Waste Classification & Sustainability Impact Assistant
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
            >
              <motion.button
                onClick={() => setCurrentPage('analyze')}
                variants={hoverScale}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#030704] font-bold rounded-2xl flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <span>Start Waste Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => setCurrentPage('responsible-ai')}
                variants={hoverScale}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300"
              >
                <span>Learn About Our AI</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Generated Premium Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

            {/* Floating Image Container */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-[360px] aspect-square rounded-[40px] glass p-5 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.12)] overflow-hidden animate-float"
            >
              <img 
                src="/hero_sustainability_ai.png" 
                alt="AI Sustainability Illustration" 
                className="w-full h-full object-contain rounded-[28px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030704]/40 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Statistics Preview Cards (Below Hero Layout) */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-16 border-t border-white/10 pt-8"
        >
          {statsPreview.map((stat, idx) => (
            <div 
              key={idx}
              className="glass p-4 rounded-xl flex items-center space-x-3 text-left hover:border-emerald-500/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">{stat.label}</p>
                <p className="text-gray-400 text-xs">{stat.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
