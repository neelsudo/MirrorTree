export interface TreeNode {
  id: number;
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface VisualNode {
  id: number;
  val: number;
  x: number;
  y: number;
  depth: number;
  parentId: number | null;
}

export interface VisualEdge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromId: number;
  toId: number;
}

export interface RecursionStep {
  nodeId: number;
  val: number;
  hasLeft: boolean;
  leftVal: number;
  hasRight: boolean;
  rightVal: number;
  description: string;
}

export interface TreeProcessResult {
  success: boolean;
  error?: string;
  isEmpty?: boolean;
  nodeCount: number;
  height: number;
  originalTraversal: number[];
  mirroredTraversal: number[];
  originalLevels: number[][];
  mirroredLevels: number[][];
  originalTree: TreeNode | null;
  mirroredTree: TreeNode | null;
  recursionSteps: RecursionStep[];
  engine?: string;
  executionTimeMs?: string;
}

export type ExecutionMode = 'wasm' | 'native';
