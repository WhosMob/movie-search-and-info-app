import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'

function Layout() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-dark relative">
      <Navbar />
      <main className="flex-1 relative pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
