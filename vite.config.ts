/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// import { peerDependencies } from './package.json';

export default defineConfig({
  build: {
    copyPublicDir: false, // Disables copying the public directory to the output directory.
    target: 'esnext',
    lib: {
      entry: './lib/index.ts', // Specifies the entry point for building the library.
      fileName: (format, name) => `${name}.js`, // Generates the output file name based on the format.
      formats: ['es'], // Specifies the output formats (ES modules).
    },
    rollupOptions: {
      external: (id) => id.endsWith('.test.ts'),
      // external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
      // output: {
      //   preserveModules: true,
      // },
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
