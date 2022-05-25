import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const find = async (): Promise<UserDocument[]> => {
  return User.find().sort({ lastName: 1, createdDate: -1 })
}

const findById = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findByIdAndUpdate = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findByIdAndDelete = async (
  userId: string
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
}
