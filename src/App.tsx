import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

type RouteKey = 'home' | 'usuarios' | 'gastos' | 'receitas' | 'metas' | 'not-found'

type EntityKey = 'usuarios' | 'gastos' | 'receitas' | 'metas'

type Usuario = {
  id?: number
  nome: string
  email: string
  telefone: string
}

type Gasto = {
  id?: number
  descricao: string
  categoria: string
  valor: number
  data: string
  usuarioId: number
}

type Receita = {
  id?: number
  descricao: string
  origem: string
  valor: number
  data: string
  usuarioId: number
}

type Meta = {
  id?: number
  titulo: string
  valorAlvo: number
  valorAtual: number
  prazo: string
  usuarioId: number
}

type EntityMap = {
  usuarios: Usuario
  gastos: Gasto
  receitas: Receita
  metas: Meta
}

type Field<T> = {
  key: keyof T
  label: string
  type?: 'text' | 'email' | 'number' | 'date'
}

type EntityConfig<T extends { id?: number }> = {
  title: string
  subtitle: string
  endpoint: string
  emptyItem: T
  fields: Field<T>[]
  columns: Field<T>[]
}

const routes: Record<RouteKey, string> = {
  home: '/',
  usuarios: '/usuarios',
  gastos: '/gastos',
  receitas: '/receitas',
  metas: '/metas',
  'not-found': '/404',
}

const navItems: Array<{ key: RouteKey; label: string }> = [
  { key: 'home', label: 'Inicio' },
  { key: 'usuarios', label: 'Usuarios' },
  { key: 'gastos', label: 'Gastos' },
  { key: 'receitas', label: 'Receitas' },
  { key: 'metas', label: 'Metas' },
]

const entityConfigs: { [K in EntityKey]: EntityConfig<EntityMap[K]> } = {
  usuarios: {
    title: 'Usuarios',
    subtitle: 'Controle os usuarios vinculados as movimentacoes financeiras.',
    endpoint: '/usuarios',
    emptyItem: { nome: '', email: '', telefone: '' },
    fields: [
      { key: 'nome', label: 'Nome' },
      { key: 'email', label: 'E-mail', type: 'email' },
      { key: 'telefone', label: 'Telefone' },
    ],
    columns: [
      { key: 'nome', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'telefone', label: 'Telefone' },
    ],
  },
  gastos: {
    title: 'Gastos',
    subtitle: 'Cadastre despesas por categoria e acompanhe saidas.',
    endpoint: '/gastos',
    emptyItem: {
      descricao: '',
      categoria: '',
      valor: 0,
      data: new Date().toISOString().slice(0, 10),
      usuarioId: 1,
    },
    fields: [
      { key: 'descricao', label: 'Descricao' },
      { key: 'categoria', label: 'Categoria' },
      { key: 'valor', label: 'Valor', type: 'number' },
      { key: 'data', label: 'Data', type: 'date' },
      { key: 'usuarioId', label: 'ID do usuario', type: 'number' },
    ],
    columns: [
      { key: 'descricao', label: 'Descricao' },
      { key: 'categoria', label: 'Categoria' },
      { key: 'valor', label: 'Valor' },
      { key: 'data', label: 'Data' },
      { key: 'usuarioId', label: 'Usuario' },
    ],
  },
  receitas: {
    title: 'Receitas',
    subtitle: 'Registre entradas, origem dos valores e historico mensal.',
    endpoint: '/receitas',
    emptyItem: {
      descricao: '',
      origem: '',
      valor: 0,
      data: new Date().toISOString().slice(0, 10),
      usuarioId: 1,
    },
    fields: [
      { key: 'descricao', label: 'Descricao' },
      { key: 'origem', label: 'Origem' },
      { key: 'valor', label: 'Valor', type: 'number' },
      { key: 'data', label: 'Data', type: 'date' },
      { key: 'usuarioId', label: 'ID do usuario', type: 'number' },
    ],
    columns: [
      { key: 'descricao', label: 'Descricao' },
      { key: 'origem', label: 'Origem' },
      { key: 'valor', label: 'Valor' },
      { key: 'data', label: 'Data' },
      { key: 'usuarioId', label: 'Usuario' },
    ],
  },
  metas: {
    title: 'Metas',
    subtitle: 'Planeje objetivos financeiros e atualize o progresso.',
    endpoint: '/metas',
    emptyItem: {
      titulo: '',
      valorAlvo: 0,
      valorAtual: 0,
      prazo: new Date().toISOString().slice(0, 10),
      usuarioId: 1,
    },
    fields: [
      { key: 'titulo', label: 'Titulo' },
      { key: 'valorAlvo', label: 'Valor alvo', type: 'number' },
      { key: 'valorAtual', label: 'Valor atual', type: 'number' },
      { key: 'prazo', label: 'Prazo', type: 'date' },
      { key: 'usuarioId', label: 'ID do usuario', type: 'number' },
    ],
    columns: [
      { key: 'titulo', label: 'Titulo' },
      { key: 'valorAlvo', label: 'Alvo' },
      { key: 'valorAtual', label: 'Atual' },
      { key: 'prazo', label: 'Prazo' },
      { key: 'usuarioId', label: 'Usuario' },
    ],
  },
}

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

function getRouteFromPath(pathname: string): RouteKey {
  const match = Object.entries(routes).find(([, path]) => path === pathname)
  return match?.[0] as RouteKey | undefined ?? 'not-found'
}

