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
  async transfer(account, destinationAccount, data) {
    const transference = new entities.Transference()
    
    let withdrawData = {
      description: `transference to account: ${destinationAccount.id}`,
      amount: data.total,
      transactionTypeId: 5
    }
    let depositData = {
      description: `transference from account: ${account.id}`,
      amount: data.total,
      transactionTypeId: 2
    }
    
    const withdraw = await this.withdraw(account, withdrawData)
    const deposit = await this.deposit(destinationAccount, depositData)
    data.depositId = deposit.id
    data.withdrawId = withdraw.id

    Object.assign(transference, data)
    await transference.save()
    return transference
  }

  async list(_query) {

  }
  async get(_id) {

  }
}
