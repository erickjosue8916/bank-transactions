import { Container } from 'inversify'
import { TYPES } from './types'
import {
  IAccountController,
  AccountController,
  AccountRouter,
  AccountService,
  IAccountService,
  AccountsValidations,
  IAccountValidation,
} from './index'

import * as transactions from './transactions'
import { ApplicationRoute } from '../../../repositories/interfaces'

const container = new Container()

container.bind<IAccountService>(TYPES.AccountService).to(AccountService)
container.bind<IAccountController>(TYPES.AccountController).to(AccountController)
container.bind<ApplicationRoute>(TYPES.AccountRouter).to(AccountRouter)
container.bind<IAccountValidation>(TYPES.AccountValidation).to(AccountsValidations)

container.bind<transactions.ITransactionService>(TYPES.TransactionService).to(transactions.TransactionService)
container.bind<transactions.ITransactionController>(TYPES.TransactionController).to(transactions.TransactionController)
container.bind<transactions.TransactionsRouter>(TYPES.TransactionRouter).to(transactions.TransactionsRouter)
container.bind<transactions.ITransactionValidation>(TYPES.TransactionValidation).to(transactions.TransactionValidations)


export { container }
