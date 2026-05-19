import type { ReactNode } from 'react'
import { navItems } from '../routes'
import type { RouteKey } from '../types'

interface ShellProps {
  children: ReactNode
  route: RouteKey
  onNavigate: (route: RouteKey) => void
}

export function Shell({ children, route, onNavigate }: ShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">F</span>
          <div>
            <strong>Projeto Fintech React</strong>
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
