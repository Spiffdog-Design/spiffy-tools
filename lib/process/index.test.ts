import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../process';

describe('process tests', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call the function after the specified delay', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(150);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls if invoked again within the delay', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(150);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass the correct arguments to the debounced function', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2');
      vi.advanceTimersByTime(150);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should cancel pending invocation when cancel is called', () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn.cancel();
      vi.advanceTimersByTime(150);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
