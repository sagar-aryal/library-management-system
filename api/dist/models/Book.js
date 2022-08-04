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
exports.Status = exports.Caterogy = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var Caterogy;
(function (Caterogy) {
    Caterogy["DRAMA"] = "DRAMA";
    Caterogy["FICTION"] = "FICTION";
    Caterogy["FOLKTALE"] = "FOLKTALE";
    Caterogy["NONFICTION"] = "NONFICTION";
    Caterogy["POETRY"] = "POETRY";
})(Caterogy = exports.Caterogy || (exports.Caterogy = {}));
var Status;
(function (Status) {
    Status["AVAILABLE"] = "AVAILABLE";
    Status["BORROWED"] = "BORROWED";
})(Status = exports.Status || (exports.Status = {}));
const bookSchema = new mongoose_1.default.Schema({
    isbn: {
        type: String,
        index: true,
        unique: [true, 'please add unique ISBN'],
        required: [true, 'please add ISBN'],
    },
    title: {
        type: String,
        index: true,
        trim: true,
        required: [true, 'please add title'],
    },
    description: {
        type: String,
        required: [true, 'please add description'],
        maxlength: [1500, 'descritpion cannot be more than 500 characters'],
    },
    category: {
        type: String,
        required: [true, 'please add category'],
        enum: Caterogy,
    },
    publisher: {
        type: String,
    },
    publishedDate: {
        type: Number,
        required: [true, 'please add publishedDate'],
    },
    status: {
        type: String,
        enum: Status,
        default: Status.AVAILABLE,
    },
    authors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Author',
            required: [true, 'please add authors'],
        },
    ],
    borrowerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model('Book', bookSchema);
//# sourceMappingURL=Book.js.map