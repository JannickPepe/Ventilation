const defaultBase = import.meta.env.BASE_URL ?? ''

export function resolveImageUrl(path: string, baseUrl?: string): string {
  if (!path) return ''
  const base = baseUrl ?? defaultBase
  const baseClean = base.endsWith('/') ? base.slice(0, -1) : base
  const pathClean = path.startsWith('/') ? path : `/${path}`
  return `${baseClean}${pathClean}`
}

export function imageProxy(
  url: string,
  proxyBase?: string
): string {
  if (!url) return ''
  if (proxyBase) {
    return `${proxyBase}?url=${encodeURIComponent(url)}`
  }
  return url
}

export function thumbnail(
  path: string,
  width?: number,
  height?: number,
  baseUrl?: string
): string {
  const full = resolveImageUrl(path, baseUrl)
  if (!width && !height) return full
  const params = new URLSearchParams()
  if (width) params.set('w', String(width))
  if (height) params.set('h', String(height))
  const sep = full.includes('?') ? '&' : '?'
  return `${full}${sep}${params.toString()}`
}
