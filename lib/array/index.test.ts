import { describe, it, expect } from 'vitest';
import { flattenArray, flattenKeys, flattenValues, hasEntries } from '../array';

describe('flattenArray', () => {
  it('should remove duplicates from an array', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const expected = [1, 2, 3, 4, 5];
    expect(flattenArray(input)).toEqual(expected);
  });

  it('should return an empty array when given an empty array', () => {
    const input: any[] = [];
    const expected: any[] = [];
    expect(flattenArray(input)).toEqual(expected);
  });

  it('should handle arrays with different types', () => {
    const input = [1, '1', 1, '1', true, false, true];
    const expected = [1, '1', true, false];
    expect(flattenArray(input)).toEqual(expected);
  });
});

describe('flattenKeys', () => {
  it('should return all keys from a nested object', () => {
    const input = { a: 1, b: { c: 2, d: { e: 3 } } };
    const expected = ['a', 'c', 'e'];
    expect(flattenKeys(input)).toEqual(expected);
  });

  it('should return an empty array for an empty object', () => {
    const input = {};
    const expected: any[] = [];
    expect(flattenKeys(input)).toEqual(expected);
  });

  it('should handle objects with non-object values', () => {
    const input = { a: 1, b: 'string', c: true };
    const expected = ['a', 'b', 'c'];
    expect(flattenKeys(input)).toEqual(expected);
  });
});

describe('flattenValues', () => {
  it('should return all values from a nested object', () => {
    const input = { a: 1, b: { c: 2, d: { e: 3 } } };
    const expected = [1, 2, 3];
    expect(flattenValues(input)).toEqual(expected);
  });

  it('should return an empty array for an empty object', () => {
    const input = {};
    const expected: any[] = [];
    expect(flattenValues(input)).toEqual(expected);
  });

  it('should handle objects with non-object values', () => {
    const input = { a: 1, b: 'string', c: true };
    const expected = [1, 'string', true];
    expect(flattenValues(input)).toEqual(expected);
  });
});

describe('hasEntries', () => {
  it('should return true for a non-empty array', () => {
    const input = [1, 2, 3];
    expect(hasEntries(input)).toBe(true);
  });

  it('should return false for an empty array', () => {
    const input: any[] = [];
    expect(hasEntries(input)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(hasEntries(null)).toBe(false);
    expect(hasEntries(undefined)).toBe(false);
  });

  it('should return false for non-array types', () => {
    expect(hasEntries({})).toBe(false);
    expect(hasEntries('string')).toBe(false);
    expect(hasEntries(123)).toBe(false);
  });
});
