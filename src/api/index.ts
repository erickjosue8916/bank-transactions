import { Router } from 'express'
import { ApiV1 as V1 } from './v1'

export class Api {

  public getRouter(): Router {
    const router = Router()
    const v1 = new V1()
    router.use('/v1', v1.getRouter())
    return router
  }
}
