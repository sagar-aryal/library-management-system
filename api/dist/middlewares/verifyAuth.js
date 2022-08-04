"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = require("../helpers/apiError");
function verifyAuth(req, res, next) {
    try {
        const auth = req.headers.authorization || '';
        const token = auth.split(' ')[1];
        const JWT_SECRET = process.env.JWT_SECRET;
        const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.log('error:', error);
        throw new apiError_1.ForbiddenError();
    }
}
exports.default = verifyAuth;
//# sourceMappingURL=verifyAuth.js.map