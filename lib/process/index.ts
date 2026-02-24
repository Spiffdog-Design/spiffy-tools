export interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

/**
 * Creates a debounced function that delays invoking the provided function until after a specified delay.
 * @param {Function} fn - The function to debounce.
 * @param {number} [delay=500] - The number of milliseconds to delay.
 * @returns A debounced version of the provided function with a `cancel` method to cancel pending invocations.
 * @example
 * const debouncedLog = debounce(console.log, 1000);
 * debouncedLog('Hello'); // Logs 'Hello' after 1 second
 * debouncedLog.cancel(); // Cancels the pending log
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 500,
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = (): void => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };

  return debounced as DebouncedFunction<T>;
}
