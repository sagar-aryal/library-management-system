"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import lusca from 'lusca' will be used later
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const movie_1 = __importDefault(require("./routers/movie"));
const book_1 = __importDefault(require("./routers/book"));
const user_1 = __importDefault(require("./routers/user"));
const author_1 = __importDefault(require("./routers/author"));
const auth_1 = __importDefault(require("./routers/auth"));
const google_1 = __importDefault(require("./passport.ts/google"));
const apiErrorHandler_1 = __importDefault(require("./middlewares/apiErrorHandler"));
const apiContentType_1 = __importDefault(require("./middlewares/apiContentType"));
dotenv_1.default.config({ path: '.env' });
const app = express_1.default();
// Express configuration
app.set('port', process.env.PORT || 3000);
// Global middleware
app.use(apiContentType_1.default);
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(passport_1.default.initialize());
passport_1.default.use(google_1.default());
// Set up routers
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/movies', movie_1.default);
app.use('/api/v1/books', book_1.default);
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/authors', author_1.default);
// Custom API error handler
app.use(apiErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map