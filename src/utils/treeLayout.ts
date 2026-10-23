import { TreeNode, VisualNode, VisualEdge } from '../types';

export interface LayoutResult {
  nodes: VisualNode[];
  edges: VisualEdge[];
  width: number;
  height: number;
  minX: number;
  minY: number;
}

/**
 * Robust binary tree SVG layout generator.
 * Uses an in-order coordinate allocation combined with depth levels.
 * Guarantees zero overlapping nodes, correct left/right orientation,
 * and smooth animated transitions.
 */
export function layoutBinaryTree(root: TreeNode | null): LayoutResult {
  if (!root) {
    return { nodes: [], edges: [], width: 400, height: 260, minX: 0, minY: 0 };
  }

  // Step 1: In-order traversal to determine X order
  let orderIndex = 0;
  const inOrderMap = new Map<number, number>(); // node.id -> orderIndex

  function traverseInOrder(node: TreeNode | null) {
    if (!node) return;
    traverseInOrder(node.left);
    inOrderMap.set(node.id, orderIndex++);
    traverseInOrder(node.right);
  }

  traverseInOrder(root);

  const totalNodes = orderIndex;
  // Dynamic column width based on number of nodes
  const colWidth = totalNodes <= 7 ? 68 : totalNodes <= 15 ? 54 : 44;
  const rowHeight = 75;
  const paddingX = 50;
  const paddingY = 45;

  const visualNodes: VisualNode[] = [];
  const visualEdges: VisualEdge[] = [];

  // Step 2: Assign coordinates
  function assignCoords(node: TreeNode, depth: number, parentId: number | null) {
    const col = inOrderMap.get(node.id) ?? 0;
    const x = paddingX + col * colWidth;
    const y = paddingY + depth * rowHeight;

    visualNodes.push({
      id: node.id,
      val: node.val,
      x,
      y,
      depth,
      parentId
    });

    if (node.left) {
      assignCoords(node.left, depth + 1, node.id);
      const leftCol = inOrderMap.get(node.left.id) ?? 0;
      const childX = paddingX + leftCol * colWidth;
      const childY = paddingY + (depth + 1) * rowHeight;
      visualEdges.push({
        id: `e-${node.id}-${node.left.id}`,
        x1: x,
        y1: y,
        x2: childX,
        y2: childY,
        fromId: node.id,
        toId: node.left.id
      });
    }

    if (node.right) {
      assignCoords(node.right, depth + 1, node.id);
      const rightCol = inOrderMap.get(node.right.id) ?? 0;
      const childX = paddingX + rightCol * colWidth;
      const childY = paddingY + (depth + 1) * rowHeight;
      visualEdges.push({
        id: `e-${node.id}-${node.right.id}`,
        x1: x,
        y1: y,
        x2: childX,
        y2: childY,
        fromId: node.id,
        toId: node.right.id
      });
    }
  }

  assignCoords(root, 0, null);

  // Compute bounding box
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const n of visualNodes) {
    if (n.x < minX) minX = n.x;
    if (n.x > maxX) maxX = n.x;
    if (n.y < minY) minY = n.y;
    if (n.y > maxY) maxY = n.y;
  }

  const width = Math.max(380, maxX - minX + paddingX * 2);
  const height = Math.max(240, maxY - minY + paddingY * 2);

  return {
    nodes: visualNodes,
    edges: visualEdges,
    width,
    height,
    minX: Math.max(0, minX - paddingX),
    minY: 0
  };
}
