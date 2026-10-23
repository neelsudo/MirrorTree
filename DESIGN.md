# MirrorTree — UI Design Specification

## 1. Design Overview

**Product Name:** MirrorTree  
**Tagline:** See Recursion in Action.  
**Category:** Interactive Data Structures and Algorithms Visualizer  
**Primary Purpose:** Visually demonstrate how a binary tree is transformed into its mirror image using recursion.

MirrorTree should look like a modern developer tool combined with an educational visualization platform.

The interface should feel polished, minimal, interactive, and technical without looking like a generic admin dashboard.

The binary tree visualization must be the main focus of the application.

### Design Principles

- Visual clarity over decorative elements.
- Minimal interface with a strong visual hierarchy.
- Smooth, meaningful animations.
- Clear differentiation between original and mirrored trees.
- Readable diagrams, code, and traversal output.
- Consistent spacing, typography, and colors.
- Responsive behavior across desktop, tablet, and mobile.

---

## 2. Visual Identity

### Theme

Dark mode with subtle glassmorphism and electric-blue accents.

The background should use a deep navy tone, while cards should have slightly lighter surfaces and restrained borders.

Avoid excessive gradients, neon glows, oversized typography, and unnecessary decorative effects.

### Color Palette

| Design Element | Color | Hex Code |
|---|---|---|
| Main background | Deep Navy | `#0B1020` |
| Secondary background | Dark Blue | `#0F172A` |
| Card background | Slate Navy | `#121A2B` |
| Elevated card | Lighter Slate | `#182338` |
| Primary accent | Indigo | `#6366F1` |
| Secondary accent | Cyan | `#22D3EE` |
| Original tree nodes | Blue | `#60A5FA` |
| Mirrored tree nodes | Cyan | `#22D3EE` |
| Primary text | Off White | `#F1F5F9` |
| Secondary text | Slate Gray | `#94A3B8` |
| Borders | Muted Slate | `#293548` |
| Success state | Green | `#34D399` |
| Error state | Soft Red | `#F87171` |

### Color Usage Rules

- Use `#0B1020` as the primary page background.
- Use `#121A2B` for the main content cards.
- Use indigo for primary actions.
- Use blue for the original tree.
- Use cyan for the mirrored tree.
- Use green only for successful operations.
- Use red only for errors and invalid input.
- Maintain strong text contrast against all backgrounds.

Do not use a different accent color for every component.

---

## 3. Typography

Use **Inter** as the primary font.

Use a monospace font such as **JetBrains Mono** for code snippets, traversal sequences, and technical values.

### Typography Scale

| Element | Font Size | Weight |
|---|---|---|
| Main heading | 30–36 px | 700 |
| Section heading | 20–24 px | 600 |
| Card heading | 16–18 px | 600 |
| Body text | 14–16 px | 400 |
| Supporting text | 12–14 px | 400 |
| Code and traversal | 13–14 px | 400 |
| Small labels | 11–12 px | 500 |

Keep headings concise.

Avoid using large text for every section. The tree diagrams should receive more visual attention than the headings.

---

## 4. Overall Page Layout

Build a single-page application with the following sections:

1. Header
2. Introduction
3. Tree Input and Controls
4. Original and Mirrored Tree Comparison
5. Level Order Traversal
6. Recursion Explorer
7. Algorithm Complexity
8. Footer

Use a centered content container with a maximum width of approximately 1440 px.

Apply consistent horizontal padding and vertical spacing.

On desktop, use a two-column layout for tree comparison.

On mobile, stack the two tree cards vertically.

---

## 5. Header

Create a compact header at the top of the page.

### Left Side

Display:
- A small geometric tree-inspired icon.
- Product name: `MirrorTree`.
- Subtitle or small badge: `DSA LAB`.

The icon can use connected circles or a simple tree-like symbol.

Use Lucide React icons where appropriate.

### Right Side

Display a small status indicator:

`● Interactive Visualizer`

The status indicator should be subtle and should not imply a backend connection or external service.

### Header Styling

- Height: approximately 64–72 px.
- Transparent or slightly darker background.
- Thin bottom border.
- Consistent horizontal padding.
- No unnecessary navigation links.

