export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Unknown'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getYear(dateString: string | null | undefined): string | number {
  if (!dateString) return 'N/A'
  return new Date(dateString).getFullYear()
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (minutes == null) return 'N/A'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

export function formatRating(rating: number | null | undefined): string {
  if (rating == null) return 'N/A'
  return rating.toFixed(1)
}

export function formatNumber(num: number | null | undefined): string {
  if (num == null) return 'N/A'
  return num.toLocaleString('en-US')
}
