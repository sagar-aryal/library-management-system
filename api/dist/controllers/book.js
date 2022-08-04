"use strict";
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
exports.searchBook = exports.returnBook = exports.borrowBook = exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const book_1 = __importDefault(require("../services/book"));
const apiError_1 = require("../helpers/apiError");
// @desc    crete a new book
// @route   POST /api/v1/books
// @access  private
exports.createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isbn, title, description, category, publisher, publishedDate, status, authors, } = req.body;
        const book = new Book_1.default({
            isbn,
            title,
            description,
            category,
            publisher,
            publishedDate,
            status,
            authors,
        });
        yield book_1.default.createBook(book);
        res.json(book);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    get all books with pagination
// @route   GET /api/v1/books
// @access  public
exports.getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.query;
        res.json(yield book_1.default.getAllBooks(page, limit));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    get single book
// @route   GET /api/v1/books/:bookId
// @access  public
exports.getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield book_1.default.getSingleBook(req.params.bookId));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    update book
// @route   PUT /api/v1/books/:bookId
// @access  private
exports.updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const bookId = req.params.bookId;
        const updatedBook = yield book_1.default.updateBook(bookId, update);
        res.json(updatedBook);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    delete book
// @route   Delete /api/v1/books/:bookId
// @access  private
exports.deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_1.default.deleteBook(req.params.bookId);
        res.status(204).end();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    add borrowedBook
// @route   POST /api/v1/books/:bookId/borrow
// @access  private
exports.borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const userId = req.body.borrowerId;
        console.log(userId);
        const updatedBook = yield book_1.default.borrowBook(bookId, userId);
        res.json(updatedBook);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    add returnBook
// @route   POST /api/v1/books/:bookId/return
// @access  private
exports.returnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const userId = req.body.borrowerId;
        const updatedBook = yield book_1.default.returnBook(bookId, userId);
        res.json(updatedBook);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// @desc    get filtered book
// @route   GET /api/v1/books/filter?isbn=..&title=...&status
// @access  public
/* export const filterBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
     const { isbn, title, category, authors, status, page, limit } =
      req.query as {
        [key: string]: string
      }
    res.json(
      await BookService.filterBook(
        searchKey
         isbn,
        title,
        category,
        authors,
        status,
        page,
        limit
      )
    )
  
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
} */
// @desc    get searched book
// @route   GET /api/v1/books/searchBook/keywords
// @access  public
exports.searchBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchByKeywords = req.params.keywords;
        res.json(yield book_1.default.searchBook(searchByKeywords));
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=book.js.map