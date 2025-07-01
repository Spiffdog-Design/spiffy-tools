import { isNullOrEmpty } from '../string';

/**
 * Parses a number string formatted in the en-US locale (commas for thousands and periods for decimals).
 * Returns a number if the string is correctly formatted, otherwise returns null.
 *
 * @param {string} value - The number string to parse.
 * @returns {number | null} - The parsed number or null if the string is malformed.
 *
 * @example
 * parseNumberUS('1,234.56'); // Returns 1234.56
 * parseNumberUS('123456');   // Returns 123456
 * parseNumberUS('1,234.');   // Returns null (invalid format)
 * parseNumberUS('12,34.56'); // Returns null (incorrect group separator usage)
 * parseNumberUS('invalid');  // Returns null (non-numeric string)
 */
export function parseNumber(value: string): number | null {
  if (isNullOrEmpty(value)) return null;
  if (!isNaN(Number(value))) return Number(value);

  // Define the regular expression for matching a valid en-US formatted number
  const usNumberPattern = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/;

  // Check if the number string matches the en-US number format
  if (!usNumberPattern.test(value)) {
    return null;
  }

  try {
    // Remove commas and parse the number
    const sanitizedNumberString = value.replace(/,/g, '');
    const parsed = parseFloat(sanitizedNumberString);
    return isNaN(parsed) ? null : parsed;
  } catch {
    return null;
  }
}
