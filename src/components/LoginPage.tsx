import { useState } from 'react'
import type { FormEvent } from 'react'

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
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
