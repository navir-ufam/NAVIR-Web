import { api } from './api'

export async function login(email: string, senha: string) {
  return api.post('/auth/login', { email, senha })
}

export async function register(data: Record<string, unknown>) {
  return api.post('/usuarios', data)
}

export const authService = {
  login,
  register,
}
