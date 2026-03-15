import {
  isEmail,
  isUrl,
  minLength,
  maxLength,
  required
} from '@/utils/validation'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { z } from 'zod'

export const validationHelpers = {
  isEmail,
  isUrl,
  minLength,
  maxLength,
  required
}

export function useValidation() {
  return validationHelpers
}

export function useValidationField(name: string, schema?: z.ZodType) {
  if (schema) {
    return useField(name, toTypedSchema(schema))
  }
  return useField(name)
}

export function useValidationForm<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const validationSchema = toTypedSchema(schema)
  return useForm({
    validationSchema
  })
}
