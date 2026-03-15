import { safeParse, safeStringify } from './json'

export type SerializeOptions = {
  spaces?: number
}

export function serialize<T>(value: T, options: SerializeOptions = {}): string {
  const { spaces } = options
  try {
    return JSON.stringify(value, null, spaces)
  } catch {
    return safeStringify(value)
  }
}

export function deserialize<T>(str: string, fallback?: T): T {
  return safeParse<T>(str, fallback as T)
}
