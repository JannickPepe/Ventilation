export function unique<T>(arr: T[], key?: keyof T | ((item: T) => unknown)): T[] {
  const seen = new Set<unknown>()
  return arr.filter((item) => {
    const k = key
      ? typeof key === 'function'
        ? key(item)
        : item[key]
      : item
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(
        typeof key === 'function' ? key(item) : (item as Record<string, unknown>)[key as string]
      )
      if (!acc[k]) acc[k] = []
      acc[k].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )
}

export function sortBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string | number | boolean)
): T[] {
  return [...arr].sort((a, b) => {
    const va: string | number | boolean = typeof key === 'function' ? key(a) : (a as Record<string, unknown>)[key as string] as string | number | boolean
    const vb: string | number | boolean = typeof key === 'function' ? key(b) : (b as Record<string, unknown>)[key as string] as string | number | boolean
    if (va < vb) return -1
    if (va > vb) return 1
    return 0
  })
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function flatten<T>(arr: (T | T[])[], depth = 1): T[] {
  return arr.flat(depth) as T[]
}

export function pickFrom<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((item) => item[key])
}
