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
exports.deleteAuthor = exports.updateAuthor = exports.getSingleAuthor = exports.getAllAuthors = exports.createAuthor = void 0;
const Author_1 = __importDefault(require("../models/Author"));
const author_1 = __importDefault(require("../services/author"));
const apiError_1 = require("../helpers/apiError");
// @desc    crete a new author
// @route   POST /api/v1/authors
// @access  private
exports.createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, biography } = req.body;
        const author = new Author_1.default({
            firstName,
            lastName,
            biography,
        });
        yield author_1.default.createAuthor(author);
        res.json(author);
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
// @desc    get all authors
// @route   GET /api/v1/authors
// @access  private
exports.getAllAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield author_1.default.getAllAuthors());
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
// @desc    get single author
// @route   GET /api/v1/authors/:authorId
// @access  private
exports.getSingleAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.params.authorId;
        res.json(yield author_1.default.getSingleAuthor(authorId));
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
// @desc    update author
// @route   PUT /api/v1/authors/:authorId
// @access  private
exports.updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const authorId = req.params.authorId;
        const updatedAuthor = yield author_1.default.updateAuthor(authorId, update);
        res.json(updatedAuthor);
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
// @desc    delete author
// @route   Delete /api/v1/authors/:authorId
// @access  private
exports.deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorId = req.params.authorId;
        yield author_1.default.deleteAuthor(authorId);
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
//# sourceMappingURL=author.js.map