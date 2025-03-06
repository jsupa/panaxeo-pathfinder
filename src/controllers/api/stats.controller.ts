import type { Request, Response } from 'express'
import { getTime } from '@helper/api/stats.helper'

const index = (_req: Request, res: Response): void => {
  res.apiAddObject('time', getTime())

  res.apiRender()
}

export default { index }
