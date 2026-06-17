import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadBox from '../components/UploadBox';
import LoadingAnimation from '../components/LoadingAnimation';
import { classifyWasteImage } from '../services/aiService';
import { slideUp } from '../animations/motionVariants';
import { ShieldCheck, HelpCircle, AlertTriangle } from 'lucide-react';

export default function Analyze({ onAnalysisComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await classifyWasteImage(selectedFile);
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error scanning image. Please check your network and API configurations.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="py-12 md:py-20 relative z-10 max-w-4xl mx-auto px-4"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          AI Waste <span className="text-emerald-400 text-glow-green">Classification</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Upload an image of your packaging, electronics, or food scrap. Our neural network will classify it and provide custom CO₂ insights.
        </p>
      </div>

      {/* Dynamic Error Alert Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-2xl text-xs sm:text-sm leading-relaxed flex items-start space-x-3.5 max-w-2xl mx-auto text-left relative overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.08)]"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="grow">
            <h5 className="font-bold text-rose-200 uppercase tracking-wider text-[10px] font-mono">Scanning Analysis Error</h5>
            <p className="mt-1 font-sans text-xs leading-relaxed">{error}</p>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="text-rose-400 hover:text-white font-bold text-xs cursor-pointer focus:outline-none shrink-0 transition-colors"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Main Switcher */}
      <div className="flex justify-center items-center w-full min-h-[300px]">
        {isAnalyzing ? (
          <LoadingAnimation />
        ) : (
          <UploadBox 
            onFileSelected={handleFileSelected} 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
        )}
      </div>

      {/* Additional helpful info below upload box */}
      {!isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto border-t border-white/5 pt-8 text-left"
        >
          <div className="flex space-x-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">100% Private Scanning</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                Images are analyzed locally in your browser memory. We never save or store your photos on remote servers.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-sm font-semibold">Contamination Warnings</h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                The model flags typical recycling contamination risks, such as liquid residues, caps, or mixed plastic blends.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
