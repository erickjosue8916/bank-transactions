import { Container } from 'inversify'
import { TYPES } from './types'
import { ICustomerController, CustomerController, CustomerRouter, CustomerService, ICustomersService, CustomerValidations, ICustomerValidation } from './index'
import { ApplicationRoute,  } from "../../../repositories/interfaces";

const container = new Container()

container.bind<ICustomersService>(TYPES.CustomerService).to(CustomerService)
container.bind<ICustomerController>(TYPES.CustomerController).to(CustomerController)
container.bind<ApplicationRoute>(TYPES.CustomerRouter).to(CustomerRouter)
container.bind<ICustomerValidation>(TYPES.CustomerValidation).to(CustomerValidations)


export { container }
