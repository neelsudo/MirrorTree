import React, { useState } from 'react';
import { Copy, Check, Layers, ListOrdered } from 'lucide-react';

interface TraversalDisplayProps {
  title: string;
  traversal: number[];
  levels: number[][];
  type: 'original' | 'mirrored';
}

export const TraversalDisplay: React.FC<TraversalDisplayProps> = ({
  title,
  traversal,
  levels,
  type
}) => {
  const [copied, setCopied] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const isOriginal = type === 'original';

  const pillBorder = isOriginal ? 'border-brand-blue/30 text-brand-blue bg-brand-blue/10' : 'border-brand-cyan/30 text-brand-cyan bg-brand-cyan/10';

  const copyToClipboard = () => {
    const text = showLevels
      ? levels.map((lvl, idx) => `Level ${idx}: ${lvl.join(', ')}`).join('\n')
      : traversal.join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-navy-850/80 border border-navy-700 rounded-xl p-4 mt-3">
      {/* Header with Title and Mode Switcher */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold tracking-wider uppercase text-textSecondary flex items-center gap-2">
          <span>{title} Traversal</span>
          <span className="text-[10px] font-mono text-slate-500">
            ({traversal.length} {traversal.length === 1 ? 'node' : 'nodes'})
          </span>
        </span>

        <div className="flex items-center gap-1.5">
          {/* Level grouping toggle */}
          <button
            onClick={() => setShowLevels(!showLevels)}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] rounded-md border transition-all ${
              showLevels
                ? 'bg-navy-800 border-slate-500 text-textPrimary'
                : 'bg-navy-900 border-navy-700 text-textSecondary hover:text-textPrimary'
            }`}
            title="Toggle Level-by-Level grouping"
          >
            {showLevels ? <ListOrdered className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
            <span>{showLevels ? 'Flat' : 'Levels'}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-md text-textSecondary hover:text-textPrimary hover:bg-navy-800 border border-transparent hover:border-navy-700 transition-colors"
            title="Copy Traversal"
            aria-label="Copy traversal to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Traversal Output Area */}
      {traversal.length === 0 ? (
        <div className="py-2 text-xs font-mono text-slate-500 italic">No traversal values</div>
      ) : showLevels ? (
        /* Level-by-level grouped view */
        <div className="space-y-1.5 font-mono text-xs">
          {levels.map((lvl, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-navy-950/60 px-2.5 py-1.5 rounded-lg border border-navy-700/50">
              <span className="text-[11px] font-semibold text-textSecondary w-16 shrink-0">Level {idx}:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {lvl.map((val, vIdx) => (
                  <span
                    key={vIdx}
                    className={`px-2 py-0.5 rounded text-xs border font-medium ${pillBorder}`}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Flat Queue-based Level-Order Traversal sequence */
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs bg-navy-950/60 p-2.5 rounded-lg border border-navy-700/50">
          {traversal.map((val, idx) => (
            <React.Fragment key={idx}>
              <span className={`px-2.5 py-1 rounded-md border font-semibold ${pillBorder}`}>
                {val}
              </span>
              {idx < traversal.length - 1 && (
                <span className="text-slate-600 select-none">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
