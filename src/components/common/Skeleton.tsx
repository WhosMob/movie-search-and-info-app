import { motion } from 'framer-motion'

function MovieCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-dark-border bg-dark-card">
      <div className="aspect-[2/3] animate-shimmer" />
      <div className="p-3 sm:p-4 space-y-3 border-t border-dark-border">
        <div className="h-4 w-3/4 bg-dark-hover rounded" />
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-dark-hover rounded" />
          <div className="h-3 w-8 bg-dark-hover rounded" />
        </div>
      </div>
    </div>
  )
}

interface MovieGridSkeletonProps {
  count?: number
}

export function MovieGridSkeleton({ count = 10 }: MovieGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
        >
          <MovieCardSkeleton />
        </motion.div>
      ))}
    </div>
  )
}

export default MovieCardSkeleton
