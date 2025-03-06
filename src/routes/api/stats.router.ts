import express from 'express'
import controller from '@controller/api/stats.controller'

const router = express.Router()

router.get('/', controller.index)

export default router
