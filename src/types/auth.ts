/** User object returned by auth API. */
export interface AuthUser {
  id: number
  email: string
}

/** Backend validation errors: field name -> list of messages. */
export type ValidationErrors = Record<string, string[]>

/** Login request body. */
export interface LoginCredentials {
  email: string
  password: string
}

/** Register request body. */
export interface RegisterPayload {
  email: string
  password: string
}

/** Auth API success response (login / register / refresh). */
export interface AuthResponse {
  user: AuthUser
  access_token: string
  refresh_token: string
  expires_in: number
}
