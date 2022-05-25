import Author, { AuthorDocument } from '../models/Author'
import { NotFoundError } from '../helpers/apiError'

const create = async (author: AuthorDocument): Promise<AuthorDocument> => {
  return author.save()
}

const find = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ lastName: 1 })
}

const findById = async (authorId: string): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findById(authorId)

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  return foundauthor
}

const findByIdAndUpdate = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findByIdAndUpdate(authorId, update)

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  return foundauthor
}

const findByIdAndDelete = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findByIdAndDelete(authorId)

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  return foundauthor
}

export default {
  create,
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
}
