import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Request, Response, NextFunction } from 'express'

import { ICustomerController } from "./customers.controller.interface";
import { ApiController } from "../../../repositories/classes";
import { TYPES } from "./types";
import { ICustomersService } from "./index";


@injectable()
export class CustomerController extends ApiController implements ICustomerController{
  private customerService: ICustomersService

  public constructor(
    @inject(TYPES.CustomerService) userService: ICustomersService
  ) {
    super()
    this.customerService = userService
  }


  list = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const result = await this.customerService.list(_req.query)
    return res.json(result)
  }

  getById = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[GET] USER by id` })
  }

  get = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[GET] USER` })
  }

  create = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    try {
      const result = await this.customerService.create(req.body)
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
