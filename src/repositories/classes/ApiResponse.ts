import { HttpStatusCode as StatusCode } from "../enums/httpStatusCode";
import { Response } from 'express'
export class ApiResponse {
  public success = (res, data): Promise<Response> => {
    const response = data
    return res.status(StatusCode.OK).json(response)
  }
  
  public successCreated = (res, data): Promise<Response> => {
    const response = data
    return res.status(StatusCode.CREATED).json(response)
  }
  
  public notFound = (res, error): Promise<Response> => {
    const status = StatusCode.NOT_FOUND
    const response = { code: 1, status, name: 'Not Found', error }
    return res.status(status).json(response)
  }
  
  public badRequest = (
    res,
    error = `bad request`
  ): Promise<Response> => {
    const status = StatusCode.BAD_REQUEST
    const response = { code: 3, status, name: 'Bad Request', error }
    return res.status(status).json(response)
  }
  
  public unauthorized = (
    res,
    error = `invalid access to resource`
  ): Promise<Response> => {
    const status = StatusCode.UNAUTHORIZED
    const response = { code: 2, status, name: 'Unauthorized', error }
    return res.status(status).json(response)
  }
  
  public forbidden = (res, error = `insufficient permissions`): Promise<Response> => {
    const status = StatusCode.FORBIDDEN
    const response = { code: 7, status, name: 'Forbidden', error }
    return res.status(status).json(response)
  }
  
  public internalServerError = (
    res,
    error = `internal Server Error`
  ): Promise<Response> => {
    const status = StatusCode.INTERNAL_SERVER_ERROR
    const response = {
      code: 6,
      status: status,
      name: 'Internal Server Error',
      error
    }
    return res.status(status).json(response)
  }
  
  public dataValidationFailed = (res, error): Promise<Response> => {
    const status = StatusCode.DATA_VALIDATION_FAILED
    const response = { code: 4, status, name: 'invalid request data', error }
    return res.status(status).json(response)
  }
  
  public noContent = (res, error = `No Content to Show`): Promise<Response> => {
    const status = StatusCode.NO_CONTENT
    const response = { code: 5, status, name: 'No Content', error }
    return res.status(status).json(response)
  }
}

// validations responses



