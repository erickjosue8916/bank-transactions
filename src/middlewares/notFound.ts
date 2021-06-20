import { HttpStatusCode as StatusCode } from '../repositories/enums/httpStatusCode'

export const notFound = (_req, res) => {
  return res
    .status(StatusCode.NOT_FOUND)
    .json({ status: StatusCode.NOT_FOUND, message: `Unable to find endpoint` })
}
