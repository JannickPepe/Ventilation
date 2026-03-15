import { describe, it, expect } from 'vitest'
import { useFormLoading } from '@/composables/useFormLoading'

describe('useFormLoading', () => {
  it('starts with isLoading false', () => {
    const { isLoading } = useFormLoading()
    expect(isLoading.value).toBe(false)
  })

  it('startLoading sets isLoading to true', () => {
    const { isLoading, startLoading } = useFormLoading()
    startLoading()
    expect(isLoading.value).toBe(true)
  })

  it('stopLoading sets isLoading to false', () => {
    const { isLoading, startLoading, stopLoading } = useFormLoading()
    startLoading()
    expect(isLoading.value).toBe(true)
    stopLoading()
    expect(isLoading.value).toBe(false)
  })
})
