import { APIError, ErrorHandler } from '../utils/errorHandler'

// Error Handler
export const error = (err, _req, res, next) => {
  console.log(err.message)
  
  // if APIError
  if (ErrorHandler.isTrustedError(err)) {
    return next(ErrorHandler.handleError(res, err))
  }

  // if SyntaxError
  if (err instanceof SyntaxError) {
    const error = new APIError(APIError.httpCodes.BAD_REQUEST, 'invalid syntax error expected')
    return next(ErrorHandler.handleError(res, error))
  }

  // TypeError
  const error = new APIError(
    APIError.httpCodes.INTERNAL_SERVER,
    'OOps! an internal error was ocurred'
  )
  return next(ErrorHandler.handleError(res, error))
}
