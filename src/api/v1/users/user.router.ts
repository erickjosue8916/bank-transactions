import { Router } from 'express'
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IUserController, IUserValidation } from "./index";
import { ApplicationRoute } from "../../../repositories/interfaces"
import { TYPES }  from "./types";


@injectable()
export class UserRouter implements ApplicationRoute {
  private userController: IUserController
  private userValidations: IUserValidation

  public constructor(
    @inject (TYPES.UserController) userController: IUserController,
    @inject (TYPES.UserValidation) userValidations: IUserValidation
  ) {
    
    this.userController = userController
    this.userValidations = userValidations
  }

  public getRouter(): Router {
    const router = Router()
    router.route('/')
      .get(this.userController.list)
      .post(
        this.userValidations.create,
        this.userController.create)

    router.route('/:userId')
      .get(this.userController.getById)
      .put(this.userController.update)
    return router
  }
}
