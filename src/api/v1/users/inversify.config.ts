import { Container } from 'inversify'
import { TYPES } from './types'
import { UserActions, UserController, UserRouter, UserActionsService, UserService } from './index'
import { ApplicationRoute } from "../../../repositories/interfaces";

const container = new Container()

container.bind<UserActionsService>(TYPES.UserService).to(UserService)
container.bind<UserActions>(TYPES.UserController).to(UserController)
container.bind<ApplicationRoute>(TYPES.UserRouter).to(UserRouter)


export { container }
