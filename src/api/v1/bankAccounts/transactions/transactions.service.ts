import { injectable } from 'inversify'
import 'reflect-metadata'
import { ITransactionService } from './index'
import { entities } from '../../../../database/bank'
@injectable()
export class TransactionService implements ITransactionService {
  async deposit(account, data) {
    account.balance += data.amount
    const payload = {
      bankAccountId: account.id,
      transactionTypeId: 1,
      actionType: `CREDIT`,
      balance: account.balance
    }
    data = Object.assign(data, payload)
    const transaction = new entities.Transactions()
    Object.assign(transaction, data)
    
    await transaction.save()
    await account.save()
    return transaction
  }

  async withdraw(account, data) {
    account.balance -= data.amount
    const payload = {
      bankAccountId: account.id,
      actionType: `DEBIT`,
      balance: account.balance
    }
    data = Object.assign(data, payload)
    const transaction = new entities.Transactions()
    Object.assign(transaction, data)
    
    await transaction.save()
    await account.save()
    return transaction
  }
  async transfer(_account, _payload) {

  }
  async list(_query) {

  }
  async get(_id) {

  }
}
