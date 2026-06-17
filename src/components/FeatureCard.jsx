import React from 'react';
import { motion } from 'framer-motion';
import { hoverScale, staggerItem } from '../animations/motionVariants';

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass glass-hover p-6 rounded-2xl flex flex-col items-start text-left relative overflow-hidden group"
    >
      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-colors duration-300" />
      
      {/* Icon Wrapper */}
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300">
        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Title */}
      <h3 className="font-display font-bold text-lg text-white mb-2 tracking-wide group-hover:text-emerald-300 transition-colors duration-200">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed font-sans">
        {description}
      </p>
    </motion.div>
  );
}
