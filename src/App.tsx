import { useEffect, useState } from 'react'
import './App.css'
import { LoginPage } from './components/LoginPage'
import { Shell } from './components/Shell'
import { getRouteFromPath, routes } from './routes'
import type { RouteKey } from './types'
import { GastosPage } from './pages/GastosPage'
import { HomePage } from './pages/HomePage'
import { MetasPage } from './pages/MetasPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ReceitasPage } from './pages/ReceitasPage'
import { UsuariosPage } from './pages/UsuariosPage'

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
      {route === 'usuarios' && <UsuariosPage />}
      {route === 'gastos' && <GastosPage />}
      {route === 'receitas' && <ReceitasPage />}
      {route === 'metas' && <MetasPage />}
      {route === 'not-found' && <NotFoundPage onNavigate={navigate} />}
    </Shell>
  )
}

export default App
