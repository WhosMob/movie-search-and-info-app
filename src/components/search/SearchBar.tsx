import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => { setQuery(initialQuery) }, [initialQuery])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`relative flex items-center bg-dark-card border transition-all duration-500 rounded-full ${
        isFocused ? 'border-accent/30 shadow-[0_0_30px_rgba(200,255,0,0.05)]' : 'border-dark-border'
      }`}>
        <Search className={`absolute left-5 w-4 h-4 transition-colors duration-300 ${
          isFocused ? 'text-accent' : 'text-text-muted'
        }`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for movies..."
          className="w-full py-4 pl-12 pr-12 bg-transparent text-text-primary placeholder-text-muted focus:outline-none text-sm"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 p-1.5 text-text-muted hover:text-text-primary bg-dark-hover rounded-full transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

export default SearchBar
