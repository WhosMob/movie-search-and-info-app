import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-12 h-12 border border-dark-border rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-5 h-5 text-text-muted" />
      </div>
      <p className="text-text-primary font-semibold text-base mb-2">Something went wrong</p>
      <p className="text-text-muted text-sm mb-8 text-center max-w-sm px-4">{message}</p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-dark text-sm font-semibold rounded-full hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

export default ErrorMessage
