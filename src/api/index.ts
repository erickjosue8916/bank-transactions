import { Router } from 'express'
import { ApiV1 as V1 } from './v1'
import { container as authContainer, TYPES as AUTH_TYPES } from "./auth";
import { ApplicationRoute } from '../repositories/interfaces';
export class Api {

  public getRouter(): Router {
    const router = Router()
    const v1 = new V1()
    const auth: ApplicationRoute = authContainer.get<ApplicationRoute>(AUTH_TYPES.AuthRouter)
    router.use('/', auth.getRouter())
    router.use('/v1', v1.getRouter())
    return router
  }
}
