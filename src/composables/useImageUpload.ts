import { ref, type Ref } from 'vue'
import { apiClient } from '@/api/client'

export type UseImageUploadOptions = {
  uploadEndpoint?: string
  maxSizeBytes?: number
  accept?: string
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const {
    uploadEndpoint = '/upload',
    maxSizeBytes = 5 * 1024 * 1024,
    accept = 'image/*'
  } = options

  const file = ref<File | null>(null) as Ref<File | null>
  const preview = ref<string | null>(null)
  const progress = ref(0)
  const error = ref<string | null>(null)

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement
    const f = input.files?.[0]
    if (!f) return

    if (f.size > maxSizeBytes) {
      error.value = `File too large (max ${Math.round(maxSizeBytes / 1024 / 1024)}MB)`
      return
    }

    file.value = f
    error.value = null
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result as string
    }
    reader.readAsDataURL(f)
  }

  async function upload(): Promise<string | null> {
    if (!file.value) {
      error.value = 'No file selected'
      return null
    }

    progress.value = 0
    error.value = null

    const formData = new FormData()
    formData.append('file', file.value)

    try {
      const res = await apiClient.post(uploadEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) progress.value = Math.round((e.loaded / e.total) * 100)
        }
      })
      progress.value = 100
      return res.data?.url ?? res.data?.path ?? String(res.data)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Upload failed'
      return null
    }
  }

  function reset() {
    file.value = null
    preview.value = null
    progress.value = 0
    error.value = null
  }

  return {
    file,
    preview,
    progress,
    error,
    upload,
    handleFileSelect,
    reset,
    accept,
    maxSizeBytes
  }
}
