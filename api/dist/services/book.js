"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = __importStar(require("../models/Book"));
const User_1 = __importDefault(require("../models/User"));
const Author_1 = __importDefault(require("../models/Author"));
const apiError_1 = require("../helpers/apiError");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(book);
    const newBook = yield book.save();
    let i;
    for (i = 0; i < newBook.authors.length; i++) {
        const authorId = newBook.authors[i];
        const foundAuthor = yield Author_1.default.findById(authorId);
        if (!foundAuthor) {
            throw new apiError_1.NotFoundError(`Author ${authorId} not found`);
        }
        foundAuthor.books.push(newBook._id);
        yield foundAuthor.save();
    }
    return newBook;
});
const getAllBooks = (pageNum, limitNum) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(pageNum) || 1;
    const limit = parseInt(limitNum) || 10;
    const skip = (page - 1) * limit;
    return Book_1.default.find()
        .sort({ title: 1, publishedDate: -1 })
        .limit(limit)
        .skip(skip);
});
const getSingleBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findById(bookId);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const updateBook = (bookId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, update);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.findByIdAndDelete(bookId);
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    return foundBook;
});
const borrowBook = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const returnDate = new Date(new Date().getDate() + 14);
    const bookUpdate = {
        status: Book_1.Status.BORROWED,
        borrowerId: userId,
        borrowDate: new Date(),
        returnDate,
    };
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, bookUpdate, {
        new: true,
    });
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    const foundUser = yield User_1.default.findById(userId);
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`Book ${userId} not found`);
    }
    if (foundUser.borrowedBooks.indexOf(bookId) == -1) {
        foundUser.borrowedBooks.push(bookId);
        yield foundUser.save();
    }
    return foundBook;
});
const returnBook = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookUpdate = {
        $set: {
            status: Book_1.Status.AVAILABLE,
        },
        $unset: {
            borrowerId: null,
            borrowDate: null,
            returnDate: null,
        },
    };
    const foundBook = yield Book_1.default.findByIdAndUpdate(bookId, bookUpdate, {
        new: true,
    });
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book ${bookId} not found`);
    }
    const foundUser = yield User_1.default.findById(userId);
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`Book ${userId} not found`);
    }
    if (foundUser.borrowedBooks.indexOf(bookId) != -1) {
        foundUser.borrowedBooks = foundUser.borrowedBooks.filter((book) => book != bookId);
        yield foundUser.save();
    }
    return foundBook;
});
/* const filterBook = async (
  isbn: string,
  title: string,
  category: string,
  authors: string[],
  status: string,
  pageNum: string,
  limitNum: string
): Promise<BookDocument[]> => {
  let titleQuery = {}
  let authorQuery = {}
  let isbnQuery = {}
  let statusQuery = {}
  let categoryQuery = {}
  const andArray: any[] = []

  if (title) {
    titleQuery = { title: { $regex: `${title}`, $options: 'i' } }
    andArray.push(titleQuery)
  }
  if (authors) {
    const foundAuthors = await Author.find({
      $or: [
        {
          firstName: { $regex: `${authors}`, $options: 'i' },
        },
        {
          lastName: { $regex: `${authors}`, $options: 'i' },
        },
      ],
    })
    const authorIds = foundAuthors.map((authorDoc) => authorDoc._id)
    authorQuery = { authors: { $in: authorIds } }
    andArray.push(authorQuery)
  }
  if (isbn) {
    isbnQuery = { isbn: { $regex: `${isbn}`, $options: 'i' } }
    andArray.push(isbnQuery)
  }
  if (status) {
    statusQuery = { status: { $regex: `${status}`, $options: 'i' } }
    andArray.push(statusQuery)
  }

  if (category) {
    categoryQuery = { status: { $regex: `${status}`, $options: 'i' } }
    andArray.push(categoryQuery)
  }
  const page = parseInt(pageNum) || 1
  const limit = parseInt(limitNum) || 10
  const skip = (page - 1) * limit
  return Book.find()
    .sort({ title: 1, publishedDate: -1 })
    .limit(limit)
    .skip(skip)
} */
const searchBook = (searchByKeywords) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBook = yield Book_1.default.find({
        $or: [
            { isbn: { $regex: searchByKeywords } },
            { title: { $regex: searchByKeywords } },
            { category: { $regex: searchByKeywords } },
            { publisher: { $regex: searchByKeywords } },
            { title: { $regex: searchByKeywords } },
        ],
    });
    if (!foundBook) {
        throw new apiError_1.NotFoundError(`Book with keyword ${searchByKeywords} not found`);
    }
    return foundBook;
});
exports.default = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    searchBook,
};
//# sourceMappingURL=book.js.map