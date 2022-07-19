import mongoose, { Document, Schema } from 'mongoose'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  firstName: string
  lastName: string
  email: string
  role: string
  borrowedBooks: string[]
}

export type UserDocument = Document & User

const userSchema = new mongoose.Schema({
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

  role: {
    type: String,
    enum: Role,
    default: Role.USER,
    require: true,
  },

  borrowedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
