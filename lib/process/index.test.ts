import { describe, it, expect, vi } from 'vitest';
import { debounce } from '../process'; // Adjust the import path as necessary

describe('process tests', () => {
  describe('debounce', () => {
    it('should call the function after the specified delay', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls if invoked again within the delay', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass the correct arguments to the debounced function', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');
      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });
});
