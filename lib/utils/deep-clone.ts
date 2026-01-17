/**
 * Deeply clones a plain object or array.
 * This is significantly faster than JSON.parse(JSON.stringify(obj)) for small objects
 * and avoids the overhead of structuredClone for simple use cases.
 *
 * @note This function is optimized for JSON-serializable objects (primitives, arrays, plain objects).
 * It does NOT handle special types like Date, RegExp, Map, Set, etc. correctly (they may be cloned as empty objects).
 * Use `structuredClone` if you need to support those types.
 *
 * @param obj The object to clone
 * @returns A deep copy of the object
 */
export function fastDeepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => fastDeepClone(item)) as unknown as T
  }

  const newObj = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = fastDeepClone(obj[key])
    }
  }

  return newObj
}
