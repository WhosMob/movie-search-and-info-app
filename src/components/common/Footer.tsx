import { Clapperboard } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-dark-border mt-auto">
      <div className="max-w-300 mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Clapperboard className="w-4 h-4" style={{ color: '#0a0a0a' }} />
            </div>
            <span className="text-text-primary" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>Movie Info App</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
