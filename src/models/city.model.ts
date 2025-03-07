import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICity extends Document {
  rank: number
  name: string
  population: number
  longitude: number
  latitude: number
}

export interface ICityModel extends Model<ICity> {}

const schema: Schema = new Schema(
  {
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    population: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const City = mongoose.model<ICity, ICityModel>('City', schema)

export default City
