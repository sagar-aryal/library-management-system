import express from 'express'
import {
  getAllAuthors,
  createAuthor,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.route('/').get(getAllAuthors).post(verifyAuth, verifyAdmin, createAuthor)
router
  .route('/:authorId')
  .get(verifyAuth, verifyAdmin, getSingleAuthor)
  .put(verifyAuth, verifyAdmin, updateAuthor)
  .delete(verifyAuth, verifyAdmin, deleteAuthor)

export default router
