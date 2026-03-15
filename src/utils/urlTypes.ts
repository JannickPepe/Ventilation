export function getQueryParam(url: string | URL, name: string): string | null {
  const u = typeof url === 'string' ? new URL(url, window.location.origin) : url
  return u.searchParams.get(name)
}

export function setQueryParam(
  url: string,
  name: string,
  value: string | null
): string {
  const u = new URL(url, window.location.origin)
  if (value === null) {
    u.searchParams.delete(name)
  } else {
    u.searchParams.set(name, value)
  }
  return u.toString()
}

export function parseUrlType<T extends Record<string, string>>(
  url: string | URL,
  keys: (keyof T)[]
): Partial<T> {
  const u = typeof url === 'string' ? new URL(url, window.location.origin) : url
  return keys.reduce(
    (acc, k) => {
      const v = u.searchParams.get(String(k))
      if (v != null) (acc as Record<string, string>)[String(k)] = v
      return acc
    },
    {} as Partial<T>
  )
}

export function buildUrlFromParams(
  base: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const u = new URL(base, window.location.origin)
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') {
      u.searchParams.set(k, String(v))
    }
  }
  return u.toString()
}
