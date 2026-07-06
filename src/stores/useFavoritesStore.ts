import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoriteMovie } from '../types'

interface FavoritesState {
  favorites: FavoriteMovie[]
  addFavorite: (movie: FavoriteMovie) => void
  removeFavorite: (movieId: number) => void
  toggleFavorite: (movie: FavoriteMovie) => void
  isFavorite: (movieId: number) => boolean
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie: FavoriteMovie) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === movie.id)
            ? state.favorites
            : [...state.favorites, movie],
        })),

      removeFavorite: (movieId: number) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== movieId),
        })),

      toggleFavorite: (movie: FavoriteMovie) => {
        const { favorites } = get()
        const exists = favorites.some((fav) => fav.id === movie.id)
        if (exists) {
          set({ favorites: favorites.filter((fav) => fav.id !== movie.id) })
        } else {
          set({ favorites: [...favorites, movie] })
        }
      },

      isFavorite: (movieId: number) => {
        return get().favorites.some((fav) => fav.id === movieId)
      },
    }),
    { name: 'cinesearch-favorites' }
  )
)

export default useFavoritesStore
