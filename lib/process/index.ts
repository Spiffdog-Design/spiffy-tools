/**
 * Creates a debounced function that delays invoking the provided function until after a specified delay.
 * @param {Function} fn - The function to debounce.
 * @param {number} [delay=500] - The number of milliseconds to delay.
 * @returns {(...args: any[]) => void} A debounced version of the provided function.
 * @example
 * const debouncedLog = debounce(console.log, 1000);
 * debouncedLog('Hello'); // Logs 'Hello' after 1 second
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
