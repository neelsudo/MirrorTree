import React from 'react';
import { TreeNode } from '../types';
import { TreeVisualization } from './TreeVisualization';
import { TraversalDisplay } from './TraversalDisplay';

interface TreeComparisonProps {
  originalTree: TreeNode | null;
  mirroredTree: TreeNode | null;
  nodeCount: number;
  height: number;
  originalTraversal: number[];
  mirroredTraversal: number[];
  originalLevels: number[][];
  mirroredLevels: number[][];
  isMirrored: boolean;
}

export const TreeComparison: React.FC<TreeComparisonProps> = ({
  originalTree,
  mirroredTree,
  nodeCount,
  height,
  originalTraversal,
  mirroredTraversal,
  originalLevels,
  mirroredLevels,
  isMirrored
}) => {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Card A: Original Tree (Blue) */}
        <div className="flex flex-col">
          <TreeVisualization
            tree={originalTree}
            type="original"
            title="Original Tree"
            badgeText="BEFORE MIRRORING"
            nodeCount={nodeCount}
            height={height}
          />
          <TraversalDisplay
            title="Original"
            traversal={originalTraversal}
            levels={originalLevels}
            type="original"
          />
        </div>

        {/* Card B: Mirrored Tree (Cyan) */}
        <div className="flex flex-col">
          <TreeVisualization
            tree={mirroredTree}
            type="mirrored"
            title="Mirrored Tree"
            badgeText={isMirrored ? "AFTER MIRRORING" : "READY TO MIRROR"}
            nodeCount={nodeCount}
            height={height}
          />
          <TraversalDisplay
            title="Mirrored"
            traversal={mirroredTraversal}
            levels={mirroredLevels}
            type="mirrored"
          />
        </div>
      </div>
    </section>
  );
};