Keep the header minimal.

---

## 6. Introduction Section

Place the main heading below the header.

### Content

Heading:

**MirrorTree Visualizer**

Subtitle:

Explore how recursion transforms a binary tree by swapping the left and right children of every node.

Add a small label:

`RECURSION · BINARY TREES · LEVEL ORDER`

### Styling

- Align the heading to the left.
- Use off-white text for the heading.
- Use slate-gray text for the subtitle.
- Use a small uppercase label with letter spacing.
- Keep the introduction compact.

Avoid a large marketing-style hero section. This is an interactive educational tool, not a commercial landing page.

---

## 7. Tree Input and Controls

Create a dedicated card for tree input and actions.

### Input Field

Label:

`LEVEL ORDER INPUT`

Placeholder:

`1, 2, 3, 4, 5, 6, 7`

Supporting text:

Enter node values in level-order format. Use `null` to represent a missing child.

The input must support:
- Positive integers.
- Negative integers.
- Zero.
- Duplicate values.
- Explicit `null` placeholders.

Use standard level-order construction for a general binary tree. Do not assume that the input represents a binary search tree.

### Buttons

#### Primary Button: Mirror Tree

Label:

`Mirror Tree`

Icon: `ArrowLeftRight`

Style:
- Indigo background.
- White text.
- Rounded corners.
- Subtle hover state.
- Visible keyboard focus state.

This should be the most prominent action.

#### Secondary Button: Create Tree

Label:

`Create Tree`

Style:
- Dark surface.
- Muted border.
- Off-white text.

#### Secondary Button: Load Example

Label:

`Load Example`

Load the default tree:

```text
        1
       / \
      2   3
     / \ / \
    4  5 6  7
```

#### Secondary Button: Reset

Label:

`Reset`

Icon: `RotateCcw`

Reset the visualization to its initial state.

### Interaction Rules

- Disable Mirror Tree when no valid tree is available.
- Display validation errors next to the input field.
- Show a success message after successful mirroring.
- Do not reload the page when a button is clicked.
- Support keyboard interaction.
- Prevent accidental repeated submissions while an operation is running.

---

## 8. Main Tree Visualization Section

This is the most important section of the entire application.

Display two equally sized cards side by side.

### Card A: Original Tree

Title:

`Original Tree`

Supporting label:

`BEFORE MIRRORING`

Use blue nodes.

Display:
- A binary tree diagram.
- The total number of nodes.
- The height of the tree.
- The level order traversal.

### Card B: Mirrored Tree

Title:

`Mirrored Tree`

Supporting label:

`AFTER MIRRORING`

Use cyan nodes.

Display:
- The mirrored binary tree diagram.
- The total number of nodes.
- The height of the tree.
- The level order traversal.

Both cards must have the same dimensions when practical.

### Tree Diagram Style

Use SVG for rendering the binary tree.

Each node should be a circle containing its numeric value.

Suggested node dimensions:
- Radius: 20–24 px.
- Border width: 1.5–2 px.
- Font size: 14–16 px.
- Font weight: 600.

For edges:
- Use thin slate-colored lines.
- Draw edges behind nodes.
- Connect parent nodes to their actual children.
- Avoid unnecessary curves or decorative connectors.

For the original tree:
- Use blue outlines and subtle blue fills.

For the mirrored tree:
- Use cyan outlines and subtle cyan fills.

The nodes should remain readable against the dark background.

### Automatic Layout

Position nodes according to their actual parent-child relationships.

Requirements:
- The root must be centered above its children.
- Left children must appear on the left.
- Right children must appear on the right.
- Each level must have consistent vertical spacing.
- Sibling nodes must not overlap.
- Edges must connect to the correct nodes.
- Large trees must not be clipped.

Use a tree-layout algorithm or a carefully implemented SVG layout function.

Do not position nodes using fixed coordinates that only work for the seven-node sample tree.

For larger trees, provide horizontal scrolling or another readable layout strategy.

---

## 9. Tree Comparison Behavior

Before mirroring:
- The original card displays the initial tree.
- The mirrored card displays the same initial structure or a clear initial-state placeholder.
- Both traversals remain consistent with their displayed trees.

