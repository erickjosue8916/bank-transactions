import { DatabaseConfig } from '..'
import { ENVIRONMENTS } from '../../enums'

export interface EnvironmentDefinition {
  node_env: ENVIRONMENTS
  ip: string
  port: number
  database: {
    bank: DatabaseConfig
  }
}
