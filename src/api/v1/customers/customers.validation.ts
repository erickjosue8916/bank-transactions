import { body, check } from 'express-validator'
import { injectable } from 'inversify'
import bcrypt from 'bcrypt'
import { ApiValidation } from '../../../repositories/classes'
import { ICustomerValidation } from './customers.validations.interface'
import { environment } from '../../../config/environment'
import dayjs from 'dayjs'

@injectable()
export class CustomerValidations extends ApiValidation implements ICustomerValidation {
  private requiredFields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'dateBirth',
    'email',
    'username',
    'password',
  ]

  public create = [
    ...this.checkRequiredData(this.requiredFields),
    body('password')
      .isLength({ min: 8, max: 8 })
      .withMessage('required length of 8 for passwords')
      .customSanitizer(async (value) => {
        const passEncrypt = await bcrypt.hash(value, Number(environment.crypto.salts))
        return passEncrypt
      }),
      body('dateBirth').isDate({format: `YYYY-MM-DD`}).withMessage(`Format required for date fields: YYYY-MM-DD`),
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData,
  ]
  public list = [
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData,
  ]

  public get = [
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData,
  ]

  public update = [
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData,
  ]

  public delete = [
    // final response errors
    this.validationResponse,

    // remove all data that do not match with validations
    this.onlyMatchData,
  ]
}
