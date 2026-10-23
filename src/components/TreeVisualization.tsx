import React, { useMemo, useState } from 'react';
import { TreeNode } from '../types';
import { layoutBinaryTree } from '../utils/treeLayout';
import { ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';

interface TreeVisualizationProps {
  tree: TreeNode | null;
  type: 'original' | 'mirrored';
  title: string;
  badgeText: string;
  nodeCount: number;
  height: number;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  tree,
  type,
  title,
  badgeText,
  nodeCount,
  height
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const isOriginal = type === 'original';

  // Colors based on specification
  const strokeColor = isOriginal ? '#60A5FA' : '#22D3EE';
  const fillColor = isOriginal ? 'rgba(96, 165, 250, 0.14)' : 'rgba(34, 211, 238, 0.14)';
  const glowColor = isOriginal ? 'rgba(96, 165, 250, 0.25)' : 'rgba(34, 211, 238, 0.25)';
  const badgeBg = isOriginal ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/30' : 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30';

  const layout = useMemo(() => {
    return layoutBinaryTree(tree);
  }, [tree]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="bg-navy-850 border border-navy-700 rounded-2xl flex flex-col overflow-hidden shadow-xl">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-navy-700/80 flex items-center justify-between bg-navy-900/40">
        <div className="flex items-center gap-2.5">
          <div className={`w-3 h-3 rounded-full ${isOriginal ? 'bg-brand-blue' : 'bg-brand-cyan'} shadow-sm`} />
          <h2 className="text-base font-semibold text-textPrimary tracking-tight">{title}</h2>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeBg}`}>
            {badgeText}
          </span>
        </div>

        {/* Tree Metrics & Zoom Controls */}
        <div className="flex items-center gap-3 text-xs">
          {tree && (
            <div className="hidden sm:flex items-center gap-3 font-mono text-textSecondary bg-navy-800/80 px-2.5 py-1 rounded-lg border border-navy-700">
              <span>Nodes: <strong className="text-textPrimary">{nodeCount}</strong></span>
              <span className="text-navy-700">•</span>
              <span>Height: <strong className="text-textPrimary">{height}</strong></span>
            </div>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-navy-800/80 p-0.5 rounded-lg border border-navy-700">
            <button
              onClick={handleZoomOut}
              className="p-1 text-textSecondary hover:text-textPrimary rounded transition-colors"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-[11px] font-mono text-textSecondary hover:text-textPrimary transition-colors"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1 text-textSecondary hover:text-textPrimary rounded transition-colors"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Diagram Canvas Container */}
      <div className="relative flex-1 min-h-[320px] max-h-[460px] overflow-auto bg-navy-950/70 p-4 flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#F1F5F9 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {!tree ? (
          <div className="flex flex-col items-center justify-center text-center p-8 z-10">
            <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-textSecondary mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-textPrimary">No tree to visualize</p>
            <p className="text-xs text-textSecondary mt-1 max-w-xs">
              Create a tree or load an example to get started.
            </p>
          </div>
        ) : (
          <div
            className="transition-transform duration-300 ease-out origin-center"
            style={{ transform: `scale(${zoom})` }}
          >
            <svg
              width={layout.width}
              height={layout.height}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              className="overflow-visible"
              aria-label={`${title} diagram with ${nodeCount} nodes`}
            >
              <defs>
                <filter id={`glow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={glowColor} />
                </filter>
              </defs>

              {/* Connecting Edges */}
              <g className="edges">
                {layout.edges.map((edge) => (
                  <line
                    key={edge.id}
                    x1={edge.x1}
                    y1={edge.y1}
                    x2={edge.x2}
                    y2={edge.y2}
                    stroke="#334155"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="tree-edge"
                  />
                ))}
              </g>

              {/* Tree Nodes */}
              <g className="nodes">
                {layout.nodes.map((node) => (
                  <g
                    key={node.id}
                    className="tree-node group cursor-default"
                    style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                  >
                    {/* Node Circle */}
                    <circle
                      r="22"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="2"
                      filter={`url(#glow-${type})`}
                      className="transition-all duration-300 group-hover:stroke-white group-hover:scale-105"
                    />

                    {/* Node Value */}
                    <text
                      textAnchor="middle"
                      dy="0.32em"
                      fill="#F1F5F9"
                      fontSize="14"
                      fontWeight="600"
                      fontFamily="'JetBrains Mono', monospace"
                      className="pointer-events-none select-none"
                    >
                      {node.val}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
