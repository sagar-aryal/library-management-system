import mongoose, { Document, Schema } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  biography: string
  books: string[]
}

const authorSchema = new mongoose.Schema({
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

  biography: {
    type: String,
    required: [true, 'please author description'],
    maxlength: [2000, 'last name cannot be more than 2000 characters'],
  },

  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
