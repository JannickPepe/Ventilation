/** localStorage key for access token (not persisted for 5 days; refresh token used to get new one). */
export const AUTH_ACCESS_TOKEN_KEY = 'huso_access_token'
/** localStorage key for refresh token (5-day expiry). */
export const AUTH_REFRESH_TOKEN_KEY = 'huso_refresh_token'
/** localStorage key for user JSON. */
export const AUTH_USER_KEY = 'huso_user'
/** localStorage key for access token expiry timestamp (ms). */
export const AUTH_EXPIRES_AT_KEY = 'huso_expires_at'
/** localStorage key for login/register form pre-fill (email only; never password). */
export const AUTH_FORM_KEY = 'huso_auth_form'
