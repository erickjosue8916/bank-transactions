import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Request, Response, NextFunction } from 'express'

import { IAuthController } from "./auth.controller.interface";
import { TYPES } from "./types";
import { IAuthService } from "./index";
import { ApiController } from "../../repositories/classes";
import { Jwt } from "../../utils/Jwt";

@injectable()
export class AuthController extends ApiController implements IAuthController{
  private authService: IAuthService

  public constructor(
    @inject(TYPES.AuthService) authService: IAuthService
  ) {
    super()
    this.authService = authService
  }


  login = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const { username, password } = req.body
    const user = await this.authService.login(username, password)

    if (!user) return this.response.unauthorized(res, 'invalid credentials')

    const authorization = await Jwt.encode(user)

    return this.response.success(res, authorization)
  }


}
