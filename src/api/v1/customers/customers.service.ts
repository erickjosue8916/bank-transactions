import { injectable } from 'inversify'
import 'reflect-metadata'
import { ICustomersService } from './index'
import { entities } from '../../../database/bank'
import dayjs from "dayjs";

@injectable()
export class CustomerService implements ICustomersService {
  async list(_query: any): Promise<any> {
    const customers = entities.Customers.find()
    return customers
  }

  async get(id: string): Promise<any> {
    const customer = entities.Customers.findOne(id)
    return customer
  }

  async create(payload: any): Promise<any> {
    const customer = new entities.Customers()
    Object.assign(customer, payload)
    customer.status = `ACTIVE`

    await customer.save()
    return customer
  }

  async update(customer: any): Promise<any> {
    customer.save()
    return customer
  }

  async delete(customer: any): Promise<any> {
    entities.Customers.delete(customer.id)
    return customer
  }
  
}
