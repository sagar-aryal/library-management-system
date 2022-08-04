"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = require("../controllers/author");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/authors prefix
router.route('/').get(author_1.getAllAuthors).post(author_1.createAuthor);
router
    .route('/:authorId')
    .get(author_1.getSingleAuthor)
    .put(author_1.updateAuthor)
    .delete(author_1.deleteAuthor);
exports.default = router;
//# sourceMappingURL=author.js.map