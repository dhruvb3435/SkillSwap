"use strict";
// src/modules/auth/auth.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const user_model_1 = __importDefault(require("../users/user.model"));
async function register(input) {
    const existing = await user_model_1.default.findOne({ email: input.email });
    if (existing) {
        const error = new Error("Email already in use");
        error.status = 409;
        throw error;
    }
    const hash = await bcryptjs_1.default.hash(input.password, 10);
    const user = await user_model_1.default.create({
        email: input.email,
        passwordHash: hash,
        name: input.name,
        skillsTeach: input.skillsTeach || [],
        skillsLearn: input.skillsLearn || [],
        credits: 100,
    });
    const token = signToken(user);
    return { user: sanitize(user), token };
}
async function login(email, password) {
    const user = await user_model_1.default.findOne({ email }).select("+passwordHash");
    if (!user) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }
    const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!ok) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }
    const token = signToken(user);
    return { user: sanitize(user), token };
}
function signToken(user) {
    const secret = env_1.env.JWT_SECRET;
    const options = { expiresIn: env_1.env.JWT_EXPIRES_IN };
    return jsonwebtoken_1.default.sign({ id: String(user._id), email: user.email, name: user.name }, secret, options);
}
function sanitize(user) {
    const u = user.toObject();
    delete u.passwordHash;
    return u;
}
