import { EZError } from '@extra'
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string

  sendWelcomeEmail(): Promise<void>
}

export interface IUserModel extends Model<IUser> {
  getRandomUser(): Promise<IUser>
}

const userSchema: Schema = new Schema(
  {
    username: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  },
)

userSchema.methods.sendWelcomeEmail = async function () {
  const { email } = this

  try {
    // send email logic
    console.log(`Sending welcome email to ${email}`)
  } catch (error: any) {
    throw new EZError('Failed to send welcome email')
  }
}

userSchema.statics.getRandomUser = async function () {
  const user = await User.aggregate([{ $sample: { size: 1 } }])
  return user
}

const User = mongoose.model<IUser, IUserModel>('User', userSchema)

export default User
