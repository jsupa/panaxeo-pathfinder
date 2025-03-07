import { consola } from 'consola'
import mongoose from 'mongoose'
import fs from 'fs'
import config from '@config'
import City from '@model/city.model'

const filePath = 'cities_data.csv'

const citiesData = fs.readFileSync(filePath, 'utf8')

const citiesDataArray = citiesData.split('\n')

const citiesDataArrayWithoutHeader = citiesDataArray.slice(1)

const formattedCitiesData = citiesDataArrayWithoutHeader.map((cityData) => {
  const [rank, name, population, longitude, latitude] = cityData.split(',')

  return { rank, name, population, longitude, latitude }
})

const init = async () => {
  mongoose.set('strictQuery', true)

  try {
    consola.start('Connecting to MongoDB...')
    await mongoose.connect(config.mongoUri)
    consola.success('Connected to MongoDB')

    await City.insertMany(formattedCitiesData)
    consola.success('Cities data imported successfully')
  } catch (error: any) {
    consola.error(error)

    process.exit(1)
  }
}

init()
