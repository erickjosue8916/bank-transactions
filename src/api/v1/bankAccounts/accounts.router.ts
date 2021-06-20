import { Router } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { IAccountController, IAccountValidation } from './index'
import { ApplicationRoute } from '../../../repositories/interfaces'
import { TYPES } from './types'

@injectable()
export class AccountRouter implements ApplicationRoute {
  private accountsController: IAccountController
  private accountsValidations: IAccountValidation

  public constructor(
    @inject(TYPES.AccountController) customerController: IAccountController,
    @inject(TYPES.AccountValidation) customerValidations: IAccountValidation,
  ) {
    this.accountsController = customerController
    this.accountsValidations = customerValidations
  }

  public getRouter(): Router {
    const router = Router()
    router
      .route('/')
      .get(this.accountsController.list)
      .post(this.accountsValidations.create, this.accountsController.create)

    router.use('/:accountId', this.accountsValidations.get)
    router
      .route('/:accountId')
      .get(this.accountsController.get)
      .put(this.accountsController.update)
    return router
  }
}
