export interface IUserService {
  list(query: any): Promise<any>
  create(user: any): Promise<any> 
  update(user: any): Promise<any>
}
