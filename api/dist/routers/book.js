"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/books prefix
/* router.route('/').get(getAllBooks).post(createBook)
router.route('/:bookId').get(getSingleBook).put(updateBook).delete(deleteBook) */
router.get('/', book_1.getAllBooks);
router.get('/search/:keywords', book_1.searchBook);
router.get('/:bookId', book_1.getSingleBook);
router.post('/', book_1.createBook);
router.post('/:bookId/borrow', book_1.borrowBook);
router.post('/:bookId/return', book_1.returnBook);
router.put('/:bookId', book_1.updateBook);
router.delete('/:bookId', book_1.deleteBook);
exports.default = router;
//# sourceMappingURL=book.js.map