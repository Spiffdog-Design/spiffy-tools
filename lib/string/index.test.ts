import { describe, expect, it } from 'vitest';
import { contains, isNotNullOrEmpty, isNullOrEmpty, padEnd, padStart } from '../string';

describe('string tests', () => {
  describe('contains', () => {
    it('should return true if the value contains the search string', () => {
      expect(contains('hello world', 'world')).toBe(true);
    });

    it('should return false if the value does not contain the search string', () => {
      expect(contains('hello world', 'planet')).toBe(false);
    });

    it('should return false if the value is null', () => {
      expect(contains(null, 'world')).toBe(false);
    });

    it('should return false if the value is an empty string', () => {
      expect(contains('', 'world')).toBe(false);
    });
  });

  describe('padEnd', () => {
    it('should pad the end of the string with spaces', () => {
      expect(padEnd('hello', 10, ' ')).toBe('hello     ');
    });

    it('should pad the end of the string with zeros', () => {
      expect(padEnd('123', 5, '0')).toBe('12300');
    });

    it('should return the original string if target length is less than string length', () => {
      expect(padEnd('hello', 3, ' ')).toBe('hello');
    });
  });

  describe('padStart', () => {
    it('should pad the start of the string with spaces', () => {
      expect(padStart('hello', 10, ' ')).toBe('     hello');
    });

    it('should pad the start of the string with zeros', () => {
      expect(padStart('123', 5, '0')).toBe('00123');
    });

    it('should return the original string if target length is less than string length', () => {
      expect(padStart('hello', 3, ' ')).toBe('hello');
    });
  });

  describe('isNotNullOrEmpty', () => {
    it('should return true for non-empty string', () => {
      expect(isNotNullOrEmpty('hello')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isNotNullOrEmpty('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isNotNullOrEmpty(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isNotNullOrEmpty(undefined)).toBe(false);
    });
  });

  describe('isNullOrEmpty', () => {
    it('should return true for null', () => {
      expect(isNullOrEmpty(null)).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isNullOrEmpty('')).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(isNullOrEmpty('hello')).toBe(false);
    });

    it('should return true for undefined', () => {
      expect(isNullOrEmpty(undefined)).toBe(true);
    });
  });
});
