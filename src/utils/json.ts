export function safeParse<T = unknown>(str: string, fallback: T): T {
  try {
    const parsed = JSON.parse(str) as T
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function safeStringify(value: unknown, fallback = '{}'): string {
  try {
    return JSON.stringify(value)
  } catch {
    return fallback
  }
}

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
