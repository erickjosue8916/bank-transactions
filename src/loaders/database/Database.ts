import { injectable } from 'inversify'
import 'reflect-metadata'
import { BankDB } from "../../database/bank";
import { Loader } from '../../repositories/interfaces';
import { environment } from '../../config/environment';

@injectable()
export class DatabaseLoader implements Loader{
  public initialize(): void {
    const bankDBConfig = environment.database.bank
    BankDB.initializeConnection(bankDBConfig)
  }
}
