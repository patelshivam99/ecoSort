import React, { useState, useEffect } from 'react';
import { Leaf, Award, Sparkles, AlertTriangle } from 'lucide-react';
import { getApiKey } from '../services/aiService';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [hasApiKey, setHasApiKey] = useState(false);

  // Poll for API key updates in local storage or env
  useEffect(() => {
    const checkKey = () => {
      const key = getApiKey();
      setHasApiKey(!!key);
    };

    checkKey();
    
    // Set up a check interval
    const interval = setInterval(checkKey, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze Waste' },
    { id: 'responsible-ai', label: 'Responsible AI' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 group-hover:border-emerald-500/80 transition-all duration-300">
              <Leaf className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                EcoSort<span className="text-emerald-400 text-glow-green">AI</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentPage === item.id || (item.id === 'analyze' && currentPage === 'results')
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mode Indicator Badge */}
            <div className="pl-3 border-l border-white/10 ml-1 flex items-center space-x-2">
              {hasApiKey ? (
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/35 text-[10px] font-bold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Live API Mode</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/25 text-[10px] font-bold text-rose-400 animate-pulse">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>API Key Required</span>
                </div>
              )}

              {/* SDG Indicator */}
              <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/20 text-[10px] font-bold text-amber-400">
                <Award className="w-3 h-3" />
                <span>SDG 12</span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Trigger & Mini Badge */}
          <div className="flex md:hidden items-center space-x-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${
                  currentPage === item.id || (item.id === 'analyze' && currentPage === 'results')
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.id === 'responsible-ai' ? 'Ethics' : item.label}
              </button>
            ))}
          </div>
          
        </div>
      </div>
    </nav>
  );
}
