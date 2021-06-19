import { Request, Response, NextFunction } from 'express'

export interface UserActionsService {
  list(query: any): Promise<Response>
  create(user: any): Promise<Response> 
  update(user: any): Promise<Response>
}
