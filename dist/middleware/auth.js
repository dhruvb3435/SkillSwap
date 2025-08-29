"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function requireAuth(req, _res, next) {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer '))
        return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
    const token = h.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = { id: payload.id, email: payload.email, name: payload.name };
        return next();
    }
    catch {
        return next(Object.assign(new Error('Unauthorized'), { status: 401 }));
    }
}
