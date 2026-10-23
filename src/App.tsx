import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { TreeInput } from './components/TreeInput';
import { TreeComparison } from './components/TreeComparison';
import { RecursionExplorer } from './components/RecursionExplorer';
import { ComplexityCards } from './components/ComplexityCards';
import { Footer } from './components/Footer';
import { processTreeWithCpp } from './api';
import { TreeProcessResult, TreeNode } from './types';

const DEFAULT_INPUT = '1, 2, 3, 4, 5, 6, 7';

export function App() {
  const [inputVal, setInputVal] = useState<string>(DEFAULT_INPUT);
  const [result, setResult] = useState<TreeProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [mirrorCount, setMirrorCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dynamic tree for Card B (Mirrored Card)
  const [activeMirroredTree, setActiveMirroredTree] = useState<TreeNode | null>(null);
  const [activeMirroredTraversal, setActiveMirroredTraversal] = useState<number[]>([]);
  const [activeMirroredLevels, setActiveMirroredLevels] = useState<number[][]>([]);

  // Function to build/fetch tree from C++ engine
  const handleCreateTree = useCallback(async (customInput?: string) => {
    const textToProcess = (customInput !== undefined ? customInput : inputVal).trim();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsMirrored(false);
    setMirrorCount(0);

    try {
      const res = await processTreeWithCpp(textToProcess);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to process binary tree.');
        setResult(null);
        setActiveMirroredTree(null);
        setActiveMirroredTraversal([]);
        setActiveMirroredLevels([]);
      } else {
        setResult(res);
        // Initially, Card B shows the starting tree or original tree before mirror
        setActiveMirroredTree(res.originalTree);
        setActiveMirroredTraversal(res.originalTraversal);
        setActiveMirroredLevels(res.originalLevels);
        if (res.isEmpty) {
          setSuccessMessage('Empty tree initialized.');
        } else {
          setSuccessMessage(`Tree created with ${res.nodeCount} nodes. Ready to mirror.`);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while creating tree.');
    } finally {
      setIsLoading(false);
    }
  }, [inputVal]);

  // Initial load
  useEffect(() => {
    handleCreateTree(DEFAULT_INPUT);
  }, []);

  // Handle Mirror Tree action (with repeated mirror toggle support)
  const handleMirrorTree = () => {
    if (!result || result.isEmpty) {
      setErrorMessage('Cannot mirror an empty tree. Please enter values first.');
      return;
    }

    setErrorMessage(null);
    const newMirrorCount = mirrorCount + 1;
    setMirrorCount(newMirrorCount);

    // Repeated mirroring toggles between original and mirrored structure
    if (newMirrorCount % 2 === 1) {
      // Mirrored state
      setIsMirrored(true);
      setActiveMirroredTree(result.mirroredTree);
      setActiveMirroredTraversal(result.mirroredTraversal);
      setActiveMirroredLevels(result.mirroredLevels);
      setSuccessMessage('Tree mirrored successfully! Left and right children swapped via C++ recursion.');
    } else {
      // Restored back to original structure
      setIsMirrored(false);
      setActiveMirroredTree(result.originalTree);
      setActiveMirroredTraversal(result.originalTraversal);
      setActiveMirroredLevels(result.originalLevels);
      setSuccessMessage('Tree mirrored again! Swapped back to match the original structure.');
    }
  };

  // Load Example button
  const handleLoadExample = () => {
    setInputVal(DEFAULT_INPUT);
    handleCreateTree(DEFAULT_INPUT);
  };

  // Reset button
  const handleReset = () => {
    setInputVal(DEFAULT_INPUT);
    setErrorMessage(null);
    setSuccessMessage(null);
    handleCreateTree(DEFAULT_INPUT);
  };

  const isEmpty = !result || result.isEmpty || !result.originalTree;

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-textPrimary">
      {/* Top Header */}
      <Header engine={result?.engine} executionTimeMs={result?.executionTimeMs} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-10">
        {/* Introduction Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded-full border border-brand-cyan/20">
              RECURSION · BINARY TREES · LEVEL ORDER
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-textPrimary">
            MirrorTree Visualizer
          </h1>
          <p className="text-sm md:text-base text-textSecondary mt-2 max-w-2xl leading-relaxed">
            Explore how recursion transforms a binary tree by swapping the left and right children of every node. Powered by an actual C++ recursive algorithm.
          </p>
        </div>

        {/* Tree Input and Controls Section */}
        <TreeInput
          inputVal={inputVal}
          setInputVal={setInputVal}
          onCreateTree={() => handleCreateTree()}
          onMirrorTree={handleMirrorTree}
          onLoadExample={handleLoadExample}
          onReset={handleReset}
          errorMessage={errorMessage}
          successMessage={successMessage}
          isMirrored={isMirrored}
          isEmpty={isEmpty}
          isLoading={isLoading}
        />

        {/* Main Tree Visualization Section (Comparison View) */}
        <TreeComparison
          originalTree={result?.originalTree ?? null}
          mirroredTree={activeMirroredTree}
          nodeCount={result?.nodeCount ?? 0}
          height={result?.height ?? 0}
          originalTraversal={result?.originalTraversal ?? []}
          mirroredTraversal={activeMirroredTraversal}
          originalLevels={result?.originalLevels ?? []}
          mirroredLevels={activeMirroredLevels}
          isMirrored={isMirrored}
        />

        {/* Educational Recursion Explorer */}
        <RecursionExplorer recursionSteps={result?.recursionSteps} />

        {/* Algorithm Complexity Section */}
        <ComplexityCards />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
