import { createConnection, Connection } from 'typeorm'
import { enums, interfaces } from "../../../repositories";
import * as models from '../entities'


export interface ListQueryOptions {
  filter: any
  page: number
  limit: number
  sort: any
  relations: string[]
}

export class BankDB{
  static initializeConnection = async (config: interfaces.DatabaseConfig): Promise<Connection> => {
    try {
      const entities = Object.keys(models).map(modelName => {
        return models[modelName]
      });

      const connection = createConnection({
        type: config.driver,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [
          ...entities
        ],
        synchronize: false,
      })
      return connection
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}