import { Router } from 'express'
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IAuthController, IAuthValidation } from "./index";
import { ApplicationRoute } from "../../repositories/interfaces"
import { TYPES }  from "./types";


@injectable()
export class AuthRouter implements ApplicationRoute {
  private authController: IAuthController
  private authValidations: IAuthValidation

  public constructor(
    @inject (TYPES.AuthController) userController: IAuthController,
    @inject (TYPES.AuthValidation) userValidations: IAuthValidation
  ) {
    
    this.authController = userController
    this.authValidations = userValidations
  }

  public getRouter(): Router {
    const router = Router()
    router.post('/login',
        this.authValidations.login,
        this.authController.login)
    return router
  }
}
