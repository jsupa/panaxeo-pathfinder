import { EZError } from '@extra'
import { Request, Response, NextFunction } from 'express'

export const userIsAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) throw new EZError('error.401'.t)

  next()
}
