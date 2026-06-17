import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Cpu, Leaf, Sparkles, 
  Upload, Search, FileText, CheckCircle,
  HelpCircle
} from 'lucide-react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import FeatureCard from '../components/FeatureCard';
import SDGSection from '../components/SDGSection';
import { staggerContainer } from '../animations/motionVariants';

export default function Home({ setCurrentPage }) {
  // Features lists
  const features = [
    {
      icon: Camera,
      title: "AI Waste Detection",
      description: "Instantly recognize household packaging, cans, batteries, and paper products using computer vision."
    },
    {
      icon: Cpu,
      title: "Smart Classification",
      description: "Automated categorization into distinct municipal sorting categories (Plastic, Paper, Metal, Glass, Organic, E-waste)."
    },
    {
      icon: Leaf,
      title: "Disposal Guidance",
      description: "Direct, actionable sorting instructions, listing prep procedures like washing, flattening, or safety taping."
    },
    {
      icon: Sparkles,
      title: "Impact Insights",
      description: "View immediate calculations on carbon footprints saved and numeric circularity values for each item."
    }
  ];

  // How it works steps
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Image",
      desc: "Drag-and-drop or photograph any disposal candidate using your smartphone or desktop computer."
    },
    {
      step: "02",
      icon: Search,
      title: "AI Analysis",
      desc: "EcoSort AI identifies material composition, transparency, and labeling metrics."
    },
    {
      step: "03",
      icon: FileText,
      title: "Waste Classification",
      desc: "Item category matches to regional guidelines, computing its Circularity Index score."
    },
    {
      step: "04",
      icon: CheckCircle,
      title: "Disposal & Impact",
      desc: "Retrieve precise instructions and view immediate carbon offset savings."
    }
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <Hero setCurrentPage={setCurrentPage} />

      {/* Statistics Section */}
      <StatsSection />

      {/* Features Grid Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#030704]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Powerful <span className="text-emerald-400 text-glow-green">AI Capabilities</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg font-sans">
              EcoSort AI combines machine learning algorithms with ecological datasets to optimize your sorting routine.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="glow-spot w-80 h-80 bg-cyan-500/5 left-1/3 bottom-10 animate-pulse-slow" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              How <span className="text-emerald-400 text-glow-green">It Works</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Sort materials in seconds. Follow these four automated phases to optimize circular recycling.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {/* Timeline connector line */}
            <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-emerald-500/5 via-emerald-500/20 to-emerald-500/5 z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                {/* Step Circle with Icon */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#030704] border border-white/10 group-hover:border-emerald-500/40 text-gray-400 group-hover:text-emerald-400 transition-all duration-300 shadow-lg">
                  <step.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Step Number Badge */}
                  <span className="absolute -top-3 -right-3 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-white text-lg mt-6 mb-2 tracking-wide group-hover:text-emerald-300 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] font-sans">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SDG 12 Badge Section */}
      <SDGSection />
    </div>
  );
}
