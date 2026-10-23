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

      // WASI syscall stubs for the WebAssembly reactor
      // In wasi-libc, __wasilibc_populate_preopens calls fd_prestat_get(fd, ...) for fds starting from 3.
      // Returning 0 causes it to expect a valid directory prestat. Returning 8 (EBADF - Bad file descriptor)
      // signals the end of preopened file descriptors so initialization completes successfully without calling proc_exit.
      const wasiShim: Record<string, any> = {
        fd_prestat_get: (_fd: number, _buf: number) => 8, // __WASI_ERRNO_BADF = 8
        fd_prestat_dir_name: (_fd: number, _path: number, _len: number) => 8,
        fd_close: (_fd: number) => 0,
        fd_seek: (_fd: number, _offset_low: number, _offset_high: number, _whence: number, _newOffset: number) => 0,
        fd_write: (_fd: number, _iovs: number, _iovs_len: number, _nwritten: number) => 0,
        fd_read: (_fd: number, _iovs: number, _iovs_len: number, _nread: number) => 0,
        proc_exit: (rval: number) => {
          console.warn('WASI proc_exit called with code:', rval);
        },
        environ_sizes_get: (_count: number, _size: number) => 0,
        environ_get: (_environ: number, _environ_buf: number) => 0,
        clock_time_get: (_id: number, _precision: bigint, _time: number) => 0
      };

      const wasiProxy = new Proxy(wasiShim, {
        get: (target, prop: string) => {
          if (prop in target) return target[prop];
          return (..._args: any[]) => 0;
        }
      });

      const { instance } = await WebAssembly.instantiate(buffer, {
        wasi_snapshot_preview1: wasiProxy,
        env: {}
      });

      const exports = instance.exports as any;
      if (exports._initialize) {
        exports._initialize();
      }

      wasmInstance = instance;
      return instance;
    } catch (e) {
      console.error('WASM initialization failed:', e);
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
