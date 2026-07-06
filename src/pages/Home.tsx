import { useState, useEffect } from 'react'
import { getTrendingMovies, getPopularMovies } from '../services/tmdb'
import { motion } from 'framer-motion'
import MovieHero from '../components/movies/MovieHero'
import MovieGrid from '../components/movies/MovieGrid'
import { MovieGridSkeleton } from '../components/common/Skeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import type { Movie } from '../types'

function MarqueeBanner() {
  const items = ['NOW PLAYING', 'TRENDING', 'POPULAR', 'TOP RATED', 'COMING SOON']
  return (
    <div className="marquee-banner">
      <div className="marquee-content">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8">
            {item}
            <span className="mx-8 text-accent/30">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Home() {
  const [trending, setTrending] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true)
        setError(null)
        const [trendingData, popularData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
        ])
        setTrending(trendingData)
        setPopular(popularData)
        if (trendingData.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingData.length))
          setHeroMovie(trendingData[randomIndex])
        }
      } catch (err) {
        setError('Failed to load movies. Please check your API key and try again.')
        console.error('Error fetching movies:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <ErrorMessage message={error} />
      </div>
    )
  }

  return (
    <div>
      {loading ? (
        <div className="relative w-full min-h-[90vh] bg-dark-card animate-shimmer" />
      ) : (
        <MovieHero movie={heroMovie} />
      )}

      <MarqueeBanner />

      <div className="max-w-[1200px] mx-auto px-6">
        {loading ? (
          <section className="py-12">
            <div className="h-8 w-56 bg-dark-hover rounded mb-8 animate-shimmer" />
            <MovieGridSkeleton count={10} />
          </section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <MovieGrid title="Trending This Week" movies={trending} />
          </motion.div>
        )}

        <div className="divider" />

        {loading ? (
          <section className="py-12">
            <div className="h-8 w-48 bg-dark-hover rounded mb-8 animate-shimmer" />
            <MovieGridSkeleton count={10} />
          </section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <MovieGrid title="Popular Movies" movies={popular} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Home
