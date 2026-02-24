import * as matchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
declare module 'vitest' {
  // jest-dom matchers: Assertion generic default required by TestingLibraryMatchers
  // biome-ignore lint/suspicious/noExplicitAny: library type definition
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
}
expect.extend(matchers);
