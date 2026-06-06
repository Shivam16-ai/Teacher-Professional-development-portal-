import { FC, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout, getUser } from '../utils/auth'

const navLinks = [
  { to:'/dashboard',     label:'Dashboard',    icon:'fas fa-home' },
  { to:'/courses',       label:'Courses',      icon:'fas fa-book' },
  { to:'/quizzes',       label:'Quizzes',      icon:'fas fa-brain' },
  { to:'/timetable',     label:'Timetable',    icon:'fas fa-calendar' },
  { to:'/analytics',     label:'Analytics',    icon:'fas fa-chart-bar' },
  { to:'/reports',       label:'Reports',      icon:'fas fa-file-alt' },
  { to:'/jobs',          label:'Jobs',         icon:'fas fa-briefcase' },
  { to:'/interview',     label:'Interview',    icon:'fas fa-user-tie' },
  { to:'/resume-builder',label:'Resume',       icon:'fas fa-file-alt' },
  { to:'/leaderboard',   label:'Leaderboard',  icon:'fas fa-trophy' },
  { to:'/live-chat',     label:'Chat',         icon:'fas fa-comments' },
  { to:'/chatbot',       label:'AI Bot',       icon:'fas fa-robot' },
  { to:'/notifications', label:'Alerts',       icon:'fas fa-bell' },
  { to:'/profile',       label:'Profile',      icon:'fas fa-user' },
  { to:'/contact',       label:'Contact',      icon:'fas fa-envelope' },
]

const Navigation: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const currentUser = getUser()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/images/logo/logo.svg" alt="TPDP Logo" style={{ width: '32px', height: '32px' }} />
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
            TP<span>DP</span>
          </span>
        </Link>
      </div>

      <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.to}>
            <Link to={link.to} className={isActive(link.to) ? 'active' : ''}>
              <i className={link.icon}></i> {link.label}
            </Link>
          </li>
        ))}
        {currentUser && (
          <li>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        )}
      </ul>

      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
      </button>
    </nav>
  )
}

export default Navigation
