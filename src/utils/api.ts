import type { Gasto, Meta, Receita, Usuario } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: nao foi possivel concluir a operacao.`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const usuarioApi = {
  listar: () => apiRequest<Usuario[]>('/usuarios'),
  buscarPorEmail: (email: string) =>
    apiRequest<Usuario>(`/usuarios/email/${encodeURIComponent(email)}`),
  criar: (usuario: Usuario) =>
    apiRequest<Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(usuario) }),
  atualizar: (id: number, usuario: Usuario) =>
    apiRequest<Usuario>(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(usuario) }),
  deletar: (id: number) => apiRequest<void>(`/usuarios/${id}`, { method: 'DELETE' }),
}

export const gastoApi = {
  listar: () => apiRequest<Gasto[]>('/gastos'),
  criar: (gasto: Gasto) =>
    apiRequest<Gasto>('/gastos', { method: 'POST', body: JSON.stringify(gasto) }),
  atualizar: (id: number, gasto: Gasto) =>
    apiRequest<Gasto>(`/gastos/${id}`, { method: 'PUT', body: JSON.stringify(gasto) }),
  deletar: (id: number) => apiRequest<void>(`/gastos/${id}`, { method: 'DELETE' }),
}

export const receitaApi = {
  listar: () => apiRequest<Receita[]>('/receitas'),
  criar: (receita: Receita) =>
    apiRequest<Receita>('/receitas', { method: 'POST', body: JSON.stringify(receita) }),
  atualizar: (id: number, receita: Receita) =>
    apiRequest<Receita>(`/receitas/${id}`, { method: 'PUT', body: JSON.stringify(receita) }),
  deletar: (id: number) => apiRequest<void>(`/receitas/${id}`, { method: 'DELETE' }),
}

export const metaApi = {
  listar: () => apiRequest<Meta[]>('/metas'),
  criar: (meta: Meta) =>
    apiRequest<Meta>('/metas', { method: 'POST', body: JSON.stringify(meta) }),
  atualizar: (id: number, meta: Meta) =>
    apiRequest<Meta>(`/metas/${id}`, { method: 'PUT', body: JSON.stringify(meta) }),
  deletar: (id: number) => apiRequest<void>(`/metas/${id}`, { method: 'DELETE' }),
}
