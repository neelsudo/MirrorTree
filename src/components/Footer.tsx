import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-navy-700/80 py-8 px-4 text-center text-xs text-textSecondary bg-navy-950/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-textPrimary">MirrorTree</span>
          <span>·</span>
          <span>Data Structures & Algorithms</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-brand-indigo font-mono text-[11px]">BTech CSE Project</span>
        </div>
        <p className="text-slate-500">
          Built to make recursion easier to understand.
        </p>
      </div>
    </footer>
  );
};
