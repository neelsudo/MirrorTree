# MirrorTree — Interactive Binary Tree Visualizer

An interactive Data Structures & Algorithms educational platform demonstrating how recursion transforms a binary tree into its mirror image by swapping left and right pointers at every node.

Designed and implemented for **Second Year BTech Computer Science & Engineering (DSA Lab Practical)**.

---

## 1. Problem Statement

Given the root of a binary tree, recursively swap the left and right children of every node in the tree to create its mirror image. The original tree structure must be compared side-by-side with the mirrored tree, displaying both diagrams and their respective queue-based level order traversals without mutating the original tree.

---

## 2. Objectives

- **Visual Understanding:** Bridge the gap between abstract recursive pointer manipulation and visual representation.
- **Side-by-Side Comparison:** Display the original binary tree and mirrored binary tree simultaneously without destroying the original comparison view.
- **Queue-Based Traversal:** Display both flat and level-by-level level order traversals for both trees.
- **Real C++ Algorithm Execution:** Run the true recursive C++ algorithm via native compilation and WebAssembly (Wasm) rather than mocking in JavaScript.
- **Interactive Educational Exploration:** Walk through the 6 recursive execution steps with synchronized code line highlighting.

---

## 3. Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (Dark Slate & Navy theme `#0B1020` with Cyan `#22D3EE` & Indigo `#6366F1` accents)
- **Icons:** Lucide React
- **Tree Visualization:** Dynamic SVG with in-order coordinate allocation and level depth spacing
- **Core Algorithm:** C++ (`cpp/mirror_tree.cpp`)
- **Integration Layer:** Native Linux C++ executable (`g++ 11.4`) via Vite server middleware + WebAssembly module (`mirror_tree.wasm`) via WASI SDK Clang 16

---

## 4. Explanation of the Recursive Mirror Algorithm

The core recursive algorithm visits each node, swaps its left and right pointers using a temporary pointer, and recursively invokes itself on both child subtrees until reaching the base case:

```cpp
Node* mirrorTree(Node* root) {
    // Step 1: Base Case
    if (root == NULL) {
        return NULL;
    }

    // Step 2 & 3 & 4: Pointer Swapping
    Node* temp = root->left;
    root->left = root->right;
    root->right = temp;

    // Step 5: Recursive Subtree Processing
    mirrorTree(root->left);
    mirrorTree(root->right);

    // Step 6: Return Root
    return root;
}
```

### Step-by-Step Breakdown

1. **Base Case Check:** If `root == NULL`, return `NULL`.
2. **Save Left Pointer:** Store `root->left` in `Node* temp`.
3. **Move Right to Left:** Assign `root->left = root->right`.
4. **Complete the Swap:** Assign `root->right = temp`.
5. **Recursively Process Subtrees:** Mirror the newly assigned left subtree, then the right subtree.
6. **Return the Root:** Return the current `root` pointer to the parent caller.

---

## 5. Algorithm Complexity

| Metric | Complexity | Explanation |
|---|---|---|
| **Time Complexity** | **$O(n)$** | Every node in the binary tree is visited exactly once. At each node, pointer swapping takes $O(1)$ constant time. |
| **Auxiliary Space Complexity** | **$O(h)$** | Proportional to tree height $h$ due to recursive call stack frames. For balanced trees, $h = O(\log n)$; for skewed trees, $h = O(n)$. |

---

## 6. Project Structure

```text
361/
├── cpp/
│   ├── mirror_tree.cpp       # Core recursive C++ mirror algorithm & tests
│   └── Makefile              # C++ native & WebAssembly build script
├── public/
│   └── mirror_tree.wasm      # Compiled WebAssembly binary module
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Navigation header with C++ engine status
│   │   ├── TreeInput.tsx          # Level-order input, presets, and controls
│   │   ├── TreeVisualization.tsx  # SVG tree diagram canvas with zoom
│   │   ├── TreeComparison.tsx     # Side-by-side original vs mirrored comparison
│   │   ├── TraversalDisplay.tsx   # Level order sequence & grouped levels
│   │   ├── RecursionExplorer.tsx  # 6-step code highlighter & stepper
│   │   ├── ComplexityCards.tsx    # O(n) and O(h) complexity cards
│   │   └── Footer.tsx             # Academic project footer
│   ├── utils/
│   │   └── treeLayout.ts     # In-order coordinate allocation layout engine
│   ├── api.ts                # API client connecting frontend to C++ / WASM
│   ├── types.ts              # TypeScript interfaces for nodes and trees
│   ├── App.tsx               # Main application controller
│   ├── main.tsx              # React DOM mounting
│   └── index.css             # Tailwind CSS tokens & transition classes
├── index.html                # HTML template with Google Fonts (Inter & JetBrains Mono)
├── package.json              # NPM dependencies & scripts
├── tailwind.config.js        # Design specification colors & typography
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite server & C++ native middleware plugin
├── README.md                 # Complete documentation
├── DESIGN.md                 # UI design specifications
└── AGENTS.md                 # Project requirements and testing criteria
```

---

## 7. Installation and Execution Instructions

### Prerequisites
- Node.js (v18 or v20 LTS)
- C++ Compiler (`g++` on Linux/macOS)

### 1. Build the C++ Algorithm
To compile the native C++ binary and run the built-in unit test suite:
```bash
cd cpp
make
./mirror_tree --test
cd ..
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 4. Build for Production
```bash
npm run build
```

---

## 8. Sample Input and Output

### Example 1: Complete Binary Tree
- **Input:** `1, 2, 3, 4, 5, 6, 7`
- **Original Traversal:** `1 2 3 4 5 6 7`
- **Mirrored Traversal:** `1 3 2 7 6 5 4`

```text
Original Tree:            Mirrored Tree:
        1                         1
       / \                       / \
      2   3                     3   2
     / \ / \                   / \ / \
    4  5 6  7                 7  6 5  4
```

### Example 2: Left-Skewed Tree
- **Input:** `1, 2, null, 3`
- **Original Traversal:** `1 2 3`
- **Mirrored Traversal:** `1 2 3` (leans right with right children)

---

## 9. Testing Scenarios & Verification

| Test Scenario | Input | Expected Original | Expected Mirrored | Result |
|---|---|---|---|---|
| Complete Binary Tree | `1, 2, 3, 4, 5, 6, 7` | `1 2 3 4 5 6 7` | `1 3 2 7 6 5 4` | **PASSED** |
| Single Node | `10` | `10` | `10` | **PASSED** |
| Left-Skewed Tree | `1, 2, null, 3` | `1 2 3` | `1 2 3` (leans right) | **PASSED** |
| Empty Tree | `""` | Empty Tree message | Empty Tree message | **PASSED** |
| Duplicate Values | `1, 2, 2, 3, 4` | `1 2 2 3 4` | `1 2 2 4 3` | **PASSED** |
| Invalid Input | `1, abc, 3` | Error message displayed | No crash | **PASSED** |
| Repeated Mirroring | Any tree | Preserves Original | Toggles between mirrored & original | **PASSED** |

---

## 10. Educational Value

This project provides BTech CSE students with:
1. Clear visualization of pointer exchange in memory.
2. Demonstration of how post-order / recursive tree modification propagates up the call stack.
3. Queue-based level-order traversal mechanics using FIFO queues.
4. Real-world integration of high-performance C++ code with modern web interfaces.
