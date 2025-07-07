/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'lib/index.ts'),
        array: path.resolve(__dirname, 'lib/array/index.ts'),
        date: path.resolve(__dirname, 'lib/date/index.ts'),
        process: path.resolve(__dirname, 'lib/process/index.ts'),
        string: path.resolve(__dirname, 'lib/string/index.ts'),
      },
      fileName: (format, name) => `${name}.js`, // Generates the output file name based on the format.
      formats: ['es'], // Specifies the output formats (ES modules).
    },
    rollupOptions: {
      external: (id) => id.endsWith('.test.ts'),
      output: {
        preserveModules: true, // preserves folder structure for better tree shaking
        preserveModulesRoot: 'lib',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            // Put main entry directly at root as index.[format].js
            return `index.[format].js`;
          }
          // For others, keep the folder structure
          return '[name]/index.[format].js';
        },
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: true, // Clears the output directory before building.
  },
  plugins: [dts()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
