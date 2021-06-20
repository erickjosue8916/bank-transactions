import { injectable } from 'inversify'
import 'reflect-metadata'
import { ICustomersService } from './index'
import { entities } from '../../../database/bank'

@injectable()
export class CustomerService implements ICustomersService {
  async list(_query: any): Promise<any> {
    const customers = await entities.Customers.find()
    return customers
  }

  async get(id: string): Promise<any> {
    const customer = await entities.Customers.findOne(id)
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
    await customer.save()
    return customer
  }

  async delete(customer: any): Promise<any> {
    await entities.Customers.delete(customer.id)
    return customer
  }
  
}
