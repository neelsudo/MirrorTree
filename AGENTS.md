# MirrorTree — Interactive Binary Tree Visualizer

## 1. Project Overview

Build a web application called **MirrorTree**, an interactive visualization tool that demonstrates how a binary tree is mirrored using recursion.

The application should help students understand binary trees, recursive function calls, node swapping, and level order traversal through a visual and interactive interface.

This is a Data Structures and Algorithms college project. Keep the implementation understandable for a Second Year BTech Computer Science student.

## 2. Main Objective

Given the root of a binary tree, recursively swap the left and right children of every node to create its mirror image.

The application must display the original and mirrored trees visually and show their respective level order traversals.

The main algorithm must follow this logic:

1. If the current node is NULL, return NULL.
2. Swap the current node's left and right children.
3. Recursively mirror the left subtree.
4. Recursively mirror the right subtree.
5. Return the root.

## 3. Technology Stack

Use the following technologies:

- Frontend: React with TypeScript.
- Styling: Tailwind CSS.
- Icons: Lucide React.
- Tree visualization: SVG or custom React components.
- Algorithm implementation: C++.

Keep the interface responsive and ensure the application runs locally.

The C++ implementation must contain the actual recursive mirror algorithm. Do not replace the core algorithm with a JavaScript-only implementation.

If the frontend needs to execute the C++ algorithm in the browser, use a suitable integration such as WebAssembly. Keep the integration minimal and document how to build and run it.

Do not introduce a database, authentication, or unnecessary backend services.

## 4. Core Features

### Feature 1: Create a Binary Tree

Provide an input field that accepts level-order values.

Example input:

`1, 2, 3, 4, 5, 6, 7`

Construct the corresponding binary tree and display it graphically.

Requirements:
- Support positive integers, negative integers, and zero.
- Validate the input.
- Display a useful error message for invalid input.
- Support missing children using a clearly documented notation, such as `null`.
- Use standard level-order construction, where each non-null node's children are assigned from the remaining level-order sequence.
- Do not silently create a different tree when input is invalid.

### Feature 2: Visualize the Original Tree

Display the original binary tree with:
- Circular nodes containing their values.
- Lines connecting parent and child nodes.
- Proper horizontal spacing between siblings.
- Vertical spacing between levels.
- Clear separation between nodes.
- Automatic layout adjustments for different tree sizes.

Use SVG or another suitable approach to draw the nodes and connecting edges.

### Feature 3: Mirror the Tree

Provide a prominent **Mirror Tree** button.

When clicked:
1. Execute the recursive mirror operation using the C++ implementation.
2. Swap the left and right children of every node.
3. Update the visual representation.
4. Display the mirrored level-order traversal.
5. Show a short success message.

Avoid refreshing the entire page.

### Feature 4: Original and Mirrored Comparison

Display two tree visualizations side by side.

**Original Tree**
- Shows the tree before mirroring.
- Remains unchanged after the mirror operation.

**Mirrored Tree**
- Shows the resulting mirrored tree.
- Updates when the user performs the mirror operation.

Maintain a separate copy of the original tree so that mirroring does not destroy the comparison view.

For a newly created tree, initialize both views appropriately.

### Feature 5: Level Order Traversal

Display the traversal of each tree.

Example:

Original tree:

          1
         / \
        2   3
       / \ / \
      4  5 6  7

Original traversal:
`1 2 3 4 5 6 7`

Mirrored tree:

          1
         / \
        3   2
       / \ / \
      7  6 5  4

Mirrored traversal:
`1 3 2 7 6 5 4`

Use a queue-based level-order traversal, matching the approach used in the original C++ practical.

### Feature 6: Reset

Provide a **Reset** button that restores the initial demonstration tree.

The reset operation should:
- Restore the default tree.
- Reset the mirrored view.
- Restore the original traversal.
- Clear errors and success messages.
- Reset any visualization state.

### Feature 7: Sample Tree

Provide a **Load Sample Tree** button that loads this tree:

          1
         / \
        2   3
       / \ / \
      4  5 6  7

This should work without requiring the user to enter values manually.

## 5. Optional Educational Feature

If the core functionality is complete, add a small **How Recursion Works** section.

Explain the algorithm step by step:

1. Check whether the current node is NULL.
2. Store the left child in a temporary pointer.
3. Assign the right child to the left pointer.
4. Assign the temporary pointer to the right pointer.
5. Recursively process both subtrees.
6. Return the root.

Show the following C++ logic:

```cpp
Node* mirrorTree(Node* root) {
    if (root == NULL) {
        return NULL;
    }

    Node* temp = root->left;
    root->left = root->right;
    root->right = temp;

    mirrorTree(root->left);
    mirrorTree(root->right);

    return root;
}
```

Explain the code in beginner-friendly language.

Do not add complicated recursion animations unless the core application is already working.

## 6. User Interface Design

Create a modern, clean educational interface.

### Design Direction

- Use a dark navy background.
- Use subtle blue or cyan accents.
- Use light-colored text with good contrast.
- Use rounded cards with restrained borders.
- Use subtle shadows and hover effects.
- Use readable typography.
- Keep the interface uncluttered.

### Layout

