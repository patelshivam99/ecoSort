import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Eye, Cpu, Database, 
  ExternalLink, Compass, Scale, Lock 
} from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '../animations/motionVariants';

export default function ResponsibleAI() {
  const principles = [
    {
      icon: Scale,
      title: "Model Limitations",
      desc: "Waste items often exhibit high variability. Factors like crush state, product labeling, transparency, food residues, or bad camera angles can trigger misclassification. Users should always perform visual double-checks."
    },
    {
      icon: Lock,
      title: "Data Privacy & Security",
      desc: "EcoSort AI prioritizes browser-native safety. We process image streams locally in local runtime memory. Your pictures are never cached, saved, or uploaded to external clouds, fully respecting user privacy rights."
    },
    {
      icon: Compass,
      title: "Human-In-The-Loop Validation",
      desc: "Machine learning classifications serve as supportive guides rather than legal declarations. Users must follow their specific municipal collection rules. When in doubt, search municipal waste database lookups."
    }
  ];

  const futureModels = [
    { name: "IBM Granite Vision", purpose: "Enterprise waste management & logistics supply analytics." },
    { name: "Gemini Flash / Pro Vision", purpose: "High-speed consumer sorting & packaging barcode reads." },
    { name: "OpenAI GPT-4o Vision", purpose: "Complex material decomposition analysis & multi-lingual instructions." },
    { name: "Hugging Face Models", purpose: "Open-source fine-tuned models for localized regional waste types." }
  ];

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="py-12 md:py-20 relative z-10 max-w-5xl mx-auto px-4 text-left"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4 tracking-wide uppercase">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Responsible AI Guidelines</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
          Ethical AI & <span className="text-emerald-400 text-glow-green">Safety Boundaries</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-center text-sm sm:text-base">
          Ensuring transparency, privacy, and local safety standards while leveraging neural networks for Sustainable Development Goal 12.
        </p>
      </div>

      {/* Principles Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {principles.map((pr, idx) => (
          <motion.div
            key={idx}
            variants={staggerItem}
            className="glass p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center mb-5">
                <pr.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base tracking-wide mb-2">
                {pr.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-sans">
                {pr.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Future API Integrations Area */}
      <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-radial-glow-cyan opacity-20 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none mb-4">
              Future-Ready <br />
              Vision APIs
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed font-sans mb-6">
              Our AI service layer is designed for modularity. Developers can seamlessly swap our offline classifier for external state-of-the-art vision models depending on deployment scale.
            </p>
            <a 
              href="https://huggingface.co/models?pipeline_tag=image-classification" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center space-x-1"
            >
              <span>Explore Vision Classification Models</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {futureModels.map((model, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#030704]/40 border border-white/5 hover:border-cyan-500/10 rounded-xl p-5 text-left transition-colors duration-200"
                >
                  <h4 className="text-white font-bold text-sm mb-1.5 flex items-center space-x-2">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{model.name}</span>
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{model.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
