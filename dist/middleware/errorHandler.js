"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.notFound = notFound;
exports.errorHandler = errorHandler;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
function notFound(_req, _res, next) {
    const err = new AppError('Not Found', 404);
    next(err);
}
function errorHandler(err, _req, res, _next) {
    const status = err.status || err.statusCode || 500;
    const payload = {
        message: err.message || 'Internal Server Error',
    };
    if (err.details)
        payload.details = err.details;
    res.status(status).json(payload);
}
