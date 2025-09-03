/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to get all TypeScript files excluding test files
function getEntryPoints() {
  return glob.sync('lib/**/*.ts', {
    ignore: ['**/*.test.ts', '**/**.d.ts'],
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
  plugins: [dts()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
