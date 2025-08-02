/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: {
        index: path.resolve(__dirname, 'lib/index.ts'),
        array: path.resolve(__dirname, 'lib/array/index.ts'),
        date: path.resolve(__dirname, 'lib/date/index.ts'),
        process: path.resolve(__dirname, 'lib/process/index.ts'),
        string: path.resolve(__dirname, 'lib/string/index.ts'),
      },
      fileName: (format, name) => `${name}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'lib',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return `index.${chunkInfo.format}.js`;
          }
          return '[name]/index.' + chunkInfo.format + '.js';
        },
      },
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
