import { injectable } from 'inversify'
import 'reflect-metadata'
import { IUserService } from './index'
import { entities } from '../../../database/bank'

@injectable()
export class UserService implements IUserService {
  async list(_query: any): Promise<any> {
    const users = entities.Users.find()
    return users
  }

  async create(_payload: any): Promise<any> {
    const user = new entities.Users()

    await user.save()
    return user
  }

  async update(_user: any): Promise<any> {
    _user.save()
    return _user
  }

  async delete(_user: any): Promise<any> {
    entities.Users.delete(_user.id)
    return _user
  }
  async get(_id: string): Promise<any> {}
}
