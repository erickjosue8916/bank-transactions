import { injectable } from 'inversify'
import 'reflect-metadata'
import { IAccountService } from './index'
import { entities } from '../../../database/bank'

@injectable()
export class AccountService implements IAccountService {
  async list(_query: any): Promise<any> {
    const accounts = await entities.BankAccounts.find()
    return accounts
  }

  async get(id: string): Promise<any> {
    const account = await entities.BankAccounts.findOne(id)
    return account
  }

  async create(payload: any): Promise<any> {
    const account = new entities.BankAccounts()
    Object.assign(account, payload)
    account.status = `ACTIVE`

    await account.save()
    return account
  }

  async update(account: any): Promise<any> {
    await account.save()
    return account
  }

  async delete(account: any): Promise<any> {
    await account.delete()
    return account
  }
}
