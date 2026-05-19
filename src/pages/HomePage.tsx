import { navItems } from '../routes'
import type { RouteKey } from '../types'
import { PageHeader } from '../components/PageHeader'

interface HomePageProps {
  onNavigate: (route: RouteKey) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const summary = [
    ['4', 'Controllers REST'],
    ['3+', 'Entidades JPA'],
    ['CRUD', 'Frontend conectado'],
  ]

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Dashboard"
        title="Controle financeiro pessoal"
        description="A aplicacao organiza usuarios, gastos, receitas e metas com telas de cadastro, consulta, atualizacao e remocao consumindo APIs REST do backend."
      />

      <div className="metric-grid">
        {summary.map(([value, label]) => (
          <article className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className="quick-actions">
        {navItems.slice(1).map((item) => (
          <button key={item.key} onClick={() => onNavigate(item.key)} type="button">
            Abrir {item.label}
          </button>
        ))}
      </div>
    </section>
  )
}
