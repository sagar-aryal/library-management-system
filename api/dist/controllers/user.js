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
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
// @desc    crete a new user
// @route   POST /api/v1/users
// @access  public
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, role } = req.body;
        const user = new User_1.default({
            firstName,
            lastName,
            email,
            role,
        });
        yield user_1.default.createUser(user);
        res.json(user);
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
// @desc    get all users
// @route   GET /api/v1/users
// @access  private
exports.getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.getAllUsers());
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
// @desc    get single user
// @route   GET /api/v1/users/:userId
// @access  private
exports.getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_1.default.getSingleUser(req.params.userId));
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
// @desc    update user
// @route   PUT /api/v1/users/:userId
// @access  private
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = yield user_1.default.updateUser(userId, update);
        res.json(updatedUser);
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
// @desc    delete user
// @route   Delete /api/v1/users/:userId
// @access  private
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.deleteUser(req.params.userId);
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
//# sourceMappingURL=user.js.map