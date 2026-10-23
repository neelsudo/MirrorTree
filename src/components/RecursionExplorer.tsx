import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, BookOpen, Code2 } from 'lucide-react';
import { RecursionStep } from '../types';

interface RecursionExplorerProps {
  recursionSteps?: RecursionStep[];
}

export const RecursionExplorer: React.FC<RecursionExplorerProps> = ({ recursionSteps = [] }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepsData = [
    {
      stepNumber: 1,
      title: "Base Case Check",
      cLines: [2, 3, 4],
      action: "Check whether current node is NULL",
      explanation: "If root is NULL, recursion has reached beyond a leaf node or an empty tree. There is nothing to swap, so immediately return NULL to wind back the call stack."
    },
    {
      stepNumber: 2,
      title: "Store Left Pointer",
      cLines: [6],
      action: "Store left child in temporary pointer `temp`",
      explanation: "Before overwriting root->left with root->right, we save root->left into a local pointer `temp = root->left` so its subtree is not lost in memory."
    },
    {
      stepNumber: 3,
      title: "Swap Right to Left",
      cLines: [7],
      action: "Assign `root->left = root->right`",
      explanation: "The right child subtree is moved to become the new left child subtree of the current node."
    },
    {
      stepNumber: 4,
      title: "Complete Pointer Swap",
      cLines: [8],
      action: "Assign `root->right = temp`",
      explanation: "The saved original left child subtree from `temp` is assigned to become the new right child subtree. The two children of the current node are now swapped!"
    },
    {
      stepNumber: 5,
      title: "Recursive Subtree Calls",
      cLines: [10, 11],
      action: "Recursively process `mirrorTree(root->left)` and `mirrorTree(root->right)`",
      explanation: "Invoke the function recursively on the newly assigned left subtree and right subtree. This ensures that every descendant node at all lower depths also has its children mirrored."
    },
    {
      stepNumber: 6,
      title: "Return Root",
      cLines: [13],
      action: "Return the modified `root` pointer",
      explanation: "Once both subtrees have been completely mirrored recursively, return the pointer to the current node to its caller."
    }
  ];

  const codeLines = [
    { line: 1, text: "Node* mirrorTree(Node* root) {" },
    { line: 2, text: "    if (root == NULL) {" },
    { line: 3, text: "        return NULL;" },
    { line: 4, text: "    }" },
    { line: 5, text: "" },
    { line: 6, text: "    Node* temp = root->left;" },
    { line: 7, text: "    root->left = root->right;" },
    { line: 8, text: "    root->right = temp;" },
    { line: 9, text: "" },
    { line: 10, text: "    mirrorTree(root->left);" },
    { line: 11, text: "    mirrorTree(root->right);" },
    { line: 12, text: "" },
    { line: 13, text: "    return root;" },
    { line: 14, text: "}" },
  ];

  const currentStepInfo = stepsData[activeStep];

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : stepsData.length - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < stepsData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-navy-850 border border-navy-700 rounded-2xl overflow-hidden shadow-xl mb-10">
      {/* Header / Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-navy-800/40 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center text-brand-indigo">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-semibold text-textPrimary tracking-tight">
              How Recursion Works
            </h2>
            <p className="text-xs text-textSecondary">
              Understand the mirror operation step by step.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-textSecondary">
          <span className="hidden sm:inline font-medium">
            {isExpanded ? 'Collapse' : 'Expand'}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 border-t border-navy-700/80 bg-navy-900/30">
          <p className="text-sm text-textSecondary mb-6 leading-relaxed max-w-3xl">
            The mirror function visits each node in post-order or pre-order fashion, swaps its left and right pointers in $O(1)$ time, and recursively mirrors both subtrees until reaching the leaves.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: C++ Code with Line Highlight */}
            <div className="lg:col-span-7 bg-navy-950 border border-navy-700 rounded-xl p-4 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-700 text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>cpp/mirror_tree.cpp</span>
                </div>
                <span className="text-brand-indigo font-semibold">C++ Algorithm</span>
              </div>

              <pre className="space-y-0.5 leading-5 select-none">
                {codeLines.map((item) => {
                  const isActive = currentStepInfo.cLines.includes(item.line);
                  return (
                    <div
                      key={item.line}
                      className={`flex items-center px-2 py-0.5 rounded transition-all ${
                        isActive
                          ? 'bg-brand-indigo/20 text-white font-semibold border-l-2 border-brand-indigo'
                          : 'text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <span className="w-7 shrink-0 text-slate-600 select-none text-[11px] text-right pr-3">
                        {item.line}
                      </span>
                      <span className={isActive ? 'text-textPrimary font-mono' : 'text-slate-300'}>
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </pre>
            </div>

            {/* Right Column: Step Stepper & Detailed Explanation */}
            <div className="lg:col-span-5 bg-navy-800/60 border border-navy-700 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                    Step {currentStepInfo.stepNumber} of 6
                  </span>
                  <div className="flex items-center gap-1">
                    {stepsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === activeStep ? 'bg-brand-indigo w-6' : 'bg-navy-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Jump to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-textPrimary mb-1.5">
                  {currentStepInfo.title}
                </h3>
                <div className="text-xs font-mono text-brand-indigo bg-brand-indigo/10 p-2.5 rounded-lg border border-brand-indigo/20 mb-3">
                  {currentStepInfo.action}
                </div>
                <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
                  {currentStepInfo.explanation}
                </p>

                {/* Real C++ execution trace preview if available */}
                {recursionSteps.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-navy-700/60">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Current Tree Trace ({recursionSteps.length} nodes visited by C++):
                    </span>
                    <div className="text-[11px] font-mono text-brand-cyan truncate">
                      {recursionSteps[activeStep % recursionSteps.length]?.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-5 mt-4 border-t border-navy-700">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-700 hover:bg-navy-600 text-textPrimary transition-all active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-brand-indigo hover:bg-brand-indigo/90 text-white transition-all active:scale-95 shadow-glow-indigo"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
