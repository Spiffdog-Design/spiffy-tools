/**
 * Flattens an array and removes duplicate elements.
 *
 * @param {any[] | any | null | undefined} arr - The array to flatten.
 * @returns {any[]} A new array that is flattened and contains unique elements.
 */
export function flattenArray(arr: any[] | any | null | undefined): any[] {
  if (!Array.isArray(arr)) {
    return arr != null ? [arr] : [];
  }
  return Array.from(new Set(arr.flat(Infinity)));
}

/**
 * Recursively collects all keys from an object, including nested objects.
 *
 * @param {any} obj - The object to extract keys from.
 * @returns {any[]} An array of keys.
 */
export function flattenKeys(obj: any): any[] {
  if (obj == null || typeof obj !== 'object') {
    return [];
  }
  return Object.keys(obj).reduce<any[]>((acc, key) => {
    const val = obj[key];
    if (typeof val === 'object' && val !== null) {
      acc = acc.concat(flattenKeys(val));
    }
    acc.push(key);
    return acc;
  }, []);
}

/**
 * Recursively collects all values from an object, including nested objects.
 *
 * @param {any | null | undefined} obj - The object to extract values from.
 * @returns {any[]} An array of values.
 */
export function flattenValues(obj: any | null | undefined): any[] {
  if (obj == null || typeof obj !== 'object') {
    return [];
  }
  return Object.keys(obj).reduce<any[]>((acc, key) => {
    const val = obj[key];
    if (typeof val === 'object' && val !== null) {
      acc = acc.concat(flattenValues(val));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

/**
 * Checks if an array is not null, is an array, and has entries.
 *
 * @param {any[] | any | null | undefined} arr - The array to check.
 * @returns {boolean} True if the array has entries, false otherwise.
 */
export function hasEntries(arr: any[] | any | null | undefined): boolean {
  return arr != null && Array.isArray(arr) && arr.length > 0;
}

/**
 * Sorts a copy of an array of objects based on a specified key without mutating the original array.
 *
 * @param {Array<Record<string, any>>} arr - The array of objects to sort.
 * @param {string} [key='default'] - The key to sort the objects by.
 * @returns {Array<Record<string, any>>} - A new sorted array.
 */
export function sort<T extends Record<string, any>>(arr: T[], key: keyof T): T[] {
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
