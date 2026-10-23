import React from 'react';
import { ArrowLeftRight, PlusCircle, RotateCcw, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TreeInputProps {
  inputVal: string;
  setInputVal: (val: string) => void;
  onCreateTree: () => void;
  onMirrorTree: () => void;
  onLoadExample: () => void;
  onReset: () => void;
  errorMessage: string | null;
  successMessage: string | null;
  isMirrored: boolean;
  isEmpty: boolean;
  isLoading: boolean;
}

export const TreeInput: React.FC<TreeInputProps> = ({
  inputVal,
  setInputVal,
  onCreateTree,
  onMirrorTree,
  onLoadExample,
  onReset,
  errorMessage,
  successMessage,
  isMirrored,
  isEmpty,
  isLoading
}) => {
  const presets = [
    { id: 'sample', label: 'Sample (Full)', value: '1, 2, 3, 4, 5, 6, 7' },
    { id: 'single', label: 'Single Node', value: '10' },
    { id: 'left', label: 'Left-Skewed', value: '1, 2, null, 3' },
    { id: 'right', label: 'Right-Skewed', value: '1, null, 2, null, 3' },
    { id: 'dups', label: 'Duplicates', value: '1, 2, 2, 3, 4' },
  ];

  const handlePresetClick = (_id: string, value: string) => {
    setInputVal(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onCreateTree();
    }
  };

  return (
    <section className="bg-navy-850 border border-navy-700 rounded-2xl p-5 md:p-6 shadow-xl mb-8">
      {/* Input header & quick presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div>
          <label htmlFor="tree-input" className="text-xs font-semibold tracking-wider uppercase text-textSecondary flex items-center gap-2">
            <span>LEVEL ORDER INPUT</span>
            <span className="text-[10px] text-brand-indigo bg-brand-indigo/10 px-2 py-0.5 rounded border border-brand-indigo/20">
              General Binary Tree
            </span>
          </label>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-textSecondary mr-1">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset.id, preset.value)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                inputVal === preset.value
                  ? 'bg-brand-indigo/20 border-brand-indigo text-textPrimary font-medium'
                  : 'bg-navy-800/80 border-navy-700 text-textSecondary hover:border-slate-500 hover:text-textPrimary'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input box & buttons */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <div className="flex-1 relative">
          <input
            id="tree-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="1, 2, 3, 4, 5, 6, 7"
            aria-label="Level order input sequence"
            className="w-full bg-navy-950 border border-navy-700 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/20 rounded-xl px-4 py-3 text-textPrimary placeholder:text-slate-600 font-mono text-sm outline-none transition-all"
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary Action: Mirror Tree */}
          <button
            type="button"
            id="mirror-tree-btn"
            onClick={onMirrorTree}
            disabled={isEmpty || isLoading}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-glow-indigo ${
              isEmpty || isLoading
                ? 'bg-navy-800 text-slate-500 cursor-not-allowed border border-navy-700'
                : 'bg-brand-indigo hover:bg-brand-indigo/90 text-white active:scale-95'
            }`}
          >
            <ArrowLeftRight className={`w-4 h-4 ${isMirrored ? 'rotate-180 transition-transform duration-500' : ''}`} />
            <span>{isMirrored ? 'Mirror Again' : 'Mirror Tree'}</span>
          </button>

          {/* Secondary Action: Create Tree */}
          <button
            type="button"
            id="create-tree-btn"
            onClick={onCreateTree}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-navy-800 hover:bg-navy-700 text-textPrimary border border-navy-700 transition-all hover:border-slate-500 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-brand-cyan" />
            <span>Create Tree</span>
          </button>

          {/* Secondary Action: Load Example */}
          <button
            type="button"
            id="load-example-btn"
            onClick={onLoadExample}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-navy-800 hover:bg-navy-700 text-textPrimary border border-navy-700 transition-all hover:border-slate-500 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span>Load Example</span>
          </button>

          {/* Secondary Action: Reset */}
          <button
            type="button"
            id="reset-tree-btn"
            onClick={onReset}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl font-medium text-sm bg-navy-800/60 hover:bg-navy-700 text-textSecondary hover:text-textPrimary border border-navy-700 transition-all active:scale-95"
            title="Reset to default tree"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-2.5 text-xs text-textSecondary">
        Enter node values in level-order format. Use <code className="text-brand-cyan font-mono bg-navy-900 px-1 py-0.5 rounded">null</code> to represent a missing child. Supports negatives, zeroes, and duplicate values.
      </p>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-3.5 p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center gap-2.5 text-brand-red text-sm animate-fade-in" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mt-3.5 p-3 rounded-xl bg-brand-green/10 border border-brand-green/30 flex items-center gap-2.5 text-brand-green text-sm animate-fade-in" role="status">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}
    </section>
  );
};
