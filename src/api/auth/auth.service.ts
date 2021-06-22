import { injectable } from 'inversify'
import 'reflect-metadata'
import { IAuthService } from './index'
import { entities } from '../../database/bank'
import bcrypt from "bcrypt"

@injectable()
export class AuthService implements IAuthService {
  async login(username, password): Promise<any> {
    let search
    let user: entities.Users | entities.Customers | null
    let isCustomer = false
    search = await entities.Users.find({username})

    if (!search.length) { // find user as customer
      search = await entities.Customers.find({username})
      isCustomer = true
    } 

    if (search.length) {      
        user = search[0]
    } else {
      return null
    }
    
    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) return null

    delete user.password
    
    const payload = {
      ...user,
      isCustomer
    }
    return payload
  }
}