After clicking Mirror Tree:
- Preserve the original tree.
- Update the mirrored tree.
- Recalculate the mirrored traversal.
- Update the tree height and node count if necessary.
- Keep the original diagram unchanged.

The mirror operation must swap the left and right children recursively.

Do not reverse the input string or traversal array to imitate mirroring.

The mirrored tree must represent the actual mirrored structure.

### Repeated Mirroring

Clicking Mirror Tree repeatedly should toggle the tree between its original and mirrored structures.

After two mirror operations, the structure must match the original tree.

The original comparison card must remain unchanged throughout.

---

## 10. Level Order Traversal Display

Place the traversal output below each tree diagram.

### Example

Original:

`1 → 2 → 3 → 4 → 5 → 6 → 7`

Mirrored:

`1 → 3 → 2 → 7 → 6 → 5 → 4`

Use a monospace font for traversal values.

Display values in small rounded containers or as a simple sequence.

For wider trees, allow the traversal to wrap or scroll horizontally.

Do not allow long sequences to overflow their cards.

### Optional Enhancement

Highlight each level using subtle separators.

For example:

```text
Level 0: 1
Level 1: 2, 3
Level 2: 4, 5, 6, 7
```

Keep the normal traversal visible even when level grouping is enabled.

---

## 11. Mirroring Animation

Add a short, smooth animation when the user performs the mirror operation.

### Animation Sequence

1. The user clicks Mirror Tree.
2. The mirrored tree begins transitioning.
3. Nodes move to their new positions.
4. Edges update to reflect the new connections.
5. The traversal updates.
6. A small success indicator appears.

### Animation Specifications

- Duration: 400–600 ms.
- Easing: ease-in-out.
- Animate node positions and edge changes.
- Avoid excessive scaling, bouncing, or spinning.
- Keep the original tree static.

The animation must reflect a real structural change.

If animation complexity causes rendering problems, prioritize correct tree structure and traversal output.

Respect the user's reduced-motion accessibility preference.

---

## 12. Recursion Explorer

Below the visualization section, add a collapsible card titled:

`How Recursion Works`

Subtitle:

Understand the mirror operation step by step.

### Initial State

Show a short explanation:

The mirror function visits each node, swaps its left and right children, and recursively processes both subtrees.

Provide an `Expand` button.

### Expanded State

Display two columns on desktop.

Left column:
- C++ code snippet.
- Syntax highlighting if practical.
- Monospace font.

Right column:
- Current operation.
- Explanation of the active step.
- Previous and Next buttons.

### Steps

**Step 1: Base Case**

Check whether the current node is `NULL`.

**Step 2: Store the Left Child**

Store the current left child in a temporary pointer.

**Step 3: Swap the Children**

Assign the right child to the left pointer.

**Step 4: Complete the Swap**

Assign the temporary pointer to the right pointer.

**Step 5: Recursive Calls**

Recursively process both subtrees.

**Step 6: Return the Root**

Return the root of the mirrored subtree.

Use subtle highlighting to emphasize the active code line.

Keep this feature educational and simple.

Do not implement a complex call-stack debugger unless specifically required.

---

## 13. Algorithm Complexity Section

Display two small information cards.

### Time Complexity

`O(n)`

Description:

Every node is visited once during mirroring.

### Auxiliary Space Complexity

`O(h)`

Description:

The recursive call stack depends on the height of the tree.

For a balanced tree, the height is approximately logarithmic in the number of nodes.

For a completely skewed tree, the height can be linear.

Use a small icon and concise explanatory text.

Do not turn this section into a large analytics dashboard.

---

## 14. Empty, Loading, and Error States

### Empty Tree

Display:

`No tree to visualize`

Supporting text:

Create a tree or load an example to get started.

### Invalid Input

Display a concise error below the input field.

Example:

`Invalid input. Check your level-order values and try again.`

### Successful Operation

Display:

`Tree mirrored successfully`

Use the success color and a small check icon.

### Large Tree

If the tree is wider than the available space:
- Allow horizontal scrolling.
- Preserve the correct node positions.
- Keep the tree centered when it fits.
- Avoid shrinking nodes until their values become unreadable.

