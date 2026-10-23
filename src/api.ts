import { TreeProcessResult } from './types';

// Cache wasm module instance
let wasmInstance: WebAssembly.Instance | null = null;
let wasmInitPromise: Promise<WebAssembly.Instance | null> | null = null;

async function getWasmInstance(): Promise<WebAssembly.Instance | null> {
  if (wasmInstance) return wasmInstance;
  if (wasmInitPromise) return wasmInitPromise;

  wasmInitPromise = (async () => {
    try {
      const response = await fetch('/mirror_tree.wasm');
      if (!response.ok) return null;
      const buffer = await response.arrayBuffer();

      // Lightweight WASI stubs for the WebAssembly reactor
      const wasiShim = new Proxy({}, {
        get: () => (..._args: any[]) => 0
      });

      const { instance } = await WebAssembly.instantiate(buffer, {
        wasi_snapshot_preview1: wasiShim,
        env: {}
      });

      const exports = instance.exports as any;
      if (exports._initialize) {
        exports._initialize();
      }

      wasmInstance = instance;
      return instance;
    } catch (e) {
      console.warn('WASM initialization skipped or failed:', e);
      return null;
    }
  })();

  return wasmInitPromise;
}

/**
 * Execute the C++ Mirror Tree algorithm.
 * First tries native C++ backend (`/api/mirror`), then WebAssembly (`mirror_tree.wasm`).
 */
export async function processTreeWithCpp(input: string, forceEngine?: 'native' | 'wasm'): Promise<TreeProcessResult> {
  // If wasm is explicitly requested or native fails:
  if (forceEngine === 'wasm') {
    const wasm = await getWasmInstance();
    if (wasm) {
      try {
        const exports = wasm.exports as any;
        const encoder = new TextEncoder();
        const inputBytes = encoder.encode((input || '') + '\0');
        const ptr = exports.malloc(inputBytes.length);
        new Uint8Array(exports.memory.buffer).set(inputBytes, ptr);

        const startTime = performance.now();
        const resPtr = exports.wasmProcessTree(ptr);
        const duration = (performance.now() - startTime).toFixed(2);

        const mem = new Uint8Array(exports.memory.buffer);
        let end = resPtr;
        while (mem[end] !== 0) end++;
        const decoder = new TextDecoder();
        const jsonStr = decoder.decode(mem.subarray(resPtr, end));
        exports.free(ptr);

        const parsed = JSON.parse(jsonStr);
        return {
          ...parsed,
          engine: 'WebAssembly (clang++ compiled C++)',
          executionTimeMs: duration
        };
      } catch (err: any) {
        console.warn('WASM execution error, falling back:', err);
      }
    }
  }

  // Native C++ Execution via local endpoint
  try {
    const res = await fetch('/api/mirror', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // If native fetch is unavailable (e.g. static preview), try wasm
    console.warn('Native endpoint unavailable, falling back to WebAssembly:', err);
  }

  // Fallback to WASM if native fetch failed
  const wasm = await getWasmInstance();
  if (wasm) {
    try {
      const exports = wasm.exports as any;
      const encoder = new TextEncoder();
      const inputBytes = encoder.encode((input || '') + '\0');
      const ptr = exports.malloc(inputBytes.length);
      new Uint8Array(exports.memory.buffer).set(inputBytes, ptr);

      const startTime = performance.now();
      const resPtr = exports.wasmProcessTree(ptr);
      const duration = (performance.now() - startTime).toFixed(2);

      const mem = new Uint8Array(exports.memory.buffer);
      let end = resPtr;
      while (mem[end] !== 0) end++;
      const decoder = new TextDecoder();
      const jsonStr = decoder.decode(mem.subarray(resPtr, end));
      exports.free(ptr);

      const parsed = JSON.parse(jsonStr);
      return {
        ...parsed,
        engine: 'WebAssembly (clang++ compiled C++)',
        executionTimeMs: duration
      };
    } catch (err: any) {
      console.error('WASM fallback failed:', err);
    }
  }

  return {
    success: false,
    error: 'Could not connect to C++ execution engine.',
    nodeCount: 0,
    height: 0,
    originalTraversal: [],
    mirroredTraversal: [],
    originalLevels: [],
    mirroredLevels: [],
    originalTree: null,
    mirroredTree: null,
    recursionSteps: []
  };
}
