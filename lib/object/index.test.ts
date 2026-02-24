import { describe, expect, it } from 'vitest';

// Assuming deepFreeze is imported from the module where it's defined
import { deepFreeze } from '.';

describe('deepFreeze', () => {
  it('should freeze a simple object', () => {
    const obj = { a: 1, b: 2 };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(() => {
      (frozenObj as Record<string, number>).a = 3;
    }).toThrow();
  });

  it('should deep freeze nested objects', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.b)).toBe(true);
    expect(Object.isFrozen(frozenObj.b.d)).toBe(true);

    expect(() => {
      (frozenObj.b as unknown as Record<string, number>).c = 4;
    }).toThrow();
  });

  it('should handle arrays within objects', () => {
    const obj = {
      a: [1, 2, 3],
      b: {
        c: [4, 5, 6],
      },
    };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj.a)).toBe(true);
    expect(Object.isFrozen(frozenObj.b.c)).toBe(true);

    expect(() => {
      (frozenObj.a as number[])[0] = 10;
    }).toThrow();
  });

  it('should return the same object instance', () => {
    const obj = { a: 1 };
    const frozenObj = deepFreeze(obj);

    expect(frozenObj).toBe(obj);
  });

  it('should handle non-object values gracefully', () => {
    const num = 42;
    const frozenNum = deepFreeze(num as unknown as object);

    expect(frozenNum).toBe(42);
  });
});
