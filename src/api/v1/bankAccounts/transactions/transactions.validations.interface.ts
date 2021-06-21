import { ApiValidationModule } from '../../../../repositories/interfaces'

export interface ITransactionValidation { 
  deposit: any[]
  withdraw: any[]
  transfer: any[]
  list: any[]
  get: any[]
}
