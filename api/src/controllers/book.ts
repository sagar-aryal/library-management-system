import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import BookService from '../services/book'
import { BadRequestError } from '../helpers/apiError'

// @desc    crete a new book
// @route   POST /api/v1/books
// @access  private

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      isbn,
      title,
      description,
      category,
      publisher,
      publishedDate,
      author,
      status,
      borrowerId,
      borrowDate,
      returnDate,
    } = req.body

    const book = new Book({
      isbn,
      title,
      description,
      category,
      publisher,
      publishedDate,
      author,
      status,
      borrowerId,
      borrowDate,
      returnDate,
    })

    const createBook = await BookService.create(book)

    res.json({ book: createBook })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    get all books with pagination
// @route   GET /api/v1/books
// @access  public

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query as { [key: string]: string }
    res.json(await BookService.find(page, limit))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    get single book
// @route   GET /api/v1/books/:bookId
// @access  public

export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    update book
// @route   PUT /api/v1/books/:bookId
// @access  private

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await BookService.findByIdAndUpdate(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    delete book
// @route   Delete /api/v1/books/:bookId
// @access  private

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await BookService.findByIdAndDelete(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    add borrowedBook
// @route   POST /api/v1/books/:bookId/borrow
// @access  private

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const userId = req.body.userId
    const updatedBook = await BookService.borrowBook(bookId, userId)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    add returnBook
// @route   POST /api/v1/books/:bookId/return
// @access  private

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const userId = req.body.userId
    const updatedBook = await BookService.returnBook(bookId, userId)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    get filtered book
// @route   GET /api/v1/books/filter?isbn=..&title=...&etc
// @access  public

export const filterBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isbn, title, category, author, status, page, limit } =
      req.query as {
        [key: string]: string
      }
    let authors: string[] = []
    if (author) {
      authors = author.split(',')
    }
    await BookService.filterBook(
      isbn,
      title,
      category,
      authors,
      status,
      page,
      limit
    )
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
