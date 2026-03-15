import { apiClient } from '@/api/client'
import type { AxiosInstance } from 'axios'
import type { ResourceApi } from '@/api/resources/base'

export abstract class BaseService {
  protected readonly client: AxiosInstance = apiClient

  protected createResourceApi<T>(resourceName: string): ResourceApi<T> {
    const base = `/${resourceName}`
    return {
      getAll: () => this.client.get(base).then((r) => r.data),
      getOne: (id: string | number) => this.client.get(`${base}/${id}`).then((r) => r.data),
      create: (data: Partial<T>) => this.client.post(base, data).then((r) => r.data),
      update: (id: string | number, data: Partial<T>) =>
        this.client.patch(`${base}/${id}`, data).then((r) => r.data),
      delete: (id: string | number) => this.client.delete(`${base}/${id}`).then(() => undefined)
    }
  }
}
