export function formatTime(
  date: Date | string | number,
  locale = 'en-GB',
  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
): string {
  const d = typeof date === 'object' && 'getTime' in date ? date : new Date(date)
  return d.toLocaleTimeString(locale, options)
}

export function parseTime(str: string): Date | null {
  const d = new Date(`1970-01-01T${str}`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function toMilliseconds(hours: number, minutes = 0, seconds = 0): number {
  return (hours * 3600 + minutes * 60 + seconds) * 1000
}

export function fromMilliseconds(ms: number): { hours: number; minutes: number; seconds: number } {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds }
}
