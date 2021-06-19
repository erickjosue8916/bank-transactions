
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES, Server, DB } from "./index"
import { EnvironmentDefinition } from '../repositories/interfaces'
import { Loader } from "./mainLoader.interface";

@injectable()
export class MainLoader implements Loader {
  public environment: any

  public constructor(
    @inject(TYPES.Express) private app: Server,
    @inject(TYPES.Mongoose) private mongo: DB
  ) { }

  public initialize(env: EnvironmentDefinition): void {
    this.app.listen(env.port)
    this.mongo.initialize(env.mongo.url)
  }
}