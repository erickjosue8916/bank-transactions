import { body, check } from 'express-validator'
import { injectable } from "inversify";
import { ApiValidation } from "../../../repositories/classes";
import { IUserValidation } from './user.validations.interface'

@injectable()
export class UserValidation extends ApiValidation implements IUserValidation{
  private requiredFields = ['firstName', 'lastName']
  public create = [
    ...this.checkRequiredData(this.requiredFields),
    
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData
  ]
  public list = [
    
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData
  ]

  public get = [
    
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData
  ]

  public update = [
    
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData
  ]

  public delete = [
    
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData
  ]
}