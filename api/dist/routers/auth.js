"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/auth prefix
router.post('/google-login', passport_1.default.authenticate('google-id-token', { session: false }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, secrets_1.JWT_SECRET, {
        expiresIn: '1h',
    });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.json({
        message: 'Successfully logged in',
        token,
    });
});
router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map