import { motion } from 'framer-motion'

function Loader() {
  return (
    <div className="flex justify-center items-center py-32">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 border border-text-muted rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-1 border border-accent border-t-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default Loader
