import { HttpStatusCode as StatusCode } from "../enums/httpStatusCode";

export class ApiResponse {
  public success = (res, data) => {
    const response = data
    res.status(StatusCode.OK).json(response)
  }
  
  public successCreated = (res, data) => {
    const response = data
    res.status(StatusCode.CREATED).json(response)
  }
  
  public notFound = (res, error) => {
    const status = StatusCode.NOT_FOUND
    const response = { code: 1, status, name: 'Not Found', error }
    res.status(status).json(response)
  }
  
  badRequest = (
    res,
    error = `bad request`
  ) => {
    const status = StatusCode.BAD_REQUEST
    const response = { code: 3, status, name: 'Bad Request', error }
    res.status(status).json(response)
  }
  
  public unauthorized = (
    res,
    error = `invalid access to resource`
  ) => {
    const status = StatusCode.UNAUTHORIZED
    const response = { code: 2, status, name: 'Unauthorized', error }
    res.status(status).json(response)
  }
  
  public forbidden = (res, error = `insufficient permissions`) => {
    const status = StatusCode.FORBIDDEN
    const response = { code: 7, status, name: 'Forbidden', error }
    res.status(status).json(response)
  }
  
  public internalServerError = (
    res,
    error = `internal Server Error`
  ) => {
    const status = StatusCode.INTERNAL_SERVER_ERROR
    const response = {
      code: 6,
      status: status,
      name: 'Internal Server Error',
      error
    }
    res.status(status).json(response)
  }
  
  public dataValidationFailed = (res, error) => {
    const status = StatusCode.DATA_VALIDATION_FAILED
    const response = { code: 4, status, name: 'invalid request data', error }
    res.status(status).json(response)
  }
  
  public noContent = (res, error = `No Content to Show`) => {
    const status = StatusCode.NO_CONTENT
    const response = { code: 5, status, name: 'No Content', error }
    res.status(status).json(response)
  }
}

// validations responses



