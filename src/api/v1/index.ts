import { Router } from 'express'
import { container as userContainer, TYPES as USER_TYPES } from "./users";
import { container as customerContainer, TYPES as CUSTOMER_TYPES } from "./customers";

import { ApplicationRoute } from "../../repositories/interfaces";

export class ApiV1 implements ApplicationRoute{

  public getRouter(): Router {
    const router = Router()
    const userRouter: ApplicationRoute = userContainer.get<ApplicationRoute>(USER_TYPES.UserRouter)
    const customerRouter: ApplicationRoute = customerContainer.get<ApplicationRoute>(CUSTOMER_TYPES.CustomerRouter)
    router.use('/users', userRouter.getRouter())
    router.use('/customers', customerRouter.getRouter())
    return router
  }
}
