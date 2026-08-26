import { toast } from 'sonner'
import { apiFetch, triggerUnauthorized } from './apiClient'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  const fullPath = normalizedPath.startsWith('/api/v1')
    ? `${baseUrl.replace(/\/api\/v1$/, '')}${normalizedPath}`
    : `${baseUrl}${normalizedPath}`

  if (!params) return fullPath

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `${fullPath}?${queryString}` : fullPath
}

async function parseResponseData<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T
  }
  return (await response.text()) as unknown as T
}

function notifyErrorByStatus(status: number, message?: string) {
  if (status === 401) {
    triggerUnauthorized()
    return
  }

  if (status === 403) {
    toast.error(message || 'Acesso não autorizado.')
    return
  }

  if (status === 404) {
    toast.error(message || 'Recurso não encontrado.')
    return
  }

  if (status === 409) {
    toast.error(message || 'Conflito nos dados informados.')
    return
  }

  if (status === 422 || status === 400) {
    toast.error(message || 'Dados de requisição inválidos.')
    return
  }

  if (status >= 500) {
    toast.error('Erro interno do servidor. Tente novamente.')
    return
  }

  toast.error(message || 'Erro na comunicação com o servidor.')
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await parseResponseData<T>(response)

  if (!response.ok) {
    const errorMsg =
      typeof data === 'object' && data !== null
        ? (data as Record<string, unknown>).mensagem ||
          (data as Record<string, unknown>).message ||
          (data as Record<string, unknown>).error
        : undefined

    notifyErrorByStatus(response.status, typeof errorMsg === 'string' ? errorMsg : undefined)
    throw new Error(typeof errorMsg === 'string' ? errorMsg : `HTTP ${response.status}`)
  }

  return data
}

export async function withMock<T>(realCall: () => Promise<T>, mockData: T): Promise<T> {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true' || import.meta.env.VITE_USE_MOCKS === true
  if (useMocks) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 300)
    })
  }
  return realCall()
}

export async function get<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined | null>
): Promise<T> {
  try {
    const url = buildUrl(path, params)
    const response = await apiFetch(url, { method: 'GET' })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export async function post<T>(path: string, body?: unknown): Promise<T> {
  try {
    const url = buildUrl(path)
    const response = await apiFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export async function put<T>(path: string, body?: unknown): Promise<T> {
  try {
    const url = buildUrl(path)
    const response = await apiFetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export async function patch<T>(path: string, body?: unknown): Promise<T> {
  try {
    const url = buildUrl(path)
    const response = await apiFetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export async function del<T>(path: string): Promise<T> {
  try {
    const url = buildUrl(path)
    const response = await apiFetch(url, { method: 'DELETE' })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export async function upload<T>(path: string, formData: FormData): Promise<T> {
  try {
    const url = buildUrl(path)
    const response = await apiFetch(url, {
      method: 'POST',
      body: formData,
    })
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('HTTP')) {
      toast.error('Sem conexão com o servidor.')
    }
    throw error
  }
}

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  withMock,
}
