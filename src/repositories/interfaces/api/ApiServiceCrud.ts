export interface ApiServiceCrud {
  list(query: any): Promise<any>
  get<T>(id: string): Promise<T>
  create<T>(data: T): Promise<T>
  update<T>(data: T): Promise<T>
  delete<T>(data: T): Promise<T>
}
