"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const error = {
        error: {
            message: err.message,
            status: res.statusCode,
            stack: process.env.NODE_ENV !== "development" ? null : err.stack,
        },
    };
    res.status(res.statusCode || 500).json(error);
};
exports.errorHandler = errorHandler;
