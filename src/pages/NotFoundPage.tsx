import type { RouteKey } from '../types'

interface NotFoundPageProps {
  onNavigate: (route: RouteKey) => void
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section className="page-stack not-found">
      <span className="eyebrow">404</span>
      <h1>Pagina nao encontrada</h1>
      <p>A rota acessada nao existe nesta SPA.</p>
      <button onClick={() => onNavigate('home')} type="button">
        Voltar ao inicio
      </button>
    </section>
  )
}
