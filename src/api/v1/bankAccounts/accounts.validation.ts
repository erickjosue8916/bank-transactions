import { body, check, param } from 'express-validator'
import { inject, injectable } from 'inversify'
import { ApiValidation } from '../../../repositories/classes'
import { IAccountValidation } from './accounts.validations.interface'
import { TYPES } from './types'
import { IAccountService } from './index'

@injectable()
export class AccountsValidations extends ApiValidation implements IAccountValidation {
  private accountService: IAccountService
  private requiredFields = {
    create: [
      'accountTypeId', 'balance'
    ],
    update: [
      'status'
    ]
  }

  public constructor(@inject(TYPES.AccountService) accountService: IAccountService) {
    super()
    this.accountService = accountService
  }

  public create = [
    ...this.checkRequiredData(this.requiredFields.create),
    body('balance').isNumeric().custom(value => {
      if (value < 25) throw new Error(`balance need to be great or equal to $25`)
      return true
    }), 
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
  ]

  public update = [
    ...this.checkNotEmptyData(this.requiredFields.update),
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public delete = [
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
}
