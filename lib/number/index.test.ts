import { describe, it, expect } from 'vitest';
import { parseNumber } from '../number'; // Adjust the import path as necessary

describe('number tests', () => {
  describe('parseNumber', () => {
    it('should handle numbers without separators', () => {
      expect(parseNumber('123456')).toBeCloseTo(123456);
    });

    it('should return null for malformed numbers with misplaced separators', () => {
      expect(parseNumber('1,23,4.56')).toBeNull();
    });

    it('should return null for numbers with incorrect group separator usage', () => {
      expect(parseNumber('12,34.56')).toBeNull();
    });

    it('should return null for numbers with mixed separators', () => {
      expect(parseNumber('1.234,56')).toBeNull();
    });

    it('should parse a number string with standard separators', () => {
      expect(parseNumber('1,234.56')).toBeCloseTo(1234.56);
    });

    it('should return null for invalid number strings', () => {
      expect(parseNumber('invalid')).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(parseNumber('')).toBeNull();
    });
  });
});
