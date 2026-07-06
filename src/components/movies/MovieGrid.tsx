import { motion } from 'framer-motion'
import MovieCard from './MovieCard'
import type { MovieBase } from '../../types'

interface MovieGridProps {
  title?: string
  movies: MovieBase[]
}

function MovieGrid({ title, movies }: MovieGridProps) {
  if (!movies || movies.length === 0) return null

  return (
    <section className="py-12">
      {title && (
        <div className="mb-10">
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              <h2 className="text-2xl md:text-3xl text-text-primary font-semibold">
                {title}
              </h2>
            </div>
            <div className="hidden md:block h-px flex-1 bg-dark-border" />
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies.map((movie, i) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          >
            <MovieCard movie={movie} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default MovieGrid
