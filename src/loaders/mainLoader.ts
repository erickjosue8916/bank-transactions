
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from "./index"
import { Loader } from '../repositories/interfaces'

@injectable()
export class MainLoader implements Loader {

  public constructor(
    @inject(TYPES.Express) private app: Loader,
    @inject(TYPES.Database) private storage: Loader
  ) { }

  public async initialize(): Promise<void> {
    
    await this.storage.initialize()
    this.app.initialize()
  }
}