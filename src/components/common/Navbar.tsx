import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, Clapperboard } from 'lucide-react'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass max-w-[1200px] mx-4 sm:mx-auto mt-4 px-3 py-2.5 flex items-center justify-between rounded-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#c8ff00' }}>
            <Clapperboard className="w-4 h-4" style={{ color: '#0a0a0a' }} />
          </div>
          <span className="text-text-primary hidden sm:block" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>
            Movie Info App
          </span>
        </Link>

        <div className="flex items-center gap-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full inline-flex items-center gap-2 ${
                isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
              }`
            }
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full inline-flex items-center gap-2 ${
                isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
              }`
            }
          >
            <Heart className="w-3.5 h-3.5" />
            Favorites
          </NavLink>
        </div>
      </nav>
    </motion.div>
  )
}

export default Navbar
