import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFile } from 'child_process';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'cpp-native-runner',
      configureServer(server) {
        server.middlewares.use('/api/mirror', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const input = parsed.input ?? '1, 2, 3, 4, 5, 6, 7';
                const cppBinary = path.resolve(__dirname, 'cpp/mirror_tree');
                const startTime = performance.now();

                execFile(cppBinary, [input], { timeout: 3000 }, (error, stdout, stderr) => {
                  const durationMs = (performance.now() - startTime).toFixed(2);
                  if (error) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      success: false,
                      error: stderr || error.message,
                      engine: 'C++ Native Execution Failed'
                    }));
                    return;
                  }

                  try {
                    const result = JSON.parse(stdout.trim());
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      ...result,
                      engine: 'C++ (g++ 11.4 native binary)',
                      executionTimeMs: durationMs
                    }));
                  } catch (e) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      success: false,
                      error: 'Failed to parse C++ output: ' + stdout
                    }));
                  }
                });
              } catch (err: any) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});
