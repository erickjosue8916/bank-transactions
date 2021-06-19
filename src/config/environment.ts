import { ENVIRONMENTS } from '../repositories/enums'

export const environment = {
  node_env: (process.env.NODE_ENV as ENVIRONMENTS) || ENVIRONMENTS.DEVELOPMENT,
  ip: process.env.NODE_ENV || '0.0.0.0',
  port: Number(process.env.PORT || 3001),
  mongo: {
    url: process.env.MONGOOSE_CONNECTION_URL || `mongodb://localhost:27017/test`,
  }
}
