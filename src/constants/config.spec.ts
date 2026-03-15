import { describe, it, expect } from 'vitest'
import { config } from '@/constants/config'

describe('config', () => {
  it('has appName', () => {
    expect(config.appName).toBe('Huso')
  })

  it('has apiBaseUrl', () => {
    expect(typeof config.apiBaseUrl).toBe('string')
  })
})
