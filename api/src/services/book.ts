import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const find = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1, publishedDate: -1 })
}

const findById = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByIdAndUpdate = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndUpdate(bookId, update)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByIdAndDelete = async (
  bookId: string
): Promise<BookDocument | null> => {
  const foundBook = await Book.findByIdAndDelete(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

export default {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
}
