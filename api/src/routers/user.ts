import express from 'express'
import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/user'
import verifyAuth from '../middlewares/verifyAuth'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.route('/').get(getAllUsers).post(verifyAuth, verifyAdmin, createUser)
router
  .route('/:userId')
  .get(verifyAuth, verifyAdmin, getSingleUser)
  .put(verifyAuth, verifyAdmin, updateUser)
  .delete(verifyAuth, verifyAdmin, deleteUser)

export default router
