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
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
/* router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookId').get(getSingleBook).put(updateBook).delete(deleteBook) */

router.get('/', getAllBooks)
router.get('/search/:keywords', searchBook)
router.get('/:bookId', getSingleBook)

router.post('/', verifyAuth, verifyAdmin, createBook)
router.post('/:bookId/borrow', verifyAuth, borrowBook)
router.post('/:bookId/return', verifyAuth, returnBook)

router.put('/:bookId', verifyAuth, verifyAdmin, updateBook)
router.delete('/:bookId', verifyAuth, verifyAdmin, deleteBook)

export default router
