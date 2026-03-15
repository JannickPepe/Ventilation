export type DateInput = Date | string | number

function toDate(d: DateInput): Date {
  if (d instanceof Date) return d
  const parsed = new Date(d)
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid date: ${d}`)
  return parsed
}

export function formatDate(
  date: DateInput,
  locale = 'en-GB',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
): string {
  return toDate(date).toLocaleDateString(locale, options)
}

export function parseDate(str: string): Date | null {
  const d = new Date(str)
  return Number.isNaN(d.getTime()) ? null : d
}

export function addDays(date: DateInput, days: number): Date {
  const d = toDate(date)
  const result = new Date(d)
  result.setDate(result.getDate() + days)
  return result
}

export function isBetween(date: DateInput, start: DateInput, end: DateInput): boolean {
  const t = toDate(date).getTime()
  const s = toDate(start).getTime()
  const e = toDate(end).getTime()
  return t >= s && t <= e
}

export function startOfDay(date: DateInput): Date {
  const d = toDate(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfDay(date: DateInput): Date {
  const d = toDate(date)
  d.setHours(23, 59, 59, 999)
  return d
}