Do not display a permanent loading spinner for local operations that complete immediately.

---

## 15. Footer

Add a minimal footer.

Text:

`MirrorTree · Data Structures & Algorithms`

Secondary text:

`Built to make recursion easier to understand.`

Keep the footer visually quiet.

Do not include unnecessary links or social media icons.

---

## 16. Responsive Design

### Desktop: 1024 px and Above

- Use a centered content container.
- Display both tree cards side by side.
- Keep input controls in a horizontal layout when space allows.
- Display the recursion explorer in two columns.

### Tablet: 768–1023 px

- Maintain two columns if both trees remain readable.
- Reduce outer margins.
- Allow the input controls to wrap.
- Reduce card padding slightly.

### Mobile: Below 768 px

- Stack the original and mirrored cards vertically.
- Stack controls or allow them to wrap.
- Make the input field full-width.
- Ensure buttons remain easy to tap.
- Use horizontally scrollable SVG diagrams for wide trees.
- Stack the recursion explorer columns.
- Prevent page-level horizontal overflow.

Use a minimum interactive target size of approximately 44 × 44 px for primary touch controls.

---

## 17. Accessibility

- Use semantic HTML elements.
- Provide labels for all inputs.
- Maintain sufficient text contrast.
- Provide visible keyboard focus indicators.
- Ensure all buttons have accessible names.
- Do not communicate tree identity through color alone; include clear Original and Mirrored labels.
- Respect reduced-motion preferences.
- Use appropriate ARIA attributes for expandable sections.
- Make error messages understandable to screen readers.
- Ensure all core operations work with a keyboard.

---

## 18. Technical UI Requirements

- Framework: React with TypeScript.
- Styling: Tailwind CSS.
- Icons: Lucide React.
- Visualization: SVG.
- Font: Inter and JetBrains Mono.

Use reusable components:

```text
src/
├── components/
│   ├── Header.tsx
│   ├── TreeInput.tsx
│   ├── TreeVisualization.tsx
│   ├── TreeComparison.tsx
│   ├── TraversalDisplay.tsx
│   ├── RecursionExplorer.tsx
│   └── ComplexityCards.tsx
├── App.tsx
├── main.tsx
└── index.css
```

Adapt this structure to the existing project if files have already been created.

### Implementation Constraints

- Keep the UI separate from tree data structures.
- Preserve the original tree independently.
- Ensure the visualization reflects actual node relationships.
- Avoid unnecessary dependencies.
- Do not use a static image as the tree visualization.
- Do not use placeholder buttons.
- Do not sacrifice correctness for animations.
- Keep the interface functional without requiring user authentication.

The core mirror algorithm must remain in C++ if the project specification requires actual C++ execution.

A standard C++ program cannot execute directly in the browser without an integration layer. Use an appropriate WebAssembly or local backend integration if needed.

Do not claim that the C++ implementation is running when only JavaScript is executing the operation.

---

## 19. Final Quality Checklist

Before considering the UI complete, verify:

- [ ] The interface follows the specified dark theme.
- [ ] The input accepts valid level-order sequences.
- [ ] Invalid input produces a useful error.
- [ ] The original tree is rendered correctly.
- [ ] The mirrored tree has the correct structure.
- [ ] Parent-child edges connect correctly.
- [ ] The original tree remains unchanged.
- [ ] Level order traversal matches each displayed tree.
- [ ] Repeated mirroring works correctly.
- [ ] Reset restores the initial demonstration.
- [ ] The recursion explorer explains the algorithm accurately.
- [ ] Time and auxiliary space complexity are correct.
- [ ] Tree nodes do not overlap on larger examples.
- [ ] The application works on mobile and desktop.
- [ ] Keyboard navigation and reduced-motion preferences are supported.
- [ ] All buttons perform their intended actions.

## 20. Final Design Direction

The finished product should resemble a polished educational developer tool.

Prioritize:

1. Clear binary tree diagrams.
2. An obvious and functional Mirror Tree action.
3. Accurate original-versus-mirrored comparison.
4. Readable traversal results.
5. A concise explanation of recursion.

Keep decorative elements subtle and avoid unnecessary features.

**The tree visualization is the product. Everything else should help users understand it.**