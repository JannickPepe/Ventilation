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

## Environment

Set `VITE_API_BASE_URL` in `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api
```
