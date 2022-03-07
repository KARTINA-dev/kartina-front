import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig(() => {
  return {
    publicDir: resolve(process.cwd(), 'public'),
    root: 'src',
    plugins: [
      react(),
      svgr(),
      checker({
        overlay: true,
        eslint: {
          lintCommand: 'eslint --color --ext .js,.ts,.tsx',
        },
        typescript: {
          tsconfigPath: resolve(process.cwd(), 'tsconfig.json'),
        },
      }),
    ],
    build: {
      outDir: resolve(process.cwd(), 'dist'),
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
  };
});
