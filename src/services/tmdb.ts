import axios from 'axios'
import type { Movie, MovieDetails, MovieCredits, SearchResponse } from '../types'

/*
  TMDB API Service

  This file contains ALL API calls to The Movie Database (TMDB).
  Components never call axios directly — they use these functions.

  Why a separate service file?
  - Single source of truth for API configuration
  - Components don't know about URLs, API keys, or HTTP details
  - Easy to update if TMDB changes their API
  - Easy to add error handling, logging, or caching in one place

  TMDB API docs: https://developer.themoviedb.org/docs
*/

// --- Configuration ---

// TMDB API base URL — all endpoints start with this
const BASE_URL = 'https://api.themoviedb.org/3'

// API key — stored in environment variable for security
// Create a .env file in project root with: VITE_TMDB_API_KEY=your_key_here
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// Create a reusable axios instance with default settings
// This avoids repeating BASE_URL and API_KEY in every request
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

// --- Image URLs ---

/*
  TMDB hosts images at image.tmdb.org. We need different sizes for different uses:
  - Poster (portrait): w500 for cards, original for details
  - Backdrop (landscape): w1280 for hero, original for full-screen
  - Profile (actor photos): w185 for cast cards

  These are helper functions, not API calls.
*/
export const imageUrl = {
  poster: (path: string | null, size = 'w500'): string | null =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,

  backdrop: (path: string | null, size = 'w1280'): string | null =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,

  profile: (path: string | null, size = 'w185'): string | null =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
}

// --- API Functions ---

/*
  Each function:
  1. Makes a request to a specific TMDB endpoint
  2. Returns the response data
  3. Throws an error if something goes wrong (caught by components)
*/

// Get trending movies (this week)
export async function getTrendingMovies(): Promise<Movie[]> {
  const response = await tmdbApi.get<{ results: Movie[] }>('/trending/movie/week')
  return response.data.results
}

// Get popular movies (page 1 by default)
export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const response = await tmdbApi.get<{ results: Movie[] }>('/movie/popular', {
    params: { page },
  })
  return response.data.results
}

// Search movies by title
export async function searchMovies(query: string, page = 1): Promise<SearchResponse> {
  const response = await tmdbApi.get<SearchResponse>('/search/movie', {
    params: { query, page },
  })
  return response.data
}

// Get single movie details
export async function getMovieDetails(movieId: string): Promise<MovieDetails> {
  const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`)
  return response.data
}

// Get movie credits (director, cast)
export async function getMovieCredits(movieId: string): Promise<MovieCredits> {
  const response = await tmdbApi.get<MovieCredits>(`/movie/${movieId}/credits`)
  return response.data
}

// Get movie images (posters, backdrops)
export async function getMovieImages(movieId: string): Promise<{ backdrops: unknown[]; posters: unknown[] }> {
  const response = await tmdbApi.get(`/movie/${movieId}/images`)
  return response.data
}
