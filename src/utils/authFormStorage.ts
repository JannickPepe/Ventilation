import { AUTH_FORM_KEY } from '@/constants/authStorage'

/** Stored form data for login/register pre-fill. Password is never stored. */
export interface StoredAuthForm {
  email?: string
}

export function getStoredAuthForm(): StoredAuthForm {
  try {
    const raw = localStorage.getItem(AUTH_FORM_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const email = (parsed as { email?: string }).email
      return { email: typeof email === 'string' ? email : undefined }
    }
  } catch {
    // ignore
  }
  return {}
}

export function setStoredAuthForm(data: StoredAuthForm): void {
  try {
    const toStore = { email: data.email ?? '' }
    localStorage.setItem(AUTH_FORM_KEY, JSON.stringify(toStore))
  } catch {
    // ignore
  }
}
