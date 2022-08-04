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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'please add first name'],
        maxlength: [20, 'first name cannot be more than 20 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'please add last name'],
        maxlength: [20, 'last name cannot be more than 20 characters'],
    },
    email: {
        type: String,
        required: [true, 'please add email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email address',
        ],
    },
    role: {
        type: String,
        enum: Role,
        default: Role.USER,
        require: true,
    },
    borrowedBooks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map