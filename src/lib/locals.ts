import type { Request, Response, NextFunction } from 'express'

const locals = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.apiObject = {}
  res.locals.messages = {}

  res.apiAddObject = (key: string, value: any) => (res.locals.apiObject[key] = value)
  res.apiRender = () => res.json({ ...res.locals.apiObject })

  res.setTemplate = (template: string) => (res.locals.eztemplate = template)
  res.withoutLayout = () => (res.locals.withoutLayout = true)
  res.setLocals = (key: string, value: any) => (res.locals[key] = value)
  res.renderino = () => res.render(res.locals.eztemplate, { layout: res.locals.withoutLayout ? false : './template' })

  stringTranslate(req)

  next()
}

export default locals

const stringTranslate = (req: Request) => {
  if ('t' in String.prototype) {
    delete (String.prototype as any).t
  }

  Object.defineProperty(String.prototype, 't', {
    get: function () {
      return req.__(this) as string
    },
    configurable: true,
  })
}
