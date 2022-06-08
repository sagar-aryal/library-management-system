import mongoose, { Document, Schema } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  borrowedBooks: string[]
}

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

  password: {
    type: String,
    required: [true, 'please add last name'],
    minlength: [8, 'password is 8 characters long.'],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  borrowedBooks: {
    type: [Schema.Types.ObjectId],
    ref: 'Book',
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
