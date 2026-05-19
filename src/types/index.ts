export interface Usuario {
  id?: number
  nome: string
  email: string
  telefone: string
}

export interface Gasto {
  id?: number
  descricao: string
  categoria: string
  valor: number
  data: string
  usuarioId: number
}

export interface Receita {
  id?: number
  descricao: string
  origem: string
  valor: number
  data: string
  usuarioId: number
}

export interface Meta {
  id?: number
  titulo: string
  valorAlvo: number
  valorAtual: number
  prazo: string
  usuarioId: number
}

export interface EntityMap {
  usuarios: Usuario
  gastos: Gasto
  receitas: Receita
  metas: Meta
}

export type RouteKey = keyof EntityMap | 'home' | 'not-found'
