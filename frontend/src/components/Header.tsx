import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand">
          CarRec
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Quiz
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
