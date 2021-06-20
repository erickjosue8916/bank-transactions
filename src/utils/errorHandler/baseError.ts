
class BaseError{
  description: string
  code: any
  name: string
  httpCode: any
  constructor (httpCode, name, description, code) {
    // super(description)
    this.description = description
    this.code = code
    this.name = name
    this.httpCode = httpCode
  }
}

export default BaseError
