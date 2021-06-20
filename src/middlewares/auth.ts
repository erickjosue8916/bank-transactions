import JWT from 'jsonwebtoken'
import { environment } from '../config/environment'
import { ApiResponse } from '../repositories/classes'

export default async (req, res, next) => {
  const response = new ApiResponse()
  try {
    
    // get token from headers
    const token = req.headers?.authorization.split(' ')[1]
    if (!token) return response.badRequest(res, `Not found auth token`)

    // decode token an get payload
    const payload = JWT.verify(token, environment.jwt.secretKey)
    if (!payload) return response.unauthorized(res)

    // if success set payload on request object
    req.user = payload

    // return next middleware
    return next()
  } catch (err) {
    return response.unauthorized(res)
  }
}
