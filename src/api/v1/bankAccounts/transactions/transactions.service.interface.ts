import { ApiServiceCrud } from '../../../../repositories/interfaces'
export interface ITransactionService {
  deposit(account, payload)
  withdraw(account, payload)
  transfer(account, payload)
  list(query)
  get(id)
}
