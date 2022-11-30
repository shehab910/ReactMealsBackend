"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdmin = exports.validateBody = void 0;
const UserTypes_1 = require("../types/UserTypes");
const validateBody = (expectedKeys, req, res) => {
    expectedKeys.forEach((key) => {
        if (!req.body[key]) {
            res.status(400);
            throw new Error(`Please provide the ${key}`);
        }
    });
};
exports.validateBody = validateBody;
const validateAdmin = (res) => {
    if (res.locals.user.permission !== UserTypes_1.permission.ADMIN) {
        res.status(401);
        throw new Error("Unauthorized");
    }
};
exports.validateAdmin = validateAdmin;
