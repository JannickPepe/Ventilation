export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isUrl(value: string): boolean {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function minLength(value: string | unknown[], length: number): boolean {
  return (value?.length ?? 0) >= length
}

export function maxLength(value: string | unknown[], length: number): boolean {
  return (value?.length ?? 0) <= length
}

export function required(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}
