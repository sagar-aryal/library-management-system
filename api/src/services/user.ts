import User, { UserDocument } from '../models/User'
import { ForbiddenError, NotFoundError } from '../helpers/apiError'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  const newUser = await user.save()
  return newUser
}

const getAllUsers = async (): Promise<UserDocument[]> => {
  const users = await User.find().sort({ lastName: 1 }).populate('borowedBooks')
  return users
}

const getSingleUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findById(userId).populate('borowedBooks')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const updateUser = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  }).populate('borowedBooks')

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findById(userId).populate('borowedBooks')
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  if (foundUser.borrowedBooks.length > 0) {
    if (!foundUser) {
      throw new ForbiddenError(`User ${userId} cannot be deleted`)
    }
  }

  return foundUser.delete()
}

// for google-login authentication
const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })
  return user
}

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  findUserByEmail,
}
