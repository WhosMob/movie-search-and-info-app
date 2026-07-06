import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { searchMovies } from '../services/tmdb'
import SearchBar from '../components/search/SearchBar'
import MovieGrid from '../components/movies/MovieGrid'
import { MovieGridSkeleton } from '../components/common/Skeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import type { Movie } from '../types'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    if (!query.trim()) {
      setMovies([])
      setTotalResults(0)
      return
    }

    async function fetchSearchResults() {
      try {
        setLoading(true)
        setError(null)
        const data = await searchMovies(query)
        setMovies(data.results)
        setTotalResults(data.total_results)
      } catch (err) {
        setError('Failed to search movies. Please try again.')
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSearchResults()
  }, [query])

  function handleSearch(newQuery: string) {
    setSearchParams({ q: newQuery })
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </motion.div>

      {error && <ErrorMessage message={error} />}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-4 h-4 border border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-text-muted text-sm">Searching...</span>
            </div>
            <MovieGridSkeleton count={10} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && !error && query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <p className="text-text-secondary text-sm">
              {totalResults > 0 ? (
                <>
                  Found <span className="text-accent font-medium">{totalResults.toLocaleString()}</span> results for{' '}
                  <span className="text-text-primary font-medium">"{query}"</span>
                </>
              ) : (
                <>
                  No results for <span className="text-text-primary font-medium">"{query}"</span>
                </>
              )}
            </p>
            <div className="h-px flex-1 bg-dark-border" />
          </div>

          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <motion.div
              className="flex flex-col items-center py-24"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-12 h-12 border border-dark-border rounded-full flex items-center justify-center mb-6">
                <span className="text-text-muted text-lg">?</span>
              </div>
              <p className="text-text-primary font-semibold mb-1">No movies found</p>
              <p className="text-text-muted text-sm">Try a different search term</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {!loading && !error && !query && (
        <motion.div
          className="flex flex-col items-center py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="w-16 h-16 border border-dark-border rounded-full flex items-center justify-center mb-6"
            animate={{ borderColor: ['rgba(26,26,26,1)', 'rgba(200,255,0,0.2)', 'rgba(26,26,26,1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-text-muted text-2xl">/</span>
          </motion.div>

          <p className="text-text-primary font-semibold text-lg mb-2">
            Search for your favorite movies
          </p>
          <p className="text-text-muted text-sm mb-8">
            Type a title or try a genre below
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {['Action', 'Comedy', 'Drama', 'Sci-Fi'].map((genre, i) => (
              <motion.button
                key={genre}
                className="px-5 py-2 text-xs text-text-secondary border border-dark-border rounded-full hover:border-accent/30 hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSearch(genre)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {genre}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default SearchResults
