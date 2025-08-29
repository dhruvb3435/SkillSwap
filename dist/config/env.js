"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().default(4000),
    MONGODB_URI: zod_1.z.string().min(1, 'MONGODB_URI is required'),
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET must be at least 32 chars'),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    CORS_ORIGIN: zod_1.z.string().optional(),
});
exports.env = schema.parse(process.env);
