import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { Request, Response, NextFunction } from 'express'

import { IAccountController } from './accounts.controller.interface'
import { ApiController } from '../../../repositories/classes'
import { TYPES } from './types'
import { IAccountService } from './index'

@injectable()
export class AccountController extends ApiController implements IAccountController {
  private accountService: IAccountService

  public constructor(@inject(TYPES.AccountService) userService: IAccountService) {
    super()
    this.accountService = userService
  }

  list = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const result = await this.accountService.list(_req.query)
    return res.json(result)
  }

  getById = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[GET] USER by id` })
  }

  get = async (req: any, res: Response, _next: NextFunction): Promise<Response> => {
    const { _customer: customer } = req
    delete customer.password
    return this.response.success(res, customer)
  }

  create = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const result = await this.accountService.create(req.body)
      return this.response.success(res, result)
    } catch (error) {
      console.log(error)
      return this.response.internalServerError(res, error)
    }
  }

  update = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[PUT] UPDATE USER` })
  }
}
