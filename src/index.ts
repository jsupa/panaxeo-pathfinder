import mongoose from 'mongoose'
import { consola } from 'consola'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import server from '@lib/server'
import config from '@config'
import './prototype'

TimeAgo.addDefaultLocale(en)

const init = async () => {
  mongoose.set('strictQuery', true)

  try {
    consola.start('Connecting to MongoDB...')
    await mongoose.connect(config.mongoUri)
    consola.success('Connected to MongoDB')

    server.setup()
    server.start()
  } catch (error: any) {
    consola.error(error)

    process.exit(1)
  }
}

init()
