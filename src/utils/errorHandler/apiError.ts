import httpCodes from './httpCodes'
import BaseError from './baseError'

class APIError extends BaseError {
  static httpCodes = httpCodes

  constructor (
    httpCode = { status: 500, name: 'Internal Server Error' },
    description = 'internal server error',
    code = 0
  ) {
    super(httpCode.status, httpCode.name, description, code)
  }
}

export default APIError
