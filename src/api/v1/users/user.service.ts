import { injectable } from "inversify";
import "reflect-metadata";
import { UserActionsService  } from "./index";

@injectable()
export class UserService implements UserActionsService{
  async list(_query: any): Promise<any> {
    return {
      name: "erick"
    }
  }

  async create(_user: any): Promise<any> {
    
  }

  async update(_user: any): Promise<any> {
    
  }
}