import { body, check, param } from 'express-validator'
import { inject, injectable } from 'inversify'
import bcrypt from 'bcrypt'
import { ApiValidation } from '../../../repositories/classes'
import { IAccountValidation } from './accounts.validations.interface'
import { environment } from '../../../config/environment'
import { TYPES } from './types'
import { IAccountService } from './index'

@injectable()
export class AccountsValidations extends ApiValidation implements IAccountValidation {
  private accountService: IAccountService
  private requiredFields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'dateBirth',
    'email',
    'username',
    'password',
  ]

  public constructor(@inject(TYPES.AccountService) accountService: IAccountService) {
    super()
    this.accountService = accountService
  }

  public create = [
    ...this.checkRequiredData(this.requiredFields),
    body('password')
      .isLength({ min: 8, max: 8 })
      .withMessage('required length of 8 for passwords')
      .customSanitizer(async (value) => {
        const passEncrypt = await bcrypt.hash(value, Number(environment.crypto.salts))
        return passEncrypt
      }),
    body('dateBirth')
      .isDate({ format: `YYYY-MM-DD` })
      .withMessage(`Format required for date fields: YYYY-MM-DD`),

    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public list = [
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  private exist = async (accountId, { req }) => {
    const account = await this.accountService.get(accountId)
    if (!account) throw new Error('account not found')
    req._account = account
    return true
  }

  public get = [
    ...this.validateAccess,
    param(`accountId`).custom(this.exist),
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public update = [
    ...this.checkNotEmptyData(this.requiredFields),
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public delete = [
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
}
