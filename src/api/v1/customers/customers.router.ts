import { Router } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { ICustomerController, ICustomerValidation } from './index'
import { ApplicationRoute, ApiControllerCrud } from '../../../repositories/interfaces'
import { TYPES } from './types'

import { container as accountsContainer, TYPES as ACCOUNTS_TYPES, IAccountController, IAccountValidation } from "../bankAccounts";

@injectable()
export class CustomerRouter implements ApplicationRoute {
  private customerController: ICustomerController
  private customerValidations: ICustomerValidation

  private accountsController: IAccountController
  private accountsValidations: IAccountValidation

  public constructor(
    @inject(TYPES.CustomerController) customerController: ICustomerController,
    @inject(TYPES.CustomerValidation) customerValidations: ICustomerValidation,
  ) {
    this.customerController = customerController
    this.customerValidations = customerValidations

    this.accountsController = accountsContainer.get<IAccountController>(ACCOUNTS_TYPES.AccountController)
    this.accountsValidations = accountsContainer.get<IAccountValidation>(ACCOUNTS_TYPES.AccountValidation)
  }

  public getRouter(): Router {
    const router = Router()
    router
      .route('/')
      .get(this.customerController.list)
      .post(this.customerValidations.create, this.customerController.create)

    router.use('/:customerId', this.customerValidations.get)
    router
      .route('/:customerId')
      .get(this.customerController.get)
      .put(this.customerController.update)

    router
      .route('/:customerId/accounts')
      .post(this.accountsValidations.create, this.accountsController.create)
      .get(this.accountsValidations.get, this.accountsController.get)
    return router
  }
}
