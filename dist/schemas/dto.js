"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchQuerySchema = exports.MessageCreateSchema = exports.CreditTransferSchema = exports.UpdateUserSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    name: zod_1.z.string().min(1),
    skillsTeach: zod_1.z.array(zod_1.z.string()).default([]),
    skillsLearn: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.UpdateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    bio: zod_1.z.string().max(280).optional(),
    avatarUrl: zod_1.z.string().url().optional(),
    timezone: zod_1.z.string().optional(),
    skillsTeach: zod_1.z.array(zod_1.z.string()).optional(),
    skillsLearn: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.CreditTransferSchema = zod_1.z.object({
    toUserId: zod_1.z.string().min(1),
    amount: zod_1.z.number().int().positive(),
});
exports.MessageCreateSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
});
exports.MatchQuerySchema = zod_1.z.object({
    teach: zod_1.z.string().optional(),
    learn: zod_1.z.string().optional(),
});
