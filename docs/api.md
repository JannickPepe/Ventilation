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

## Environment

Set `VITE_API_BASE_URL` in `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```
