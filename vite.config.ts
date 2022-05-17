import { resolve, resolve as resolvePath } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import inject from '@rollup/plugin-inject';

const getGlobalEnvConfig = (mode: string) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    IS_PROD: mode === 'mainnet',
    FLOW_ACCESS_URL: JSON.stringify(env.FLOW_ACCESS_URL),
    DISCOVERY_WALLET: JSON.stringify(env.DISCOVERY_WALLET),
    FUNGIBLE_TOKEN_ADDRESS: env.FUNGIBLE_TOKEN_ADDRESS,
    NONFUNGIBLE_TOKEN_ADDRESS: env.NONFUNGIBLE_TOKEN_ADDRESS,
    FLOW_TOKEN_ADDRESS: env.FLOW_TOKEN_ADDRESS,
    METADATA_ADDRESS: env.METADATA_ADDRESS,
    STOREFRONT_ADDRESS: env.STOREFRONT_ADDRESS,
    KARTINAITEMS_ADDRESS: env.KARTINAITEMS_ADDRESS,
  };
};
export default defineConfig(({ mode }) => {
  const defineConfig = getGlobalEnvConfig(mode);

  return {
    publicDir: resolvePath(process.cwd(), 'public'),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
        'react/jsx-runtime': 'react/jsx-runtime.js',
        stream: 'vite-compatible-readable-stream',
        zlib: 'browserify-zlib',
        util: 'util',
        http: 'stream-http',
        https: 'https-browserify',
        process: 'process/browser',
      },
    },
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
          tsconfigPath: resolvePath(process.cwd(), 'tsconfig.json'),
        },
      }),
    ],
    build: {
      outDir: resolvePath(process.cwd(), 'dist'),
      rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
    },
    server: {
      proxy: {
        '^/backend': {
          target: 'http://localhost:3001',
          xfwd: true,
          rewrite: (path) => path.replace(/^\/backend/, ''),
          headers: {
            'x-forwarded-prefix': '/backend',
          },
          changeOrigin: true,
        },
      },
    },
    define: defineConfig,
  };
});
