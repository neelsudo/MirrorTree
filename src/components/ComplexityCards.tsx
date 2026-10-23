import React from 'react';
import { Clock, Cpu } from 'lucide-react';

export const ComplexityCards: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Time Complexity Card */}
        <div className="bg-navy-850 border border-navy-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-indigo/15 border border-brand-indigo/30 flex items-center justify-center text-brand-indigo">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-textSecondary">
                Time Complexity
              </h3>
            </div>
            <span className="text-xl font-bold font-mono text-brand-indigo bg-brand-indigo/10 px-3 py-1 rounded-lg border border-brand-indigo/20">
              O(n)
            </span>
          </div>
          <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
            Every node in the binary tree is visited exactly once. At each node, swapping left and right pointers is an $O(1)$ constant time pointer exchange.
          </p>
        </div>

        {/* Auxiliary Space Complexity Card */}
        <div className="bg-navy-850 border border-navy-700 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-textSecondary">
                Auxiliary Space Complexity
              </h3>
            </div>
            <span className="text-xl font-bold font-mono text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-lg border border-brand-cyan/20">
              O(h)
            </span>
          </div>
          <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
            Proportional to the height $h$ of the binary tree due to call stack frames. For a balanced tree, $h = O(\log n)$. In the worst case of a skewed tree, it becomes $O(n)$.
          </p>
        </div>
      </div>
    </section>
  );
};
