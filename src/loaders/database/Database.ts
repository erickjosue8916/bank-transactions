import { injectable } from 'inversify'
import 'reflect-metadata'
import { BankDB } from "../../database/bank";
import { Loader } from '../../repositories/interfaces';
import { environment } from '../../config/environment';

@injectable()
export class DatabaseLoader implements Loader{
  public async initialize(): Promise<void> {
    const bankDBConfig = environment.database.bank
    await BankDB.initializeConnection(bankDBConfig)
  }
}
