/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

// Function to get all TypeScript files excluding test files
function getEntryPoints() {
  return glob.sync('lib/**/*.ts', {
    ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.d.ts'],
  });
}

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: getEntryPoints(),
      fileName: (format, name) => `${name}.${format}.js`,
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: (chunkInfo) => {
            const [folder, ...rest] = chunkInfo.name.split('/');
            const fileName = rest.length > 0 ? rest.join('/') : 'index';
            // Root index -> dist/index.es.js, not dist/index/index.es.js
            if (chunkInfo.name === 'index' || chunkInfo.name === 'lib/index')
              return 'index.es.js';
            return `${folder}/${fileName}.es.js`;
          },
          preserveModules: true,
          preserveModulesRoot: 'lib',
        },
        {
          format: 'cjs',
          entryFileNames: (chunkInfo) => {
            const [folder, ...rest] = chunkInfo.name.split('/');
            const fileName = rest.length > 0 ? rest.join('/') : 'index';
            if (chunkInfo.name === 'index' || chunkInfo.name === 'lib/index')
              return 'index.cjs.js';
            return `${folder}/${fileName}.cjs.js`;
          },
          preserveModules: true,
          preserveModulesRoot: 'lib',
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts({
      exclude: ['**/*.test.ts', '**/*.spec.ts'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
