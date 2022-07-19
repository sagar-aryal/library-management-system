import express from 'express'
import {
  getAllBooks,
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  searchBook,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
/* router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookId').get(getSingleBook).put(updateBook).delete(deleteBook) */

router.get('/', getAllBooks)
router.get('/search/:keywords', searchBook)
router.get('/:bookId', getSingleBook)

router.post('/', createBook)
router.post('/:bookId/borrow', borrowBook)
router.post('/:bookId/return', returnBook)

router.put('/:bookId', updateBook)
router.delete('/:bookId', deleteBook)

export default router
