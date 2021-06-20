import * as express from 'express'
import expressApp from "express";
import { injectable } from 'inversify'
import 'reflect-metadata'
import cors from 'cors'
import morgan from "morgan"
import { Api } from "../../api";
import { enums, interfaces } from "../../repositories";
import { environment } from "../../config/environment";
import { error, notFound } from '../../middlewares/index'

@injectable()
export class Express implements interfaces.Loader{
  public app: express.Application

  constructor() {
    this.app = expressApp()
  }

  public initialize() {
    this.initializeMiddlewares()
    this.setHealthCheck()
    const api = new Api()

    // set api router
    this.app.use('/api', api.getRouter())

    // set error handler
    this.app.use(notFound)
    this.app.use(error)
    this.listen(environment.port)
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

  private listen(port: number) {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  }
}
