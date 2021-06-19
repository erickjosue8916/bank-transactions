import { injectable } from 'inversify'
import 'reflect-metadata'
import mongoose from 'mongoose'

import { DB } from './db.interface'

@injectable()
export class Mongoose implements DB{
  public initialize(uri: string): void {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }
}
