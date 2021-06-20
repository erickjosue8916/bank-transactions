import { Container } from 'inversify'
import { TYPES } from './types'
import { Express, DatabaseLoader } from './index'
import { interfaces } from "../repositories";
import { MainLoader } from "./mainLoader";
const container = new Container()

container.bind<interfaces.Loader>(TYPES.Database).to(DatabaseLoader)
container.bind<interfaces.Loader>(TYPES.Express).to(Express)
container.bind<interfaces.Loader>(TYPES.MainLoader).to(MainLoader)

export { container }
