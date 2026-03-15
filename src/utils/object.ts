export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, k) => {
      if (k in obj) acc[k] = obj[k]
      return acc
    },
    {} as Pick<T, K>
  )
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const set = new Set(keys)
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !set.has(k as K))
  ) as Omit<T, K>
}

export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target }
  for (const source of sources) {
    for (const key of Object.keys(source) as (keyof T)[]) {
      const sv = source[key]
      const tv = result[key]
      if (
        sv !== null &&
        typeof sv === 'object' &&
        !Array.isArray(sv) &&
        tv !== null &&
        typeof tv === 'object' &&
        !Array.isArray(tv)
      ) {
        ;(result as Record<keyof T, unknown>)[key] = deepMerge(
          { ...tv } as object,
          sv as object
        ) as T[keyof T]
      } else if (sv !== undefined) {
        ;(result as Record<keyof T, unknown>)[key] = sv
      }
    }
  }
  return result
}

export function isEmpty(obj: object): boolean {
  if (Array.isArray(obj)) return obj.length === 0
  return Object.keys(obj).length === 0
}

export function keysBy<T extends object, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T> {
  return arr.reduce(
    (acc, item) => {
      acc[String((item as Record<K, unknown>)[key])] = item
      return acc
    },
    {} as Record<string, T>
  )
}
