import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  SSN: string
  firstName: string
  lastName: string
  address: string
  email: string
  password: string
  role: string
  createdDate: Date
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const userSchema = new mongoose.Schema({
  SSN: {
    type: String,
    unique: true,
    required: [true, 'please add SSN'],
  },

  firstName: {
    type: String,
    required: [true, 'please add first name'],
    maxlength: [20, 'first name cannot be more than 20 characters'],
  },

  lastName: {
    type: String,
    required: [true, 'please add last name'],
    maxlength: [20, 'last name cannot be more than 20 characters'],
  },

  email: {
    type: String,
    required: [true, 'please add email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please use a valid email address',
    ],
  },

  password: {
    type: String,
    required: [true, 'please add last name'],
    minlength: [8, 'password is 8 characters long.'],
  },

  role: {
    type: String,
    enum: Role,
    default: Role.User,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
