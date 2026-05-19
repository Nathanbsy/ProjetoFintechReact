
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { UsuariosPage } from '../pages/UsuariosPage'
import { GastosPage } from '../pages/GastosPage'
import { ReceitasPage } from '../pages/ReceitasPage'
import { MetasPage } from '../pages/MetasPage'

export function Layout() {

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
          <Link to="/" className={`nav-link ${useLocation().pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/usuarios" className={`nav-link ${useLocation().pathname === '/usuarios' ? 'active' : ''}`}>
            Usuarios
          </Link>
          <Link to="/gastos" className={`nav-link ${useLocation().pathname === '/gastos' ? 'active' : ''}`}>
            Gastos
          </Link>
          <Link to="/receitas" className={`nav-link ${useLocation().pathname === '/receitas' ? 'active' : ''}`}>
            Receitas
          </Link>
          <Link to="/metas" className={`nav-link ${useLocation().pathname === '/metas' ? 'active' : ''}`}>
            Metas
          </Link>
          {/* <a href="/">Home</a>
          <a href="/usuarios">Usuarios</a>
          <a href="/gastos">Gastos</a>
          <a href="/receitas">Receitas</a>
          <a href="/metas">Metas</a> */}
          {/* {navItems.map((item) => (
            <button
              className={route === item.key ? 'active' : ''}
              key={item.key}
              onClick={() => onNavigate(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))} */}
        </nav>
      </aside>
     <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/gastos" element={<GastosPage />} />
          <Route path="/receitas" element={<ReceitasPage />} />
          <Route path="/metas" element={<MetasPage />} />
        </Routes>
      </main>
    </div>
  )
}
// import { navItems } from '../routes'

// export function Navbar() {
//   return (
//     <div className="app-shell">
//       <aside className="sidebar">
//         <div className="brand">
//           <span className="brand-mark">F</span>
//           <div>
//             <strong>Projeto Fintech React</strong>
//           </div>
//         </div>

//         <nav>
//           {navItems.map((item) => (
//             <button
//               className={route === item.key ? 'active' : ''}
//               key={item.key}
//               onClick={() => onNavigate(item.key)}
//               type="button"
//             >
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       <main className="content">{children}</main>
//     </div>
//   )
// }
