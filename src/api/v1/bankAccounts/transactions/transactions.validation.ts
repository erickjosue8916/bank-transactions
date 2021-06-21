import { body, check, param } from 'express-validator'
import { inject, injectable } from 'inversify'
import { ApiValidation } from '../../../../repositories/classes'
import { ITransactionValidation } from './transactions.validations.interface'
import { TYPES } from '../types'
import { ITransactionService } from './index'

@injectable()
export class TransactionValidations extends ApiValidation implements ITransactionValidation {
  private transactionsService: ITransactionService
  private requiredFields = {
    deposit: [
      'amount', `description`
    ],
    withdraw: [
      'amount', `description`
    ],
    transfer: [
      'amount', `description`, `toBankAccountId`
    ]
  }

  public constructor(@inject(TYPES.TransactionService) transactionsService: ITransactionService) {
    super()
    this.transactionsService = transactionsService
  }

  public deposit = [
    ...this.checkRequiredData(this.requiredFields.deposit),
    body('amount').isNumeric().custom(value => {
      if (value <= 0) throw new Error("Deposit amount need to be great to 0");
      return true
    }),
    body('accountId').custom(async (_accountId, { req }) => {
      const account = req._account
      if (account.status !== `ACTIVE`) throw new Error("Account is inactive for this moment try later");
      return true
    }), 
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
  
  public withdraw = [
    ...this.checkRequiredData(this.requiredFields.withdraw),
    body('accountId').custom(async (_accountId, { req }) => {
      const account = req._account
      if (account.status !== `ACTIVE`) throw new Error("Account is inactive for this moment try later");
      return true
    }),
    body('amount').isNumeric().custom((amount, {req}) => {
      const account = req._account
      if (amount <= 0) throw new Error("Withdraw amount need to be great to 0");
      if (amount > account.balance) throw new Error(`Balance account(${account.balance}) is minor that withdraw amount(${amount})`);
      
      return true
    }),
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]
  
  public transfer = [
    ...this.checkRequiredData(this.requiredFields.transfer),
    body('accountId').custom(async (_accountId, { req }) => {
      const account = req._account
      if (account.status !== `ACTIVE`) throw new Error("Account is inactive for this moment try later");
      return true
    }),
    body('amount').isNumeric().custom((amount, {req}) => {
      const account = req._account
      if (amount <= 0) throw new Error("Withdraw amount need to be great to 0");
      if (amount > account.balance) throw new Error(`Balance account(${account.balance}) is minor that withdraw amount(${amount})`);
      
      return true
    }),
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  public list = [
    this.validationResponse, // final response errors
    this.onlyMatchData, // remove all data that do not match with validations
  ]

  private exist = async (_accountId) => {
    // const account = await this.accountService.get(accountId)
    // if (!account) throw new Error('account not found')
    // req._account = account
    return true
  }

  private isActiveAccount = async (accountId, { req }) => {
    if (req._account.status !== `ACTIVE`) throw new Error("Account is inactive for this moment try later");
    req.body.bankAccountId = accountId
    return true
  }

  public get = [
    ...this.validateAccess,
    param(`accountId`).custom(this.isActiveAccount)
  ]
  
  public validateAccess = [
    ...this.validateAccess,
    param(`accountId`).custom(this.isActiveAccount)
  ]
}
