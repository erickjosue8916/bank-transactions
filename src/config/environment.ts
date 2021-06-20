import { ENVIRONMENTS } from '../repositories/enums'
import { interfaces, enums } from "../repositories";

const bankDbConfig: interfaces.DatabaseConfig = {
  host: process.env.DATABASE_BANK_HOST,
  database: process.env.DATABASE_BANK_DATABASE,
  port: Number(process.env.DATABASE_BANK_PORT),
  username: process.env.DATABASE_BANK_USER,
  password: process.env.DATABASE_BANK_PASSWORD,
  driver: process.env.DATABASE_BANK_DRIVER as enums.DatabaseDriver,
}

export const environment = {
  node_env: (process.env.NODE_ENV as ENVIRONMENTS) || ENVIRONMENTS.DEVELOPMENT,
  ip: process.env.NODE_ENV || '0.0.0.0',
  port: Number(process.env.PORT || 3001),
  database: {
    bank: bankDbConfig
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || `123`
  }
}
