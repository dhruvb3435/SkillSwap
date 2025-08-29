"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
const zod_1 = require("zod");
function validateBody(schema) {
    return (req, _res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return next(Object.assign(new Error('ValidationError'), { status: 400, details: err.flatten() }));
            }
            next(err);
        }
    };
}
