import { inject, injectable } from "inversify";
import { validationResult, matchedData, check } from 'express-validator'
import { HttpStatusCode } from "../enums/httpStatusCode";

@injectable()
export class ApiValidation {
  public validationFailed = (res, response, isCustom = false) => {
    if (isCustom) {
      response = {
        code: 0,
        status: HttpStatusCode.DATA_VALIDATION_FAILED,
        name: 'Unprocessable Entity',
        message: response
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
      message: errors.array()[0].msg
    })
  }
  
  public onlyMatchData = (req, _res, next) => {
    // set valid data to body
    req.body = matchedData(req, { locations: ['body'] })
    return next()
  }

  public checkRequiredData = (fields: string[]) => {
    return fields.map((key) => {
      return check(key, `Required field ${key} not found or is empty`)
        .exists()
        .notEmpty()
    })
  }
  
  public checkNotEmptyData = (fields: string[]) => {
    return fields.map((key) => {
      return check(key, `Field ${key} is empty`)
        .notEmpty()
    })
  }
}