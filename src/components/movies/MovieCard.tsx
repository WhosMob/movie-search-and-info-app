import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { getYear, formatRating } from '../../utils/helpers'
import { imageUrl } from '../../services/tmdb'
import useFavoritesStore from '../../stores/useFavoritesStore'
import type { MovieBase } from '../../types'

const GRADIENTS = [
  'from-[#1a1a2e] to-[#16213e]',
  'from-[#2d1b69] to-[#11001c]',
  'from-[#1b2838] to-[#0f1923]',
  'from-[#2c1e31] to-[#1a0f1f]',
  'from-[#1a2332] to-[#0d1b2a]',
  'from-[#2b1f3e] to-[#150d26]',
]

interface MovieCardProps {
  movie: MovieBase
  index?: number
}

function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [justFavorited, setJustFavorited] = useState(false)

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const isFav = isFavorite(movie.id)

  const gradient = GRADIENTS[movie.id % GRADIENTS.length]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 })

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  function handleFavoriteClick(e: React.MouseEvent) {
    e.stopPropagation()
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    })
    setJustFavorited(true)
    setTimeout(() => setJustFavorited(false), 600)
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
      style={{ rotateX, rotateY, perspective: 800, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="rounded-xl overflow-hidden border border-dark-border bg-dark-card transition-all duration-500 group-hover:border-accent/20 group-hover:shadow-[0_8px_40px_rgba(200,255,0,0.06)]">
        <div className={`relative aspect-2/3 overflow-hidden bg-linear-to-br ${gradient}`}>
          {/* Poster image */}
          {imageUrl.poster(movie.poster_path) && (
            <img
              src={imageUrl.poster(movie.poster_path)!}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}

          {/* Title overlay on gradient */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-6xl md:text-7xl font-bold text-white/6 leading-none select-none">
              {movie.title.charAt(0)}
            </span>
            <span className="text-xs text-white/30 mt-3 font-medium tracking-wider uppercase">
              {getYear(movie.release_date)}
            </span>
          </div>

          {/* Favorite Button */}
          <motion.button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              isFav
                ? 'fav-active'
                : 'fav-inactive sm:opacity-0 sm:group-hover:opacity-100'
            }`}
            whileTap={{ scale: 0.85 }}
            animate={justFavorited ? { scale: [1, 1.3, 1] } : {}}
          >
            <Heart className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Rating badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 rounded-md bg-dark-card/60 backdrop-blur-sm border border-white/10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="text-text-primary text-xs font-medium">{formatRating(movie.vote_average)}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-text-primary truncate mb-1 group-hover:text-accent transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">{getYear(movie.release_date)}</span>
            <span className="flex items-center gap-1 text-text-secondary text-xs">
              <Star className="w-3 h-3 text-accent/60 fill-accent/60" />
              {formatRating(movie.vote_average)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MovieCard
