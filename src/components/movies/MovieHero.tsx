import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, Calendar, Clock, Play, ChevronDown } from 'lucide-react'
import { imageUrl } from '../../services/tmdb'
import { getYear, formatRuntime, formatRating } from '../../utils/helpers'
import SearchBar from '../search/SearchBar'
import type { Movie, MovieDetails } from '../../types'

interface MovieHeroProps {
  movie: Movie | null
}

function isMovieDetails(movie: Movie): movie is MovieDetails {
  return 'runtime' in movie
}

function MovieHero({ movie }: MovieHeroProps) {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 120])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 1.1])

  function handleSearch(query: string) {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  if (!movie) return null

  return (
    <div className="relative w-full min-h-[90vh] overflow-hidden">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
          <img
            src={imageUrl.backdrop(movie.backdrop_path) ?? undefined}
            alt=""
            className="w-full h-[120%] object-cover opacity-30"
          />
        </motion.div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1 bg-linear-to-t from-dark via-dark/60 to-transparent" />
      <div className="absolute inset-0 z-1 bg-linear-to-r from-dark/80 to-transparent" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 z-1 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-300 mx-auto px-6 min-h-[90vh] flex flex-col justify-end pb-24 pt-40"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Section marker */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="number-marker">01</span>
            <div className="h-px w-12 bg-accent/30" />
            <span className="section-marker">Featured Film</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary leading-[0.95] mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {movie.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-2 text-text-primary">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-semibold">{formatRating(movie.vote_average)}</span>
            </span>
            <span className="w-1 h-1 bg-text-muted rounded-full" />
            <span className="inline-flex items-center gap-2 text-text-secondary text-sm">
              <Calendar className="w-3.5 h-3.5" />
              {getYear(movie.release_date)}
            </span>
            {isMovieDetails(movie) && movie.runtime != null && (
              <>
                <span className="w-1 h-1 bg-text-muted rounded-full" />
                <span className="inline-flex items-center gap-2 text-text-secondary text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  {formatRuntime(movie.runtime)}
                </span>
              </>
            )}
          </motion.div>

          {/* Overview */}
          <motion.p
            className="text-text-secondary text-[15px] leading-relaxed mb-10 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {movie.overview}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <motion.button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark text-sm font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Film</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 border border-dark-border text-text-primary text-sm font-medium rounded-full hover:border-text-muted transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" fill="currentColor" />
              <span>Watch Trailer</span>
            </motion.button>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="section-marker text-[10px]">Scroll</span>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default MovieHero
