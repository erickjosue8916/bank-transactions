import { Router } from 'express'
import { container as userContainer, TYPES as USER_TYPES } from "./users";

import { ApplicationRoute } from "../../repositories/interfaces";

export class ApiV1 implements ApplicationRoute{

  public getRouter(): Router {
    const router = Router()
    const userRouter: ApplicationRoute = userContainer.get<ApplicationRoute>(USER_TYPES.UserRouter)
    router.use('/users', userRouter.getRouter())
    return router
  }
}
