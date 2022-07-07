import Author, { AuthorDocument } from '../models/Author'
import { ForbiddenError, NotFoundError } from '../helpers/apiError'

const createAuthor = async (
  author: AuthorDocument
): Promise<AuthorDocument> => {
  const newAuthor = await author.save()
  return newAuthor
}

const getAllAuthors = async (): Promise<AuthorDocument[]> => {
  return Author.find().sort({ lastName: 1 }).populate('books')
}

const getSingleAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findById(authorId)

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  return foundauthor
}

const updateAuthor = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  return foundauthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundauthor = await Author.findById(authorId)

  if (!foundauthor) {
    throw new NotFoundError(`author ${authorId} not found`)
  }

  if (foundauthor.books.length > 0) {
    throw new ForbiddenError(`author ${authorId} cannot be deleted.`)
  }

  return foundauthor.delete()
}

export default {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
}
