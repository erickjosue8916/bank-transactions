export interface ResponseApiOk {}

export interface paginatedResponse<T> {
  status: number
  data: T
}

export interface resourceCreated<T> {
  data: T
}

export interface resourceUpdated<T> {
  data: T
  previous_values: T
}

export interface resourceDeleted<T> {
  data: T[]
}
