import express from 'express'
import homeRouter from '@routes/home.router'

export const routes = express.Router()

routes.use('/', homeRouter)
