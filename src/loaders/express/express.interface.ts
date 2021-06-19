import * as express from 'express'

export interface Server {
  app: express.Application

  listen(port: number) 
}
