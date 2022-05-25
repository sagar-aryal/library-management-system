import express from 'express'
import {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookId').get(getSingleBook).put(updateBook).delete(deleteBook)

export default router
