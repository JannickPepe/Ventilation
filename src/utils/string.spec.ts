import { describe, it, expect } from 'vitest'
import { capitalize, slugify, truncate, camelCase } from '@/utils/string'

describe('string utils', () => {
  it('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
  })

  it('slugify', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('  foo  bar  ')).toBe('foo-bar')
  })

  it('truncate', () => {
    expect(truncate('hello world', 8)).toBe('hello...')
    expect(truncate('hi', 10)).toBe('hi')
  })

  it('camelCase', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
  })
})
