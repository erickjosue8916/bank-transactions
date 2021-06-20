import { body, check } from 'express-validator'
import { injectable } from "inversify";
import { ApiValidation } from "../../../repositories/classes";
import { IUserValidation } from './user.validations.interface'

@injectable()
export class UserValidation extends ApiValidation implements IUserValidation{
  private requiredFields = ['firstName', 'lastName']
  public create = [
    ...this.checkRequiredData(this.requiredFields),
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
  public list = [
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public get = [
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public update = [
    ...this.checkNotEmptyData(this.requiredFields),
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public delete = [
    this.validationResponse,  // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
}