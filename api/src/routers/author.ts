import express from 'express'
import {
  getAllAuthors,
  createAuthor,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.route('/').get(getAllAuthors).post(createAuthor)
router
  .route('/:authorId')
  .get(getSingleAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor)

export default router
