import React, { useState } from 'react';
import { Play, RotateCcw, Info, Check } from 'lucide-react';

export default function DisposalDiagram({ category = "Plastic", item = "" }) {
  const [animate, setAnimate] = useState(true);

  // Normalize category
  const cat = category.toLowerCase();

  const handleToggle = () => {
    setAnimate(!animate);
  };

  // Render Category-Specific SVG Diagrams
  const renderDiagramContent = () => {
    if (cat.includes('plastic')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-cyan-400">
          {/* Grid lines helper */}
          <defs>
            <style>{`
              .cap {
                transform-origin: 120px 50px;
                animation: ${animate ? 'unscrewCap 3s ease-in-out infinite' : 'none'};
              }
              .bottle-body {
                transform-origin: 120px 110px;
                animation: ${animate ? 'bodyFall 3s ease-in-out infinite' : 'none'};
              }
              @keyframes unscrewCap {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                30% { transform: translateY(-8px) rotate(-180deg); }
                60%, 85% { transform: translateY(-35px) rotate(-360deg) scale(0.95); opacity: 0.9; }
              }
              @keyframes bodyFall {
                0%, 100% { transform: translateY(0); }
                60%, 85% { transform: translateY(15px); }
              }
            `}</style>
          </defs>

          {/* Dotted separation lines */}
          {animate && (
            <line x1="120" y1="65" x2="120" y2="100" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          )}

          {/* Cap */}
          <g className="cap">
            <rect x="110" y="40" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="114" y1="44" x2="114" y2="48" stroke="currentColor" strokeWidth="1" />
            <line x1="120" y1="44" x2="120" y2="48" stroke="currentColor" strokeWidth="1" />
            <line x1="126" y1="44" x2="126" y2="48" stroke="currentColor" strokeWidth="1" />
            <text x="138" y="48" className="fill-gray-500 font-mono text-[9px]">Lid (Landfill/Separate)</text>
          </g>

          {/* Bottle Body */}
          <g className="bottle-body">
            <path d="M106 70 C106 60, 112 55, 112 55 L128 55 C128 55, 134 60, 134 70 L134 135 C134 140, 130 144, 125 144 L115 144 C110 144, 106 140, 106 135 Z" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M110 85 H130" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M110 105 H130" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
            {/* Recycling sign symbol (PET 1) simplified */}
            <polygon points="120,93 124,101 116,101" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="142" y="110" className="fill-emerald-400 font-mono text-[9px] font-bold">Body (Recycle PET 1)</text>
          </g>
        </svg>
      );
    } else if (cat.includes('paper') || cat.includes('cardboard')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-emerald-400">
          <defs>
            <style>{`
              .tape {
                transform-origin: 120px 75px;
                animation: ${animate ? 'peelTape 3s ease-in-out infinite' : 'none'};
              }
              .box {
                transform-origin: 120px 95px;
                animation: ${animate ? 'flattenBox 3s ease-in-out infinite' : 'none'};
              }
              @keyframes peelTape {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                30% { transform: translateY(-20px) rotate(-10deg); opacity: 0.8; }
                60%, 85% { transform: translateY(-50px) rotate(-20deg) scale(0.8); opacity: 0; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
              }
              @keyframes flattenBox {
                0% { transform: scale(1) skewX(0deg); }
                30% { transform: scale(0.9) skewX(5deg); }
                60%, 85% { transform: scaleY(0.15) scaleX(1.1) rotate(-5deg); }
                100% { transform: scale(1) skewX(0deg); }
              }
            `}</style>
          </defs>

          {/* Box Outline */}
          <g className="box">
            {/* Box main face */}
            <rect x="80" y="70" width="80" height="55" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Box flaps */}
            <path d="M80 70 L65 55 H105 L120 70" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M160 70 L175 55 H135 L120 70" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="120" y1="70" x2="120" y2="125" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="166" y="110" className="fill-emerald-400 font-mono text-[9px] font-bold">Flatten Box</text>
          </g>

          {/* Tape */}
          <g className="tape">
            <path d="M85 70 H155" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            <text x="120" y="60" textAnchor="middle" className="fill-red-400 font-mono text-[9px] font-bold">Remove Tape</text>
          </g>
        </svg>
      );
    } else if (cat.includes('glass')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-teal-400">
          <defs>
            <style>{`
              .lid {
                transform-origin: 120px 45px;
                animation: ${animate ? 'unscrewLid 3s ease-in-out infinite' : 'none'};
              }
              .jar {
                transform-origin: 120px 105px;
                animation: ${animate ? 'jarShift 3s ease-in-out infinite' : 'none'};
              }
              @keyframes unscrewLid {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                30% { transform: translateY(-10px) rotate(-90deg); }
                60%, 85% { transform: translateY(-40px) rotate(-180deg) scale(0.9); }
              }
              @keyframes jarShift {
                0%, 100% { transform: translateY(0); }
                60%, 85% { transform: translateY(12px); }
              }
            `}</style>
          </defs>

          {/* Dotted separation lines */}
          {animate && (
            <line x1="120" y1="60" x2="120" y2="90" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          )}

          {/* Lid */}
          <g className="lid">
            <rect x="106" y="38" width="28" height="10" rx="1" fill="none" stroke="#indigo" strokeWidth="2" className="text-indigo-400" />
            <line x1="106" y1="43" x2="134" y2="43" stroke="currentColor" strokeWidth="1" />
            <text x="142" y="44" className="fill-indigo-400 font-mono text-[9px] font-bold">Metal Lid (Recycle)</text>
          </g>

          {/* Glass Jar */}
          <g className="jar">
            <path d="M102 65 C102 55, 108 52, 108 52 H132 C132 52, 138 55, 138 65 L138 135 C138 141, 134 145, 128 145 H112 C106 145, 102 141, 102 135 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Water droplets rinsing */}
            {animate && (
              <>
                <circle cx="120" cy="75" r="2" fill="currentColor" className="opacity-40 animate-bounce" />
                <circle cx="114" cy="90" r="1.5" fill="currentColor" className="opacity-30 animate-pulse" />
                <circle cx="126" cy="95" r="2.5" fill="currentColor" className="opacity-50 animate-bounce" style={{ animationDelay: "0.2s" }} />
              </>
            )}
            <text x="144" y="105" className="fill-teal-400 font-mono text-[9px] font-bold">Rinse Glass Jar</text>
          </g>
        </svg>
      );
    } else if (cat.includes('metal')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-indigo-400">
          <defs>
            <style>{`
              .water-drop {
                animation: ${animate ? 'waterFall 3s linear infinite' : 'none'};
              }
              .can-body {
                transform-origin: 120px 100px;
                animation: ${animate ? 'crushCan 3s ease-in-out infinite' : 'none'};
              }
              @keyframes waterFall {
                0% { transform: translateY(0); opacity: 0; }
                5% { opacity: 1; }
                30% { transform: translateY(60px); opacity: 0; }
                100% { transform: translateY(0); opacity: 0; }
              }
              @keyframes crushCan {
                0%, 45% { transform: scale(1); }
                65%, 85% { transform: scaleY(0.4) scaleX(1.2) translateY(35px) rotate(2deg); }
                100% { transform: scale(1); }
              }
            `}</style>
          </defs>

          {/* Water droplet */}
          <g className="water-drop" transform="translate(120, 30)">
            <path d="M0 -5 C-3 0, -3 4, 0 6 C3 4, 3 0, 0 -5 Z" fill="#06b6d4" />
          </g>

          {/* Metal Can */}
          <g className="can-body">
            <rect x="98" y="65" width="44" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="120" cy="65" rx="22" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="120" cy="135" rx="22" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Pop tab */}
            <ellipse cx="120" cy="65" rx="5" ry="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="150" y="85" className="fill-indigo-300 font-mono text-[9px]">1. Rinse Liquids</text>
            <text x="150" y="115" className="fill-indigo-400 font-mono text-[9px] font-bold">2. Crush Can</text>
          </g>
        </svg>
      );
    } else if (cat.includes('organic')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-amber-500">
          <defs>
            <style>{`
              .wrap {
                transform-origin: 120px 90px;
                animation: ${animate ? 'discardWrap 3s ease-in-out infinite' : 'none'};
              }
              .organic-core {
                transform-origin: 120px 90px;
                animation: ${animate ? 'compostCore 3s ease-in-out infinite' : 'none'};
              }
              @keyframes discardWrap {
                0%, 100% { transform: scale(1); opacity: 1; }
                40% { transform: translateX(-40px) scale(0.9); opacity: 0.7; }
                65%, 85% { transform: translateX(-65px) scale(0.8); opacity: 0.2; }
              }
              @keyframes compostCore {
                0%, 100% { transform: scale(1); opacity: 1; }
                40% { transform: translateX(40px) scale(0.9); }
                65%, 85% { transform: translateX(65px) scale(1.1) rotate(10deg); }
              }
            `}</style>
          </defs>

          {/* Dotted separation lines */}
          {animate && (
            <line x1="120" y1="50" x2="120" y2="130" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          )}

          {/* Plastic wrapper wrapper */}
          <g className="wrap">
            <rect x="90" y="60" width="60" height="60" rx="6" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="45" y="132" className="fill-red-400 font-mono text-[8px] font-bold text-center">Separate Wrappers</text>
          </g>

          {/* Apple Core */}
          <g className="organic-core">
            {/* Core center */}
            <path d="M120 62 C115 65, 115 115, 120 118 C125 115, 125 65, 120 62 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Top and bottom skin */}
            <path d="M112 62 C112 62, 120 58, 128 62" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M112 118 C112 118, 120 122, 128 118" fill="none" stroke="currentColor" strokeWidth="2" />
            {/* Seeds */}
            <circle cx="119" cy="85" r="1.5" fill="currentColor" />
            <circle cx="121" cy="95" r="1.5" fill="currentColor" />
            {/* Stem */}
            <path d="M120 58 C121 53, 125 51, 125 51" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <text x="140" y="132" className="fill-amber-400 font-mono text-[8px] font-bold">Compost Organics</text>
          </g>
        </svg>
      );
    } else if (cat.includes('e-waste')) {
      return (
        <svg viewBox="0 0 240 180" className="w-full h-44 text-purple-400">
          <defs>
            <style>{`
              .battery-pack {
                transform-origin: 105px 90px;
                animation: ${animate ? 'extractBattery 3s ease-in-out infinite' : 'none'};
              }
              .device-casing {
                transform-origin: 120px 90px;
                animation: ${animate ? 'casingShift 3s ease-in-out infinite' : 'none'};
              }
              @keyframes extractBattery {
                0%, 100% { transform: translateY(0); opacity: 1; }
                40% { transform: translateY(-40px) scale(0.9); }
                65%, 85% { transform: translateY(-60px) scale(0.85); }
              }
              @keyframes casingShift {
                0%, 100% { transform: translateY(0); }
                65%, 85% { transform: translateY(15px); }
              }
            `}</style>
          </defs>

          {/* Dotted separation lines */}
          {animate && (
            <line x1="105" y1="60" x2="105" y2="120" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          )}

          {/* Device Casing */}
          <g className="device-casing">
            <rect x="85" y="55" width="70" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="90" y="60" width="60" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {/* Keyboard or circuits details */}
            <line x1="95" y1="138" x2="145" y2="138" stroke="currentColor" strokeWidth="1.5" />
            <text x="160" y="115" className="fill-purple-300 font-mono text-[9px]">1. Device Casing</text>
          </g>

          {/* Battery Pack inside */}
          <g className="battery-pack">
            <rect x="95" y="75" width="20" height="40" rx="3" fill="none" stroke="#f43f5e" strokeWidth="2" className="text-rose-500" />
            <rect x="101" y="71" width="8" height="4" fill="none" stroke="#f43f5e" strokeWidth="2" className="text-rose-500" />
            <line x1="100" y1="87" x2="110" y2="87" stroke="#f43f5e" strokeWidth="1.5" className="text-rose-500" />
            <line x1="100" y1="97" x2="110" y2="97" stroke="#f43f5e" strokeWidth="1.5" className="text-rose-500" />
            <text x="120" y="70" className="fill-rose-400 font-mono text-[9px] font-bold">2. Remove Battery</text>
          </g>
        </svg>
      );
    }

    // Default / Landfill / Unrecognized
    return (
      <svg viewBox="0 0 240 180" className="w-full h-44 text-rose-400">
        <defs>
          <style>{`
            .trash-shake {
              transform-origin: 120px 90px;
              animation: ${animate ? 'shake 1.5s ease-in-out infinite' : 'none'};
            }
            @keyframes shake {
              0%, 100% { transform: rotate(0deg); }
              20%, 60% { transform: rotate(-3deg); }
              40%, 80% { transform: rotate(3deg); }
            }
          `}</style>
        </defs>

        <g className="trash-shake">
          {/* Bin structure */}
          <path d="M90 60 L100 135 C100 138, 103 140, 106 140 H134 C137 140, 140 138, 140 135 L150 60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Lid */}
          <rect x="82" y="50" width="76" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M110 50 V43 H130 V50" fill="none" stroke="currentColor" strokeWidth="2" />
          
          {/* Exclamation point */}
          <circle cx="120" cy="110" r="3" fill="currentColor" />
          <path d="M120 75 V100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          
          <text x="120" y="160" textAnchor="middle" className="fill-rose-400 font-mono text-[9px] font-bold">Sort Carefully / General Waste</text>
        </g>
      </svg>
    );
  };

  return (
    <div className="glass p-6 rounded-2xl relative overflow-hidden h-full flex flex-col justify-between border-l-2 border-l-cyan-500/50">
      {/* Background Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[#050b07] opacity-95 z-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />
      <div className="absolute inset-0 bg-radial-glow-cyan opacity-25 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-cyan-400 text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Disposal Blueprint</span>
          </h3>

          {/* Toggle Animation */}
          <button
            onClick={handleToggle}
            className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-bold font-mono text-gray-400 hover:text-white border border-white/5 transition-all duration-200 cursor-pointer flex items-center space-x-1"
          >
            {animate ? (
              <>
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5" />
                <span>Animate</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Vector SVG Schematic */}
        <div className="flex items-center justify-center py-2 flex-grow">
          {renderDiagramContent()}
        </div>

        {/* Description Callout */}
        <div className="mt-4 flex items-start space-x-2 bg-cyan-950/20 border border-cyan-500/10 rounded-xl p-3 text-xs text-cyan-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed leading-5">
            <strong>Blueprint Action:</strong> {
              cat.includes('plastic') ? "Unscrew and dispose of the cap separately to optimize bottle crushing." :
              cat.includes('paper') || cat.includes('cardboard') ? "Remove synthetic packing tapes and collapse flats to save space." :
              cat.includes('glass') ? "Remove metal lids to separate steel loops from soda-lime glass recycling." :
              cat.includes('metal') ? "Rinse any soda/sugar residue to avoid contamination and crush the metal cylinder." :
              cat.includes('organic') ? "Remove any packaging plastic wrappers before adding core scraps to composting." :
              cat.includes('e-waste') ? "Extract the toxic battery pack to process it at specialized drop-off points." :
              "Inspect item label markings. Place in general refuse if materials are mixed composites."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
