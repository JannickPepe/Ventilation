import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { z } from 'zod'

export function useFormHandler<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const validationSchema = toTypedSchema(schema)
  return useForm({ validationSchema })
}
