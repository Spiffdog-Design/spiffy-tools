/**
 * Flattens an array and removes duplicate elements.
 *
 * @param arr - The array to flatten.
 * @returns A new array that is flattened and contains unique elements.
 */
export function flattenArray(arr: unknown[] | unknown | null | undefined): unknown[] {
  if (!Array.isArray(arr)) {
    return arr != null ? [arr] : [];
  }
  return Array.from(new Set(arr.flat(Number.POSITIVE_INFINITY)));
}

/**
 * Recursively collects all keys from an object, including nested objects.
 *
 * @param obj - The object to extract keys from.
 * @returns An array of keys.
 */
export function flattenKeys(obj: unknown): string[] {
  if (obj == null || typeof obj !== 'object') {
    return [];
  }
  const record = obj as Record<string, unknown>;
  return Object.keys(record).reduce<string[]>((acc, key) => {
    const val = record[key];
    const next = typeof val === 'object' && val !== null ? acc.concat(flattenKeys(val)) : acc;
    next.push(key);
    return next;
  }, []);
}

/**
 * Recursively collects all values from an object, including nested objects.
 *
 * @param obj - The object to extract values from.
 * @returns An array of values.
 */
export function flattenValues(obj: unknown): unknown[] {
  if (obj == null || typeof obj !== 'object') {
    return [];
  }
  const record = obj as Record<string, unknown>;
  return Object.keys(record).reduce<unknown[]>((acc, key) => {
    const val = record[key];
    const next =
      typeof val === 'object' && val !== null ? acc.concat(flattenValues(val)) : acc.concat([val]);
    return next;
  }, []);
}

/**
 * Checks if an array is not null, is an array, and has entries.
 *
 * @param arr - The array to check.
 * @returns True if the array has entries, false otherwise.
 */
export function hasEntries(arr: unknown[] | unknown | null | undefined): boolean {
  return arr != null && Array.isArray(arr) && arr.length > 0;
}

/**
 * Sorts a copy of an array of objects based on a specified key without mutating the original array.
 *
 * @param arr - The array of objects to sort.
 * @param key - The key to sort the objects by.
 * @returns A new sorted array.
 */
export function sort<T extends Record<string, unknown>>(arr: T[], key: keyof T): T[] {
  // Create a shallow copy of the array to avoid mutating the original array
  const arrCopy = [...(arr ?? [])];

  return arrCopy.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0; // a and b are equal
  });
}

/**
 * Creates a comparator function for sorting objects by a specified property.
 * Attempts to sort numerically first, then falls back to string sorting.
 *
 * @template T - The type of objects in the array to be sorted.
 * @param {keyof T} sortBy - The property key to sort the objects by.
 * @returns {(a: T, b: T) => number} A comparator function that can be used with array sort methods.
 *
 * @example
 * const array = [{ id: 2, value: '10' }, { id: 1, value: '2' }];
 * array.sort(sorter('value'));
 * // Result: [{ id: 1, value: '2' }, { id: 2, value: '10' }]
 */
export const sorter =
  <T>(sortBy: keyof T) =>
  (a: T, b: T): number => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Attempt to parse both values as numbers
    const aNum = Number.parseFloat(aValue as unknown as string);
    const bNum = Number.parseFloat(bValue as unknown as string);

    // Check if both values are valid numbers
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      if (aNum < bNum) return -1;
      if (aNum > bNum) return 1;
      return 0;
    }

    // Fallback to string comparison
    const aStr = String(aValue);
    const bStr = String(bValue);

    if (aStr < bStr) return -1;
    if (aStr > bStr) return 1;
    return 0;
  };
