import { apiClient } from '../client'
import type { AxiosInstance } from 'axios'

export interface ResourceApi<T = unknown> {
  getAll: () => Promise<T[]>
  getOne: (id: string | number) => Promise<T>
  create: (data: Partial<T>) => Promise<T>
  update: (id: string | number, data: Partial<T>) => Promise<T>
  delete: (id: string | number) => Promise<void>
}

export function createResourceApi<T = unknown>(
  resourceName: string,
  client: AxiosInstance = apiClient
): ResourceApi<T> {
  const base = `/${resourceName}`
  return {
    getAll: () => client.get(base).then((r) => r.data),
    getOne: (id) => client.get(`${base}/${id}`).then((r) => r.data),
    create: (data) => client.post(base, data).then((r) => r.data),
    update: (id, data) => client.patch(`${base}/${id}`, data).then((r) => r.data),
    delete: (id) => client.delete(`${base}/${id}`).then(() => undefined)
  }
}
