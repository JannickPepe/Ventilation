# API Documentation

## Overview

The API layer is split into two parts:

1. **api/** – HTTP client and resource factories
2. **services/** – Business logic that uses the API client

## API Client

**File:** `src/api/client.ts`

- Axios instance with `baseURL` from `VITE_API_BASE_URL` (default: `/api`)
- Request/response interceptors
- Centralized error handling via `handleError` from `@/core/errorHandler`
- Customize with `setErrorHandler` (see [data-handling.md](./data-handling.md))

```ts
import { apiClient } from '@/api/client'

const response = await apiClient.get('/users')
```

## Resource API Factory

**File:** `src/api/resources/base.ts`

`createResourceApi<T>(resourceName, client?)` returns a CRUD interface for a REST resource.

| Method   | HTTP  | Path        |
|----------|-------|-------------|
| getAll   | GET   | `/{resource}` |
| getOne   | GET   | `/{resource}/{id}` |
| create   | POST  | `/{resource}` |
| update   | PATCH | `/{resource}/{id}` |
| delete   | DELETE| `/{resource}/{id}` |

### Example

```ts
import { createResourceApi } from '@/api/resources/base'

interface User {
  id: number
  name: string
}

const userApi = createResourceApi<User>('users')

const users = await userApi.getAll()
const user = await userApi.getOne(1)
const created = await userApi.create({ name: 'Jane' })
await userApi.update(1, { name: 'Jane Doe' })
await userApi.delete(1)
```

### ResourceApi Interface

```ts
interface ResourceApi<T> {
  getAll: () => Promise<T[]>
  getOne: (id: string | number) => Promise<T>
  create: (data: Partial<T>) => Promise<T>
  update: (id: string | number, data: Partial<T>) => Promise<T>
  delete: (id: string | number) => Promise<void>
}
```

## Services

**File:** `src/services/baseService.ts`

`BaseService` provides:

- `this.client` – the API client
- `createResourceApi<T>(resourceName)` – factory for resource APIs

Extend `BaseService` for domain-specific services:

```ts
import { BaseService } from '@/services/baseService'

class UserService extends BaseService {
  private api = this.createResourceApi<User>('users')

  async getUsers() {
    return this.api.getAll()
  }
}
```

## Convention: new API = new store resource

When you add a new API endpoint that the frontend consumes:

1. Add the API function in **api/** (e.g. `api/faq.ts`).
2. Create a **Pinia store** that fetches via that API and holds state (e.g. `stores/faqStore.ts`). The store performs the request; **do not fetch inside the UI component**.
3. Optionally add a **composable** (e.g. `useFaq()`) that exposes store state and a method to ensure data is loaded; the **view** (or a parent) calls that method so the component only reads from the store.

## FAQ API

**Endpoint:** `GET /api/faq?locale=en`

Returns `{ items: FaqItem[] }` where each item has `id`, `question`, `answer`. Data is stored in the backend at `data/faq/{locale}.json`. The frontend uses `useFaqStore()` and fetches from the view (e.g. `HomeView`); the FAQ organism only reads from the store.

## Auth API

Authentication is JWT-based. The backend is the **source of truth for validation**; it returns validation errors in a consistent shape so the client can display them (e.g. via the ErrorMessage component).

**Endpoints:**

- **POST /api/auth/register** – Body: `{ email, password }`. Validates email (presence, format) and password (presence, min 8 chars). On validation error: **422** with `{ errors: { "email": ["..."], "password": ["..."] } }`. On success: **201** with `{ user: { id, email }, access_token, refresh_token, expires_in }`.
- **POST /api/auth/login** – Body: `{ email, password }`. Validates presence. On invalid credentials: **401** with `{ error: "Invalid email or password" }`. On success: **200** with same shape as register.
- **POST /api/auth/refresh** – Body: `{ refresh_token }`. Returns new `access_token`, `refresh_token`, and `expires_in` (or **401** if token invalid/expired).

**Token behaviour:** Access token is short-lived (1 hour); refresh token lasts 5 days. The API client adds `Authorization: Bearer <access_token>` to requests. On **401**, the client tries refresh; if refresh fails, it clears auth and redirects to login. Login/register form data (email only, never password) can be persisted in localStorage for pre-fill; see `utils/authFormStorage.ts`.

**Frontend:** `api/auth.ts` exposes `login`, `register`, `refresh`, and `getValidationErrors`. The auth store (`stores/authStore.ts`) holds token/user state and calls these; views trigger login/register from the store and display backend errors via `setErrors` and the ErrorMessage component.

## Environment

Set `VITE_API_BASE_URL` in `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```
