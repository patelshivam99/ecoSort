import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import ResponsibleAI from './pages/ResponsibleAI';

// Animations
import { fadeIn } from './animations/motionVariants';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setCurrentPage('results');
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setCurrentPage('analyze');
  };

  // Render correct page view
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Home setCurrentPage={setCurrentPage} />
          </motion.div>
        );
      case 'analyze':
        return (
          <motion.div
            key="analyze"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Analyze onAnalysisComplete={handleAnalysisComplete} />
          </motion.div>
        );
      case 'results':
        return (
          <motion.div
            key="results"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Results result={analysisResult} onReset={handleResetAnalysis} />
          </motion.div>
        );
      case 'responsible-ai':
        return (
          <motion.div
            key="responsible-ai"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ResponsibleAI />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="fallback-home"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Home setCurrentPage={setCurrentPage} />
          </motion.div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-accent-dark text-gray-200 selection:bg-emerald-500/35 selection:text-white darkScroll relative">
      {/* Dynamic Background Glowing Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_15%,rgba(16,185,129,0.04),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.03),transparent_40%)] pointer-events-none" />
      
      {/* Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      {/* Main Page Area */}
      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
