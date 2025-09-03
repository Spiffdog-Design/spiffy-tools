import { describe, it, expect } from 'vitest';
import { flattenArray, flattenKeys, flattenValues, hasEntries, sort, sorter } from '.';

describe('array tests', () => {
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

  describe('sorter', () => {
    it('should sort objects by a numeric property', () => {
      const array = [
        { id: 3, name: 'Charlie' },
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      array.sort(sorter('id'));
      expect(array).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]);
    });

    it('should sort objects by a string property', () => {
      const array = [
        { id: 1, name: 'Charlie' },
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Bob' },
      ];
      array.sort(sorter('name'));
      expect(array).toEqual([
        { id: 2, name: 'Alice' },
        { id: 3, name: 'Bob' },
        { id: 1, name: 'Charlie' },
      ]);
    });

    it('should handle an empty array', () => {
      const array: { id: number; name: string }[] = [];
      array.sort(sorter('id'));
      expect(array).toEqual([]);
    });

    it('should handle an array with one element', () => {
      const array = [{ id: 1, name: 'Alice' }];
      array.sort(sorter('id'));
      expect(array).toEqual([{ id: 1, name: 'Alice' }]);
    });

    it('should not modify an already sorted array', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      array.sort(sorter('id'));
      expect(array).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]);
    });

    it('should sort objects with mixed types correctly', () => {
      const array = [
        { id: 1, value: '10' },
        { id: 2, value: 2 },
        { id: 3, value: 'text-string' },
        { id: 4, value: null },
        { id: 5, value: '3' },
      ];
      array.sort(sorter('value'));
      expect(array).toEqual([
        { id: 2, value: 2 },
        { id: 5, value: '3' },
        { id: 1, value: '10' },
        { id: 4, value: null },
        { id: 3, value: 'text-string' },
      ]);
    });
  });
});
