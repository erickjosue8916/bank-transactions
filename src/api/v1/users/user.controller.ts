import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Request, Response, NextFunction } from 'express'

import { IUserController } from "./user.controller.interface";
import { TYPES } from "./types";
import { IUserService } from "./index";


@injectable()
export class UserController implements IUserController{
  private _userService: IUserService

  public constructor(
    @inject(TYPES.UserService) userService: IUserService
  ) {
    
    this._userService = userService
  }


  list = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const result = await this._userService.list(_req.query)
    return res.json(result)
  }

  getById = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[GET] USER by id` })
  }

  get = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[GET] USER` })
  }

  create = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[POST] CREATE USER` })
  }

  update = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    return res.json({ message: `[PUT] UPDATE USER` })
  }
}
