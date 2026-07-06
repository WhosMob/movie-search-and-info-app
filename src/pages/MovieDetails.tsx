import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getMovieDetails, getMovieCredits, imageUrl } from '../services/tmdb'
import { Star, Calendar, Clock, Globe, MapPin, ArrowLeft, Heart } from 'lucide-react'
import { getYear, formatRuntime, formatRating, formatNumber } from '../utils/helpers'
import useFavoritesStore from '../stores/useFavoritesStore'
import Loader from '../components/common/Loader'
import ErrorMessage from '../components/common/ErrorMessage'
import type { MovieDetails as MovieDetailsType, MovieCredits } from '../types'

function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetailsType | null>(null)
  const [credits, setCredits] = useState<MovieCredits | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { scrollY } = useScroll()
  const backdropY = useTransform(scrollY, [0, 400], [0, 60])

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const isFav = movie ? isFavorite(movie.id) : false

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true)
        setError(null)
        const [detailsData, creditsData] = await Promise.all([
          getMovieDetails(id!),
          getMovieCredits(id!),
        ])
        setMovie(detailsData)
        setCredits(creditsData)
      } catch (err) {
        setError('Failed to load movie details. Please try again.')
        console.error('Movie details error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovieData()
  }, [id])

  const director = credits?.crew?.find((p) => p.job === 'Director')
  const topCast = credits?.cast?.slice(0, 10) || []

  if (loading) return <Loader />
  if (error) return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <ErrorMessage message={error} />
    </div>
  )
  if (!movie) return null

  function handleToggleFavorite() {
    if (!movie) return
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    })
  }

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
        {movie.backdrop_path && (
          <motion.div className="absolute inset-0" style={{ y: backdropY }}>
            <img
              src={imageUrl.backdrop(movie.backdrop_path) ?? undefined}
              alt=""
              className="w-full h-[130%] object-cover opacity-25"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30 z-10" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 -mt-32 relative z-20">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-text-muted hover:text-text-primary transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <motion.div
            className="flex-shrink-0 w-48 md:w-60"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {movie.poster_path ? (
              <div className="relative rounded-xl overflow-hidden border border-dark-border">
                <img
                  src={imageUrl.poster(movie.poster_path) ?? undefined}
                  alt={movie.title}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="w-full aspect-[2/3] bg-dark-card border border-dark-border rounded-xl flex items-center justify-center">
                <span className="text-text-muted text-xs">No Poster</span>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <motion.h1
                className="text-3xl md:text-5xl text-text-primary leading-tight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {movie.title}
              </motion.h1>

              <motion.button
                onClick={handleToggleFavorite}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isFav ? 'fav-active' : 'fav-inactive'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
              </motion.button>
            </div>

            {movie.tagline && (
              <p className="italic text-accent/70 mb-5 text-sm font-medium">
                "{movie.tagline}"
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-semibold">{formatRating(movie.vote_average)}</span>
                <span className="text-text-muted text-xs">({formatNumber(movie.vote_count)})</span>
              </span>
              <span className="w-1 h-1 bg-text-muted rounded-full" />
              <span className="inline-flex items-center gap-2 text-text-secondary text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {getYear(movie.release_date)}
              </span>
              {movie.runtime != null && (
                <>
                  <span className="w-1 h-1 bg-text-muted rounded-full" />
                  <span className="inline-flex items-center gap-2 text-text-secondary text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    {formatRuntime(movie.runtime)}
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="px-3 py-1 text-xs text-text-secondary border border-dark-border rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-base text-text-primary font-semibold mb-2">Overview</h2>
              <p className="text-text-secondary leading-relaxed text-[15px]">{movie.overview}</p>
            </div>

            {director && (
              <div className="mb-6">
                <span className="section-marker">Director</span>
                <p className="text-text-primary font-medium text-sm mt-1">{director.name}</p>
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {movie.original_language && (
                <div className="p-4 rounded-lg border border-dark-border bg-dark-card hover-glow">
                  <span className="section-marker flex items-center gap-1.5">
                    <Globe className="w-3 h-3" /> Language
                  </span>
                  <p className="text-text-primary font-medium text-sm mt-1">{movie.original_language.toUpperCase()}</p>
                </div>
              )}
              {movie.production_countries?.length > 0 && (
                <div className="p-4 rounded-lg border border-dark-border bg-dark-card hover-glow">
                  <span className="section-marker flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Country
                  </span>
                  <p className="text-text-primary font-medium text-sm mt-1">
                    {movie.production_countries.map((c) => c.name).join(', ')}
                  </p>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="p-4 rounded-lg border border-dark-border bg-dark-card hover-glow">
                  <span className="section-marker">Budget</span>
                  <p className="text-text-primary font-medium text-sm mt-1">${formatNumber(movie.budget)}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="p-4 rounded-lg border border-dark-border bg-dark-card hover-glow">
                  <span className="section-marker">Revenue</span>
                  <p className="text-text-primary font-medium text-sm mt-1">${formatNumber(movie.revenue)}</p>
                </div>
              )}
            </div>

            {movie.production_companies?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base text-text-primary font-semibold mb-3">Production</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.production_companies.slice(0, 4).map((company) => (
                    <span key={company.id} className="px-3 py-1.5 bg-dark-hover text-text-secondary text-xs rounded-md border border-dark-border">
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        {topCast.length > 0 && (
          <section className="mt-16 mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <h2 className="text-2xl md:text-3xl text-text-primary font-semibold">Cast</h2>
              </div>
              <div className="hidden md:block h-px flex-1 bg-dark-border" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topCast.map((actor, i) => (
                <motion.div
                  key={actor.id}
                  className="rounded-xl overflow-hidden border border-dark-border bg-dark-card group hover-glow"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  {actor.profile_path ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl.profile(actor.profile_path) ?? undefined}
                        alt={actor.name}
                        className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent flex flex-col items-center justify-end p-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-text-primary text-sm font-medium">{actor.name}</p>
                        <p className="text-accent text-xs">as {actor.character}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[2/3] bg-dark-hover flex items-center justify-center">
                      <span className="text-text-muted text-xs">No Photo</span>
                    </div>
                  )}
                  <div className="p-3">
                    <p className="text-text-primary text-sm font-medium truncate group-hover:text-accent transition-colors">{actor.name}</p>
                    <p className="text-text-muted text-xs truncate">{actor.character}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
