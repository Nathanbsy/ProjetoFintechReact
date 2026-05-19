import type { RouteKey } from './types'

export const routes: Record<RouteKey, string> = {
  home: '/',
  usuarios: '/usuarios',
  gastos: '/gastos',
  receitas: '/receitas',
  metas: '/metas',
  'not-found': '/404',
}

export const navItems: Array<{ key: RouteKey; label: string }> = [
  { key: 'home', label: 'Inicio' },
  { key: 'usuarios', label: 'Usuarios' },
  { key: 'gastos', label: 'Gastos' },
  { key: 'receitas', label: 'Receitas' },
  { key: 'metas', label: 'Metas' },
]

export function getRouteFromPath(pathname: string): RouteKey {
  const match = Object.entries(routes).find(([, path]) => path === pathname)
  return match?.[0] as RouteKey | undefined ?? 'not-found'
}
