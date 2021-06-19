import * as express from 'express'
import expressApp from "express";
import { injectable } from 'inversify'
import 'reflect-metadata'
import cors from 'cors'
import morgan from "morgan"
import { Api } from "../../api";
import { HttpStatusCode } from "../../repositories/enums";
import { Server } from './express.interface'

@injectable()
export class Express implements Server{
  public app: express.Application

  constructor() {
    this.app = expressApp()
    this.initializeMiddlewares()
    this.setHealthCheck()
    const api = new Api()
    this.app.use('/api', api.getRouter())
    this.app.use(this.notFound)
  }

  private setHealthCheck() {
    this.app.get('/status', (_req: express.Request, res: express.Response) => {
      res.status(200).end()
    })

    this.app.head('/status', (_req: express.Request, res: express.Response) => {
      res.status(200).end()
    })
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(morgan('dev'))
  }

  public listen(port: number) {
    console.log(`server running on port ${port}`)
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  }

  private notFound (_req, res, _next): express.Response {
    return res.json({
      code: 1,
      status: HttpStatusCode.NOT_FOUND,
      error: 'un'
    })
  }
}
