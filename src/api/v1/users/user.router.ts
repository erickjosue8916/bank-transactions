import { Router } from 'express'
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { UserActions } from "./index";
import { ApplicationRoute } from "../../../repositories/interfaces"
import { TYPES }  from "./types";


@injectable()
export class UserRouter implements ApplicationRoute {
  private userController: UserActions

  public constructor(
    @inject (TYPES.UserController) userController: UserActions
  ) {
    
    this.userController = userController
  }

  public getRouter(): Router {
    console.log(this)
    const router = Router()
    router.route('/')
      .get(this.userController.list)
      .post(this.userController.create)

    router.route('/:userId')
      .get(this.userController.getById)
      .put(this.userController.update)
    return router
  }
}
