"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const service = __importStar(require("./user.service"));
const dto_1 = require("../../schemas/dto");
const validate_1 = require("../../utils/validate");
const router = (0, express_1.Router)();
router.get('/me', auth_1.requireAuth, async (req, res, next) => {
    try {
        const me = await service.getById(req.user.id);
        res.json(me);
    }
    catch (err) {
        next(err);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const u = await service.getById(req.params.id);
        res.json(u);
    }
    catch (err) {
        next(err);
    }
});
router.put('/:id', auth_1.requireAuth, (0, validate_1.validateBody)(dto_1.UpdateUserSchema), async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id)
            return next(Object.assign(new Error('Forbidden'), { status: 403 }));
        const u = await service.updateById(req.params.id, req.body);
        res.json(u);
    }
    catch (err) {
        next(err);
    }
});
router.get('/', async (req, res, next) => {
    try {
        const users = await service.searchBySkill(req.query.skill);
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
