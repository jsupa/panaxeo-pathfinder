import City from '@model/city.model'
import type { Request, Response } from 'express'

const index = async (_req: Request, res: Response) => {
  res.setTemplate('home/index')
  res.withoutLayout()

  const cities = await City.find()

  res.setLocals('cities', cities)

  res.renderino()
}

export default {
  index,
}
