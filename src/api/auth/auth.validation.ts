import { body, check } from 'express-validator'
import { injectable } from "inversify";
import { ApiValidation } from "../../repositories/classes";
import { IAuthValidation } from "./auth.validations.interface";

@injectable()
export class AuthValidation extends ApiValidation implements IAuthValidation{
  private requiredFields = ['username', 'password']

  public login = [
    ...this.checkRequiredData(this.requiredFields),
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

}