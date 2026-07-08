import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useFavoritesStore from '../stores/useFavoritesStore'
import MovieGrid from '../components/movies/MovieGrid'

function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const [isClearing, setIsClearing] = useState(false)

  function handleClearAll() {
    if (window.confirm('Remove all favorites?')) {
      setIsClearing(true)
      setTimeout(() => {
        favorites.forEach((movie) => removeFavorite(movie.id))
        setIsClearing(false)
      }, 200)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="section-marker">Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-text-primary font-semibold">
            My Favorites
          </h1>
          <p className="text-text-muted text-sm mt-3">
            {favorites.length > 0 ? (
              <>
                <span className="text-accent font-medium">{favorites.length}</span> film{favorites.length !== 1 ? 's' : ''} saved
              </>
            ) : (
              'No favorites yet'
            )}
          </p>
        </div>

        {favorites.length > 0 && (
          <motion.button
            onClick={handleClearAll}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-medium border rounded-full transition-all duration-300 ${
              isClearing
                ? 'border-accent/30 text-accent bg-accent/5'
                : 'border-dark-border text-text-muted hover:text-text-primary hover:border-text-muted'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {favorites.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <MovieGrid movies={favorites} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 border border-dark-border rounded-full flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-text-muted" />
            </div>
            <h2 className="text-xl text-text-primary font-semibold mb-2">
              No favorites yet
            </h2>
            <p className="text-text-muted text-sm max-w-sm mb-8">
              Start exploring movies and click the heart icon to save your favorites.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark text-sm font-semibold rounded-full hover:bg-accent/90 transition-colors group"
              >
                <span>Explore Movies</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Favorites
