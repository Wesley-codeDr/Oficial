
import { describe, it, expect } from 'vitest'
import { fastDeepClone } from '../../lib/utils/deep-clone'

describe('fastDeepClone', () => {
  it('should clone primitives', () => {
    expect(fastDeepClone(1)).toBe(1)
    expect(fastDeepClone('string')).toBe('string')
    expect(fastDeepClone(true)).toBe(true)
    expect(fastDeepClone(null)).toBe(null)
    expect(fastDeepClone(undefined)).toBe(undefined)
  })

  it('should clone arrays', () => {
    const arr = [1, 2, 3]
    const cloned = fastDeepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
  })

  it('should clone objects', () => {
    const obj = { a: 1, b: 'string' }
    const cloned = fastDeepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
  })

  it('should clone nested objects', () => {
    const obj = { a: { b: { c: 1 } } }
    const cloned = fastDeepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.a).not.toBe(obj.a)
    expect(cloned.a.b).not.toBe(obj.a.b)
  })

  it('should clone nested arrays', () => {
    const obj = { a: [1, 2, [3, 4]] }
    const cloned = fastDeepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.a).not.toBe(obj.a)
    expect(cloned.a[2]).not.toBe(obj.a[2])
  })
})
