import { MongooseConnection } from './mongooseConnection'
import { ENVIRONMENTS } from '../../enums'

export interface EnvironmentDefinition {
  node_env: ENVIRONMENTS
  ip: string
  port: number
  mongo: MongooseConnection
}
