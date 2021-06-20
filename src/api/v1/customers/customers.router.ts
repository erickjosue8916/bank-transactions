import { Router } from 'express'
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ICustomerController, ICustomerValidation } from "./index";
import { ApplicationRoute } from "../../../repositories/interfaces"
import { TYPES }  from "./types";


@injectable()
export class CustomerRouter implements ApplicationRoute {
  private customerController: ICustomerController
  private customerValidations: ICustomerValidation

  public constructor(
    @inject (TYPES.CustomerController) customerController: ICustomerController,
    @inject (TYPES.CustomerValidation) customerValidations: ICustomerValidation
  ) {
    
    this.customerController = customerController
    this.customerValidations = customerValidations
  }

  public getRouter(): Router {
    const router = Router()
    router.route('/')
      .get(this.customerController.list)
      .post(
        this.customerValidations.create,
        this.customerController.create)

    router.route('/:customerId')
      .get(this.customerController.getById)
      .put(this.customerController.update)
    return router
  }
}
