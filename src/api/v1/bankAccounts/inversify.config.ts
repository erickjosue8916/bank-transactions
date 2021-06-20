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
import { ApplicationRoute } from '../../../repositories/interfaces'

const container = new Container()

container.bind<IAccountService>(TYPES.AccountService).to(AccountService)
container.bind<IAccountController>(TYPES.AccountController).to(AccountController)
container.bind<ApplicationRoute>(TYPES.AccountRouter).to(AccountRouter)
container.bind<IAccountValidation>(TYPES.AccountValidation).to(AccountsValidations)

export { container }
