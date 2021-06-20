import { inject, injectable } from 'inversify'
import { validationResult, matchedData, check, header } from 'express-validator'
import { HttpStatusCode } from '../enums/httpStatusCode'
import { Jwt } from '../../utils/Jwt'

@injectable()
export class ApiValidation {
  public validationFailed = (res, response, isCustom = false) => {
    if (isCustom) {
      response = {
        code: 0,
        status: HttpStatusCode.DATA_VALIDATION_FAILED,
        name: 'Unprocessable Entity',
        message: response,
      }
    }
    res.status(422).json(response)
  }

  public validationResponse = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    // return with error
    return this.validationFailed(res, {
      code: 0,
      status: HttpStatusCode.DATA_VALIDATION_FAILED,
      name: 'Unprocessable Entity',
      message: errors.array()[0].msg,
    })
  }

  public onlyMatchData = (req, _res, next) => {
    // set valid data to body
    // console.log(req.body)
    req.body = matchedData(req, { locations: ['body'] })
    return next()
  }

  public checkRequiredData = (fields: string[]) => {
    return fields.map((key) => {
      return check(key, `Required field <<${key}>> not found or is empty`).exists().notEmpty()
    })
  }

  public checkNotEmptyData = (fields: string[]) => {
    return fields.map((key) => {
      return check(key, `Field ${key} is empty`).notEmpty()
    })
  }

  private validateAccessToken = async (value, { req }) => {
    const [, comingToken] = value.split(' ')
    if (!comingToken) throw new Error('Token not found')

    const payload = await Jwt.verify(comingToken)
    if (!payload) throw new Error('Invalid token or is expired')

    req.user = payload
    return true
  }

  protected validateAccess = [
    header('authorization', 'token is empty')
      .notEmpty()
      .withMessage(`Access token is empty`)
      .custom(this.validateAccessToken),
  ]
}
