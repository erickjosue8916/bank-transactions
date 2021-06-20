import { Container } from 'inversify'
import { TYPES } from './types'
import { IUserController, UserController, UserRouter, UserService, IUserService, UserValidation, IUserValidation } from './index'
import { ApplicationRoute,  } from "../../../repositories/interfaces";

const container = new Container()

container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IUserController>(TYPES.UserController).to(UserController)
container.bind<ApplicationRoute>(TYPES.UserRouter).to(UserRouter)
container.bind<IUserValidation>(TYPES.UserValidation).to(UserValidation)


export { container }
