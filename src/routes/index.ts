import express from 'express'
import homeRouter from '@routes/home.router'

export const routes = express.Router()

routes.use('/', homeRouter)

import apiStatsRouter from '@routes/api/stats.router'
import apiErrorRouter from '@routes/api/error.router'

routes.use('/api/stats', apiStatsRouter)
routes.use('/api/error', apiErrorRouter)
