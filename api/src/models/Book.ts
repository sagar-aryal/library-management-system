import mongoose, { Document, Schema } from 'mongoose'

export enum Caterogy {
  Fiction = 'fiction',
  Nonfiction = 'nonfiction',
  Drama = 'drama',
  Poetry = 'poetry',
  Folktale = 'folktale',
}

export enum Status {
  Available = 'available',
  Borrowed = 'borrowed',
}

export type BookDocument = Document & {
  ISBN: string
  title: string
  description: string
  category: string
  publisher: string
  publishedDate: Date
  authors: string[]
  status: string
  borrowerId: string[]
  borrowDate: Date
  returnDate: Date
}

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    index: true,
    unique: true,
    required: [true, 'please add ISBN'],
  },

  title: {
    type: String,
    index: true,
    trim: true,
    required: [true, 'please add title'],
  },

  description: {
    type: String,
    required: [true, 'please add description'],
    maxlength: [500, 'name cannot be more than 500 characters'],
  },

  category: {
    type: String,
    required: [true, 'please add category'],
    enum: Caterogy,
  },

  publisher: {
    type: String,
  },

  publishedDate: {
    type: Date,
    required: [true, 'please add publishedDate'],
  },

  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],

  status: {
    type: String,
    enum: Status,
    default: Status.Available,
  },

  borrowerId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  borrowerDate: {
    type: Date,
    default: Date.now(),
  },

  returnDate: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
