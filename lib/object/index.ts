/**
 * Recursively freezes an object and all of its nested objects.
 * This function makes the entire object graph immutable.
 *
 * @param {T} obj - The object to be deeply frozen.
 * @returns {Readonly<T>} The same object that was passed in, now deeply frozen.
 *
 * @example
 * const myObject = { a: 1, b: { c: 2, d: { e: 3 } } };
 * const frozenObject = deepFreeze(myObject);
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  // Retrieve the property names defined on obj
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = (obj as any)[name];

    // If value is an object, deep freeze it
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}
