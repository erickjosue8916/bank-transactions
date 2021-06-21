import { Router } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { ITransactionController, ITransactionValidation } from './index'
import { ApplicationRoute } from '../../../../repositories/interfaces'
import { TYPES } from '../types'

@injectable()
export class TransactionsRouter implements ApplicationRoute {
  private transactionsController: ITransactionController
  private transactionsValidations: ITransactionValidation

  public constructor(
    @inject(TYPES.TransactionController) transactionsController: ITransactionController,
    @inject(TYPES.TransactionValidation) transactionsValidations: ITransactionValidation,
  ) {
    this.transactionsController = transactionsController
    this.transactionsValidations = transactionsValidations
  }

  public getRouter(): Router {
    const router = Router()
    
    router.post('/deposits', this.transactionsValidations.deposit, this.transactionsController.deposit)
    router.post('/withdraws', this.transactionsValidations.withdraw, this.transactionsController.withdraw)
    router.post('/transfers', this.transactionsValidations.transfer, this.transactionsController.transfer)
    return router
  }
}
