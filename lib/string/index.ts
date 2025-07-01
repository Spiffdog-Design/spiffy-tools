/**
 * Checks if a value contains a search string.
 * @param {string | null} value - The value to be checked, which will be converted to a string.
 * @param {string} search - The search string to look for within the value.
 * @returns {boolean} True if the search string is found within the value, false otherwise.
 * @example
 * contains('hello world', 'world'); // true
 * contains(null, 'world'); // false
 */
export function contains(value: string | null, search: string): boolean {
  return isNullOrEmpty(value) ? false : String(value).indexOf(search) >= 0;
}

/**
 * Pads the end of a string with a specified pad string until the target length is reached.
 * @param {any} value - The value to be padded, which will be converted to a string.
 * @param {number} targetLength - The length of the resulting string once the current string has been padded.
 * @param {string} padString - The string to pad the current string with.
 * @returns {string} The padded string.
 * @example
 * padEnd('hello', 10, ' '); // 'hello     '
 * padEnd('123', 5, '0'); // '12300'
 */
export function padEnd(value: string, targetLength: number, padString: string): string {
  return String(value).padEnd(targetLength, padString);
}

/**
 * Pads the start of a string with a specified pad string until the target length is reached.
 * @param {any} value - The value to be padded, which will be converted to a string.
 * @param {number} targetLength - The length of the resulting string once the current string has been padded.
 * @param {string} padString - The string to pad the current string with.
 * @returns {string} The padded string.
 * @example
 * padStart('hello', 10, ' '); // '     hello'
 * padStart('123', 5, '0'); // '00123'
 */
export function padStart(value: string, targetLength: number, padString: string): string {
  return String(value).padStart(targetLength, padString);
}

/**
 * Checks if a value is not null or empty.
 * @param {any} value - The value to be checked.
 * @returns {boolean} True if the value is not null or empty, false otherwise.
 * @example
 * isNotNullOrEmpty('hello'); // true
 * isNotNullOrEmpty(''); // false
 */
export function isNotNullOrEmpty(value: any): boolean {
  return !isNullOrEmpty(value);
}

/**
 * Checks if a value is null or empty.
 * @param {any} value - The value to be checked.
 * @returns {boolean} True if the value is null or empty, false otherwise.
 * @example
 * isNullOrEmpty(null); // true
 * isNullOrEmpty(''); // true
 * isNullOrEmpty('hello'); // false
 */
export function isNullOrEmpty(value: any): boolean {
  return value == null || String(value).trim() === '';
}
