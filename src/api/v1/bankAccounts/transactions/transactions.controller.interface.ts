import { ApiControllerCrud } from '../../../../repositories/interfaces'

export interface ITransactionController {
  deposit(req, res, next)
  withdraw(req, res, next)
  transfer(req, res, next)
  list(req, res, next)
  get(req, res, next)
}
