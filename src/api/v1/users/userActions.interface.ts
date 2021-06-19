import { Request, Response, NextFunction } from 'express'

export interface UserActions {
  list(_req: Request, res: Response, _next: NextFunction)
  getById(_req: Request, res: Response, _next: NextFunction)
  get(_req: Request, res: Response, _next: NextFunction)
  create(_req: Request, res: Response, _next: NextFunction)
  update(_req: Request, res: Response, _next: NextFunction)
}
