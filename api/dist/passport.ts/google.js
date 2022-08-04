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
// @ts-ignore
const passport_google_id_token_1 = __importDefault(require("passport-google-id-token"));
const User_1 = __importDefault(require("../models/User"));
const user_1 = __importDefault(require("../services/user"));
// dummy way to check if admin.
// you might have a whitelist of admins.
const isAdmin = (email) => {
    if (email !== 'integrify.io')
        return false;
    return true;
};
const loginWithGoogle = () => {
    return new passport_google_id_token_1.default({
        cliendID: process.env.GOOGLE_CLIENT_ID,
    }, (parsedToken, googleID, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let user = yield user_1.default.findUserByEmail(parsedToken.payload.email);
            console.log('isUserExists:', !!user);
            if (!user) {
                user = {
                    firstName: parsedToken.payload.given_name,
                    lastName: parsedToken.payload.family_name,
                    email: parsedToken.payload.email,
                    role: isAdmin(parsedToken.payload.hd) ? 'ADMIN' : 'USER',
                };
                const newUser = new User_1.default(user);
                yield user_1.default.createUser(newUser);
            }
            // Append user object to req.user
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    }));
};
exports.default = loginWithGoogle;
//# sourceMappingURL=google.js.map