export interface PaginatedResponse<T> {
  items: T[]
  page: number
  limit: number
  total_items: number
  total_pages: number
}

export interface ErrorResponse {
  code: number
  status: number
  name: string
  error: string | string[]
}
