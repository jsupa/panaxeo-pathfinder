import type { Request, Response } from 'express'

const index = (_req: Request, res: Response): void => {
  res.setTemplate('home/index')
  // res.withoutLayout()
  res.setLocals('title', 'Waaa')
  res.renderino()
}

export default {
  index,
}
