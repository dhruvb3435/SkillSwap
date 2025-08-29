"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../users/user.model"));
const router = (0, express_1.Router)();
// Simple matcher: find users who can teach X and want to learn Y
router.get('/', async (req, res, next) => {
    try {
        const teach = req.query.teach || undefined;
        const learn = req.query.learn || undefined;
        const query = {};
        if (teach)
            query.skillsTeach = new RegExp(teach, 'i');
        if (learn)
            query.skillsLearn = new RegExp(learn, 'i');
        const results = await user_model_1.default.find(query).limit(50);
        res.json(results);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
