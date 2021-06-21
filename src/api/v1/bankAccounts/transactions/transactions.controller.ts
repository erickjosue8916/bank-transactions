import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'

import { ITransactionController } from './transactions.controller.interface'
import { ApiController } from '../../../../repositories/classes'
import { TYPES } from '../types'
import { ITransactionService } from './index'

@injectable()
export class TransactionController extends ApiController implements ITransactionController {
  private transactionService: ITransactionService

  public constructor(@inject(TYPES.TransactionService) transactionService: ITransactionService) {
    super()
    this.transactionService = transactionService
  }
  list(_req: any, _res: any, _next: any) {
    throw new Error('Method not implemented.')
  }

  deposit = async (req: any, res: Response, _next: NextFunction): Promise<Response> => {
    let data = {
      ...req.body,
      transactionTypeId: 1
    }
    const account = req._account
    const transaction = await this.transactionService.deposit(account, data)
    return this.response.success(res, transaction)
  }

  withdraw = async (req: any, res: Response, _next: NextFunction): Promise<Response> => {
    let data = {
      ...req.body,
      transactionTypeId: 4
    }
    const account = req._account
    const transaction = await this.transactionService.withdraw(account, data)
    return this.response.success(res, transaction)
  }

  get = async (req: any, res: Response, _next: NextFunction): Promise<Response> => {
    const { _customer: customer } = req
    delete customer.password
    return this.response.success(res, customer)
  }

  transfer = async (req: any, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      let withdrawData = {
        ...req.body,
        transactionTypeId: 4
      }
      let depositData = {
        ...req.body,
        transactionTypeId: 4
      }
      const account = req._account
      // const withdraw = await this.transactionService.withdraw(account, withdrawData)
      // const deposit = await this.transactionService.withdraw(account, depositData)

      const transference = {
        withdrawData,
        depositData
      }
      return this.response.success(res, transference)
    } catch (error) {
      console.log(error)
      return this.response.internalServerError(res, error)
    }
  }

}
