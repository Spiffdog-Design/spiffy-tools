import { describe, it, expect } from 'vitest';
import { flattenArray, flattenKeys, flattenValues, hasEntries, sort } from '../array';

describe('flattenArray', () => {
  it('should flatten nested arrays and remove duplicates', () => {
    const input = [1, [2, [3, 4]], 5, [1, 2]];
    const expected = [1, 2, 3, 4, 5];
    expect(flattenArray(input)).toEqual(expected);
  });

  it('should handle non-array inputs', () => {
    expect(flattenArray(1)).toEqual([1]);
    expect(flattenArray(null)).toEqual([]);
    expect(flattenArray(undefined)).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(flattenArray([])).toEqual([]);
  });
});

describe('flattenKeys', () => {
  it('should return all keys from a nested object', () => {
    const input = { a: 1, b: { c: 2, d: { e: 3 } } };
    const expected = ['a', 'b', 'c', 'd', 'e'].sort();
    expect(flattenKeys(input).sort()).toEqual(expected);
  });

  it('should handle non-object inputs', () => {
    expect(flattenKeys(null)).toEqual([]);
    expect(flattenKeys(undefined)).toEqual([]);
    expect(flattenKeys(1)).toEqual([]);
  });

  it('should handle empty objects', () => {
    expect(flattenKeys({})).toEqual([]);
  });
});

describe('flattenValues', () => {
  it('should return all values from a nested object', () => {
    const input = { a: 1, b: { c: 2, d: { e: 3 } } };
    const expected = [1, 2, 3];
    expect(flattenValues(input)).toEqual(expected);
  });

  it('should handle non-object inputs', () => {
    expect(flattenValues(null)).toEqual([]);
    expect(flattenValues(undefined)).toEqual([]);
    expect(flattenValues(1)).toEqual([]);
  });

  it('should handle empty objects', () => {
    expect(flattenValues({})).toEqual([]);
  });
});

describe('hasEntries', () => {
  it('should return true for arrays with entries', () => {
    expect(hasEntries([1, 2, 3])).toBe(true);
  });

  it('should return false for empty arrays', () => {
    expect(hasEntries([])).toBe(false);
  });

  it('should return false for non-array inputs', () => {
    expect(hasEntries(null)).toBe(false);
    expect(hasEntries(undefined)).toBe(false);
    expect(hasEntries(1)).toBe(false);
  });
});

describe('sort function', () => {
  it('should sort an array of objects by a specified key', () => {
    const arr = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];

    const sortedByName = sort(arr, 'name');
    expect(sortedByName).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]);

    const sortedByAge = sort(arr, 'age');
    expect(sortedByAge).toEqual([
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 35 },
    ]);
  });

  it('should return an empty array when given an empty array', () => {
    const arr: Array<{ default: number }> = [];
    const sorted = sort(arr, 'default');
    expect(sorted).toEqual([]);
  });

  it('should not modify the original array', () => {
    const arr = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    sort(arr, 'age');
    expect(arr).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ]);
  });
});
