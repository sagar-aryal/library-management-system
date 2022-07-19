import mongoose, { Document, Schema } from 'mongoose'

export enum Caterogy {
  DRAMA = 'DRAMA',
  FICTION = 'FICTION',
  FOLKTALE = 'FOLKTALE',
  NONFICTION = 'NONFICTION',
  POETRY = 'POETRY',
}

export enum Status {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
}

export type Book = {
  isbn: string
  title: string
  description: string
  category: string
  publisher: string
  publishedDate: number
  status: string
  authors: string[]
  borrowerId: string
  borrowDate: Date
  returnDate: Date
}

export type BookDocument = Book & Document

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    index: true,
    unique: [true, 'please add unique ISBN'],
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
    maxlength: [1500, 'descritpion cannot be more than 500 characters'],
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
    type: Number,
    required: [true, 'please add publishedDate'],
  },

  status: {
    type: String,
    enum: Status,
    default: Status.AVAILABLE,
  },

  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'please add authors'],
    },
  ],

  borrowerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  borrowDate: {
    type: Date,
  },

  returnDate: {
    type: Date,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
