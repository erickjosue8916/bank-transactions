
export interface IAuthService {
  login(username, password): Promise<string>
}
