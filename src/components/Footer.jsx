
import { Leaf, Award } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="w-full glass border-t border-white/5 bg-accent-dark/40 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center space-x-2 cursor-pointer mb-4" onClick={() => setCurrentPage('home')}>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Leaf className="w-4.5 h-4.5" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                EcoSort<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              EcoSort AI provides accessible machine learning tools to help classify municipal solid waste, boosting local recycling rates and advancing SDG 12 objectives.
            </p>
          </div>

          {/* Page Links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')} 
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('analyze')} 
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                >
                  Analyze Waste
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('responsible-ai')} 
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                >
                  Responsible AI
                </button>
              </li>
            </ul>
          </div>

          {/* SDG Reference */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-4">
              SDG Contribution
            </h4>
            <div className="flex items-center space-x-2 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs text-amber-300 mb-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="leading-tight">
                <strong>Goal 12:</strong> Sustainable Consumption & Production patterns.
              </p>
            </div>
            <a 
              href="https://sdgs.un.org/goals/goal12" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-emerald-400 transition-colors duration-200 font-mono"
            >
              Learn more at sdgs.un.org &rarr;
            </a>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} EcoSort AI. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>Built for Sustainable Development Goals</span>
            <span>&middot;</span>
            <span>Open Source Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
