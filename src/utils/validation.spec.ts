import { describe, it, expect } from 'vitest'
import { isEmail, isUrl, minLength, maxLength, required } from '@/utils/validation'

describe('validation utils', () => {
  describe('isEmail', () => {
    it('returns true for valid emails', () => {
      expect(isEmail('a@b.co')).toBe(true)
      expect(isEmail('user@example.com')).toBe(true)
    })
    it('returns false for invalid emails', () => {
      expect(isEmail('invalid')).toBe(false)
      expect(isEmail('@nodomain.com')).toBe(false)
      expect(isEmail('noatsign.com')).toBe(false)
    })
  })

  describe('isUrl', () => {
    it('returns true for valid URLs', () => {
      expect(isUrl('https://example.com')).toBe(true)
      expect(isUrl('http://localhost:3000')).toBe(true)
    })
    it('returns false for invalid URLs', () => {
      expect(isUrl('not-a-url')).toBe(false)
      expect(isUrl('')).toBe(false)
    })
  })

  describe('minLength', () => {
    it('returns true when length >= n', () => {
      expect(minLength('hello', 3)).toBe(true)
      expect(minLength([1, 2, 3], 3)).toBe(true)
    })
    it('returns false when length < n', () => {
      expect(minLength('hi', 5)).toBe(false)
    })
  })

  describe('maxLength', () => {
    it('returns true when length <= n', () => {
      expect(maxLength('hi', 5)).toBe(true)
    })
    it('returns false when length > n', () => {
      expect(maxLength('hello world', 5)).toBe(false)
    })
  })

  describe('required', () => {
    it('returns false for null/undefined', () => {
      expect(required(null)).toBe(false)
      expect(required(undefined)).toBe(false)
    })
    it('returns false for empty string', () => {
      expect(required('')).toBe(false)
      expect(required('   ')).toBe(false)
    })
    it('returns true for non-empty values', () => {
      expect(required('hello')).toBe(true)
      expect(required(0)).toBe(true)
      expect(required([1])).toBe(true)
    })
  })
})
