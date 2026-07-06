export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface MovieBase {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export interface Movie extends MovieBase {
  backdrop_path: string | null
  vote_count: number
  overview: string
  genre_ids?: number[]
  original_language: string
  popularity: number
}

export interface MovieDetails extends Movie {
  tagline: string
  runtime: number | null
  status: string
  budget: number
  revenue: number
  genres: Genre[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  homepage: string | null
  imdb_id: string | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface MovieCredits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface SearchResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface FavoriteMovie extends MovieBase {}
