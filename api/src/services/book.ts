import Book, { BookDocument, Status } from '../models/Book'
import User from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const find = async (
  pageNum: string,
  limitNum: string
): Promise<BookDocument[]> => {
  const page = parseInt(pageNum) || 1
  const limit = parseInt(limitNum) || 10
  return Book.find()
    .sort({ title: 1, publishedDate: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
}

const findById = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = await Book.findOne({ bookId })

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
  const foundBook = await Book.findOneAndDelete({ bookId })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const borrowBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const returnDate = new Date(new Date().getDate() + 14)

  const bookUpdate = {
    status: Status.BORROWED,
    borrowerId: userId,
    borrowDate: new Date(),
    returnDate,
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  if (foundUser.borrowedBooks.indexOf(bookId) == -1) {
    foundUser.borrowedBooks.push(bookId)
    await foundUser.save()
  }

  return foundBook
}

export const returnBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const bookUpdate = {
    $set: {
      status: Status.AVAILABLE,
    },
    $unset: {
      borrowerId: null,
      borrowDate: null,
      returnDate: null,
    },
  }

  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  if (foundUser.borrowedBooks.indexOf(bookId) != -1) {
    foundUser.borrowedBooks = foundUser.borrowedBooks.filter(
      (book) => book != bookId
    )
    await foundUser.save()
  }

  return foundBook
}

export default {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  borrowBook,
  returnBook,
}