function formatValue(value: unknown) {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return String(value ?? '-')
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [route, setRoute] = useState<RouteKey>(() => getRouteFromPath(window.location.pathname))

  useEffect(() => {
    const onPopState = () => setRoute(getRouteFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(nextRoute: RouteKey) {
    window.history.pushState({}, '', routes[nextRoute])
    setRoute(nextRoute)
  }

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />
  }

  return (
    <Shell route={route} onNavigate={navigate}>
      {route === 'home' && <HomePage onNavigate={navigate} />}
      {route === 'usuarios' && <EntityPage config={entityConfigs.usuarios} />}
      {route === 'gastos' && <EntityPage config={entityConfigs.gastos} />}
      {route === 'receitas' && <EntityPage config={entityConfigs.receitas} />}
      {route === 'metas' && <EntityPage config={entityConfigs.metas} />}
      {route === 'not-found' && <NotFoundPage onNavigate={navigate} />}
    </Shell>
  )
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('aluno@fintech.com')
  const [password, setPassword] = useState('123456')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onLogin()
  }

  return (
    <main className="login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <div>
          <span className="eyebrow">Projeto Fintech</span>
          <h1>Entrar no painel</h1>
          <p>Autenticacao demonstrativa para acessar os testes da aplicacao.</p>
        </div>

        <label>
          E-mail
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </label>

        <label>
          Senha
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </label>

        <button type="submit">Acessar</button>
      </form>
    </main>
  )
}

function Shell({
  children,
  route,
  onNavigate,
}: {
  children: ReactNode
  route: RouteKey
  onNavigate: (route: RouteKey) => void
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">F</span>
          <div>
            <strong>Fintech</strong>
            <small>Spring + React</small>
          </div>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              className={route === item.key ? 'active' : ''}
              key={item.key}
              onClick={() => onNavigate(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  )
}

function HomePage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  const summary = [
    ['4', 'Controllers REST'],
    ['3+', 'Entidades JPA'],
    ['CRUD', 'Frontend conectado'],
  ]

  return (
    <section className="page-stack">
      <header className="page-header">
        <span className="eyebrow">Dashboard</span>
        <h1>Controle financeiro pessoal</h1>
        <p>
          A aplicacao organiza usuarios, gastos, receitas e metas com telas de cadastro,
          consulta, atualizacao e remocao consumindo APIs REST do backend.
        </p>
      </header>

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

function EntityPage<T extends { id?: number }>({ config }: { config: EntityConfig<T> }) {
  const [items, setItems] = useState<T[]>([])
  const [formData, setFormData] = useState<T>(config.emptyItem)
  const [editingId, setEditingId] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const isEditing = editingId !== undefined
  const formTitle = useMemo(() => (isEditing ? 'Atualizar registro' : 'Novo registro'), [isEditing])

  const loadItems = useCallback(async () => {
    setLoading(true)
    setMessage('')
    try {
      const data = await apiRequest<T[]>(config.endpoint)
      setItems(data)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }, [config.endpoint])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadItems()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadItems])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const endpoint = isEditing ? `${config.endpoint}/${editingId}` : config.endpoint
    const method = isEditing ? 'PUT' : 'POST'

    try {
      await apiRequest<T>(endpoint, { method, body: JSON.stringify(formData) })
      setFormData(config.emptyItem)
      setEditingId(undefined)
      setMessage(isEditing ? 'Registro atualizado com sucesso.' : 'Registro criado com sucesso.')
      await loadItems()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await apiRequest<void>(`${config.endpoint}/${id}`, { method: 'DELETE' })
      setMessage('Registro removido com sucesso.')
      await loadItems()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro inesperado.')
    }
  }

  function handleEdit(item: T) {
    setEditingId(item.id)
    setFormData(item)
  }

  function updateField(field: Field<T>, value: string) {
    const nextValue = field.type === 'number' ? Number(value) : value
    setFormData((current) => ({ ...current, [field.key]: nextValue }))
  }

  return (
    <section className="page-stack">
      <header className="page-header">
        <span className="eyebrow">CRUD</span>
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
      </header>

      <section className="work-area">
        <form className="entity-form" onSubmit={handleSubmit}>
          <h2>{formTitle}</h2>
          {config.fields.map((field) => (
            <label key={String(field.key)}>
              {field.label}
              <input
                type={field.type ?? 'text'}
                value={String(formData[field.key] ?? '')}
                onChange={(event) => updateField(field, event.target.value)}
                required
              />
            </label>
          ))}

          <div className="form-actions">
            <button type="submit">{isEditing ? 'Salvar' : 'Criar'}</button>
            {isEditing && (
              <button
                className="ghost"
                onClick={() => {
                  setEditingId(undefined)
                  setFormData(config.emptyItem)
                }}
                type="button"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="table-panel">
          <div className="table-header">
            <h2>Registros</h2>
            <button className="ghost" onClick={loadItems} type="button">
              Atualizar
            </button>
          </div>

          {message && <p className="status-message">{message}</p>}
          {loading && <p className="status-message">Carregando...</p>}

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  {config.columns.map((column) => (
                    <th key={String(column.key)}>{column.label}</th>
                  ))}
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {config.columns.map((column) => (
                      <td key={String(column.key)}>{formatValue(item[column.key])}</td>
                    ))}
                    <td className="row-actions">
                      <button className="ghost" onClick={() => handleEdit(item)} type="button">
                        Editar
                      </button>
                      <button
                        className="danger"
                        onClick={() => item.id && handleDelete(item.id)}
                        type="button"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {!items.length && !loading && (
                  <tr>
                    <td colSpan={config.columns.length + 2}>Nenhum registro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  )
}

function NotFoundPage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
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

export default App
