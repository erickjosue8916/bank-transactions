import { ApiValidationModule } from "../../../repositories/interfaces";

export interface ICustomerValidation extends ApiValidationModule{
  exist(customerId, { req })
}