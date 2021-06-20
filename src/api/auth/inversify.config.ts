import { Container } from 'inversify'
import { TYPES } from './types'
import { IAuthController, AuthController, AuthRouter, AuthService, IAuthService, AuthValidation, IAuthValidation } from './index'
import { ApplicationRoute,  } from "../../repositories/interfaces";

const container = new Container()

container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)
container.bind<ApplicationRoute>(TYPES.AuthRouter).to(AuthRouter)
container.bind<IAuthValidation>(TYPES.AuthValidation).to(AuthValidation)


export { container }
