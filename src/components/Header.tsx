import React from 'react';
import { GitFork, Cpu } from 'lucide-react';

interface HeaderProps {
  engine?: string;
  executionTimeMs?: string;
}

export const Header: React.FC<HeaderProps> = ({ engine, executionTimeMs }) => {
  return (
    <header className="h-16 md:h-18 border-b border-navy-700 bg-navy-950/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Left Side: Brand & Icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
            <GitFork className="w-5 h-5 rotate-180" />
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-textPrimary">
              Mirror<span className="text-brand-cyan">Tree</span>
            </h1>
            <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-brand-indigo/15 text-brand-indigo border border-brand-indigo/30 rounded-md">
              DSA LAB
            </span>
          </div>
        </div>

        {/* Right Side: Status Indicator & C++ Engine */}
        <div className="flex items-center gap-3 md:gap-4 text-xs font-mono">
          {engine && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-850 border border-navy-700 text-brand-cyan">
              <Cpu className="w-3.5 h-3.5" />
              <span>{engine.includes('WASM') || engine.includes('WebAssembly') ? 'C++ WASM' : 'C++ Native'}</span>
              {executionTimeMs && <span className="text-textSecondary">({executionTimeMs}ms)</span>}
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-navy-850 border border-navy-700 text-textSecondary">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
            <span className="text-textPrimary font-sans text-xs">Interactive Visualizer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
