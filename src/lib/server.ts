import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import expressLayouts from 'express-ejs-layouts'
import passport from 'passport'
import morgan from 'morgan'
import { I18n } from 'i18n'
import YAML from 'yaml'

import config from '@config'
import { routes } from '@routes'
import { consola } from 'consola'

import locals from './locals'
import moment from 'moment'
import { EZError } from '@extra'

const i18n = new I18n({
  locales: ['en'],
  extension: '.yml',
  directory: './locales',
  parser: YAML,
  objectNotation: true,
})

morgan.token('flash', (_req: Request, res: Response) => JSON.stringify(res.locals.messages))
morgan.token('body', (req: Request) => JSON.stringify(req.body))
morgan.token('locale', (req: Request) => req.getLocale())

declare module 'express-session' {
  interface SessionData {
    messages?: string[]
  }
}

class Server {
  private app: Express

  constructor() {
    this.app = express()
  }

  public setup(): void {
    this.setDefaults()
  }

  public start(): void {
    try {
      this.app.listen(config.webPort)

      consola.success(`Server listening on port ${config.webPort}`)
    } catch (error) {
      consola.error(error)
    }
  }

  private setDefaults(): void {
    this.app.set('trust proxy', 1)
    this.app.use(i18n.init)

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser(config.sessionSecret))
    this.app.use(sessionConfig)

    this.app.use(expressLayouts)
    this.app.use(express.static('./public'))
    this.app.set('view engine', 'pug')
    this.app.set('views', './views')
    this.app.set('layout', './template')
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.use(locals)

    this.app.use(morgan(':remote-addr | :locale :method (:status) :url | (:response-time ms) :flash :body'))

    this.app.use('/', routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

const store = MongoStore.create({
  mongoUrl: config.mongoUri,
  collectionName: 'sessions',
})

const sessionConfig = session({
  secret: config.sessionSecret,
  name: 'oreo',
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    // secure: true,
    maxAge: moment.duration(1, 'month').asMilliseconds(),
  },
})

const notFound = (req: Request, res: Response) => {
  res.setTemplate('errors/index')
  throw new EZError('error.404'.t)
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const field = err.field || 'error'
  res.locals.messages[field] = err.message

  if (res.locals.eztemplate) res.renderino()
  else res.json({ error: err.message, field })
}

const origin = (req: Request) => req.headers?.referer || req.headers?.origin || false

export default new Server()
