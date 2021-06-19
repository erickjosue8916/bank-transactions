import { Container } from 'inversify'
import { TYPES } from './types'
import { DB, Server, Express, Mongoose } from './index'
import { Loader } from "./mainLoader.interface";
import { MainLoader } from "./MainLoader";

const container = new Container()

container.bind<DB>(TYPES.Mongoose).to(Mongoose)
container.bind<Server>(TYPES.Express).to(Express)
container.bind<Loader>(TYPES.MainLoader).to(MainLoader)

export { container }
