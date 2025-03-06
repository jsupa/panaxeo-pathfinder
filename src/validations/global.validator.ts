import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) return next()

  const errorsArray = errors.array().map((error: any) => ({
    field: error.path,
    message: String(error.msg).t,
    value: error.value,
    location: error.location,
  }))

  // TODO: need refactor
  res.status(400).json({ errors: errorsArray })
}
