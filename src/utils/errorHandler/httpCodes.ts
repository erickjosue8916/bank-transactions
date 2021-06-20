const HttpCodes = {
  NO_CONTENT: { status: 204, name: 'No Content' },
  BAD_REQUEST: { status: 400, name: 'Bad Request' },
  UNAUTHORIZED: { status: 401, name: 'Unauthorized' },
  NOT_FOUND: { status: 404, name: 'Not Found' },
  DATA_VALIDATION_FAILED: { status: 422, name: 'Data Validation Failed' },
  INTERNAL_SERVER: { status: 500, name: 'Internal Server Error' }
}

export default HttpCodes
