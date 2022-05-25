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
      ISBN,
      title,
      description,
      category,
      publisher,
      publishedDate,
      authors,
      status,
      borrowerId,
      borrowDate,
      returnDate,
    } = req.body

    const book = new Book({
      ISBN,
      title,
      description,
      category,
      publisher,
      publishedDate,
      authors,
      status,
      borrowerId,
      borrowDate,
      returnDate,
    })

    await BookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    get all books
// @route   GET /api/v1/books
// @access  public

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.find())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// @desc    get single books
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