**Header**
- Application name: MirrorTree.
- Subtitle: Interactive Binary Tree Visualizer.
- Small badge: Data Structures Project.

**Input Section**
- Tree input field.
- Create Tree button.
- Load Sample Tree button.
- Mirror Tree button.
- Reset button.

**Visualization Section**
- Original Tree card.
- Mirrored Tree card.
- SVG tree diagrams.
- Level order traversal beneath each tree.

**Learning Section**
- Recursive algorithm explanation.
- Time complexity.
- Space complexity.

### Responsive Behavior

On desktop, display the original and mirrored trees side by side.

On mobile, stack the cards vertically.

Ensure large trees remain readable. Use appropriate scrolling or responsive scaling instead of allowing the nodes to overlap.

## 7. Algorithm Complexity

Display these complexity details in the application:

**Time Complexity:** O(n)

Every node is visited once.

**Auxiliary Space Complexity:** O(h)

The recursive function uses a call stack proportional to the tree's height, where h is the height of the tree.

For a skewed tree, the recursion stack can grow to O(n).

## 8. Coding Standards

- Use simple, readable code.
- Prefer small, reusable components.
- Use TypeScript types for tree nodes and component properties.
- Use meaningful variable and function names.
- Keep the C++ implementation beginner-friendly.
- Avoid unnecessary abstractions and design patterns.
- Do not introduce complex state management libraries.
- Avoid excessive comments.
- Keep the project suitable for a college practical demonstration.
- Do not add features that are unrelated to binary trees or mirroring.

## 9. Error Handling

Handle the following situations:

- Empty input.
- Invalid numeric values.
- Invalid level-order structure.
- A tree containing only one node.
- A tree with missing children.
- A tree with only left children.
- A tree with only right children.
- A mirror operation on an empty tree.
- A tree with duplicate values.

Duplicate values must be allowed because tree nodes are identified by their positions and connections, not just their values.

Never crash the application because of invalid user input.

## 10. Important Implementation Rules

- Preserve the original tree separately from the mirrored tree.
- Mirror the tree structurally, not by simply reversing the traversal output.
- Use the recursive C++ algorithm as the core implementation.
- Use queue-based level-order traversal.
- Ensure the visual diagram represents the actual parent-child relationships.
- Support repeated mirror operations correctly.
- Do not invent a binary search tree when the user requests a general binary tree.
- Do not sort the node values.
- Do not reverse the input array as a substitute for mirroring.
- Do not claim that the C++ algorithm is being executed if the frontend only runs a separate JavaScript implementation.

## 11. Project Structure

Organize the project clearly. A suggested structure is:

```text
mirrortree/
├── src/
│   ├── components/
│   │   ├── TreeInput.tsx
│   │   ├── TreeVisualization.tsx
│   │   ├── TraversalDisplay.tsx
│   │   └── AlgorithmExplanation.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── cpp/
│   └── mirror_tree.cpp
├── public/
├── package.json
├── README.md
└── agents.md
```

Adjust the structure if the existing project already has an established layout. Do not overwrite working files unnecessarily.

## 12. Testing Requirements

Test the application with the following cases.

### Test Case 1: Complete Binary Tree

Input:
`1, 2, 3, 4, 5, 6, 7`

Expected original traversal:
`1 2 3 4 5 6 7`

Expected mirrored traversal:
`1 3 2 7 6 5 4`

### Test Case 2: Single Node

Input:
`10`

Expected original traversal:
`10`

Expected mirrored traversal:
`10`

### Test Case 3: Left-Skewed Tree

Input:
`1, 2, null, 3`

Expected original traversal:
`1 2 3`

Expected mirrored traversal:
`1 null 2 null 3`

The application should omit null placeholders from the displayed level-order traversal, producing:

`1 2 3`

The diagram should show the original tree leaning left and the mirrored tree leaning right.

### Test Case 4: Empty Tree

Verify that an empty tree does not crash the application and that an appropriate message is displayed.

### Test Case 5: Repeated Mirroring

Mirror the same tree twice.

The resulting structure must match the original structure.

### Test Case 6: Duplicate Values

Input:
`1, 2, 2, 3, 4`

Verify that duplicate values are handled correctly and that the structure is mirrored by swapping child pointers.

## 13. README Requirements

Create a README containing:

- Project title and overview.
- Problem statement.
- Objectives.
- Features.
- Technology stack.
- Explanation of the recursive algorithm.
- Time and space complexity.
- Project structure.
- Installation and execution instructions.
- Sample input and output.
- Testing scenarios.

Keep the README appropriate for a Second Year BTech CSE project.

## 14. Execution Instructions for the Coding Agent

Follow this order:

1. Inspect the existing project files.
2. Identify the framework and existing dependencies.
3. Set up the project only if necessary.
4. Implement and test the C++ mirror algorithm.
5. Implement level-order tree construction and traversal.
6. Build the tree visualization components.
7. Connect the frontend to the actual C++ implementation.
8. Implement the comparison view and controls.
9. Apply styling and responsive design.
10. Test the required cases.
11. Write the README with accurate setup instructions.

Do not stop after generating a static UI mockup.

Deliver a working application with functional buttons, correct recursive mirroring, accurate visualizations, and clear instructions for running the project.

If any feature fails, fix the issue before declaring the project complete.