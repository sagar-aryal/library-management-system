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
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../helpers/apiError");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user.save();
    return newUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find().sort({ lastName: 1 }).populate('borowedBooks');
    return users;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId).populate('borowedBooks');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
const updateUser = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndUpdate(userId, update, {
        new: true,
    }).populate('borowedBooks');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    return foundUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId).populate('borowedBooks');
    if (!foundUser) {
        throw new apiError_1.NotFoundError(`User ${userId} not found`);
    }
    if (foundUser.borrowedBooks.length > 0) {
        if (!foundUser) {
            throw new apiError_1.ForbiddenError(`User ${userId} cannot be deleted`);
        }
    }
    return foundUser.delete();
});
// for google-login authentication
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    return user;
});
exports.default = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    findUserByEmail,
};
//# sourceMappingURL=user.js.map