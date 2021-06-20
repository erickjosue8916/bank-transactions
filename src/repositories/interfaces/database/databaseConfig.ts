import { DatabaseDriver } from '../../enums/DatabaseDriver'

export interface DatabaseConfig {
  host: string
  database: string
  port: number
  username: string
  password: string
  driver: DatabaseDriver
}