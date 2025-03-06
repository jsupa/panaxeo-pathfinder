import { EZError } from '@extra'
import type { Request, Response } from 'express'

const index = (_req: Request, res: Response): void => {
  throw new EZError('This is an error', 'username')
}

export default { index }
