import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, Clapperboard, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="glass max-w-[1200px] mx-3 sm:mx-4 md:mx-auto mt-3 sm:mt-4 px-3 py-2.5 flex items-center justify-between rounded-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#c8ff00' }}>
            <Clapperboard className="w-4 h-4" style={{ color: '#0a0a0a' }} />
          </div>
          <span className="text-text-primary hidden md:block" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>
            Movie Info App
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden max-w-[1200px] mx-3 sm:mx-4 mt-2 rounded-2xl glass overflow-hidden"
          >
            <div className="p-2 flex flex-col" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl inline-flex items-center gap-3 ${
                    isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/search"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl inline-flex items-center gap-3 ${
                    isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
                  }`
                }
              >
                <Search className="w-4 h-4" />
                Search
              </NavLink>

              <NavLink
                to="/favorites"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl inline-flex items-center gap-3 ${
                    isActive ? 'nav-active' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.06]'
                  }`
                }
              >
                <Heart className="w-4 h-4" />
                Favorites
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar
