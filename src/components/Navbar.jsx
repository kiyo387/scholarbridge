import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <GraduationCap size={20} />
          </div>
          ScholarBridge
        </Link>
      </div>
    </nav>
  )
}
