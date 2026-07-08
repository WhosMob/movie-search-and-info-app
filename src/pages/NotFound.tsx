import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Search } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[180px] text-text-primary leading-none select-none font-bold">
          404
        </h1>
      </motion.div>

      <motion.div
        className="my-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
      </motion.div>

      <motion.h2
        className="text-2xl md:text-3xl text-text-primary font-semibold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        Page Not Found
      </motion.h2>

      <motion.p
        className="text-text-muted mb-10 max-w-sm text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-dark text-sm font-semibold rounded-full hover:bg-accent/90 transition-colors group"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-dark-border text-text-primary text-sm font-medium rounded-full hover:border-text-muted transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Movies</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
