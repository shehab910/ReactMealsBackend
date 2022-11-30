"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserTypes_1 = require("../types/UserTypes");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"],
    },
    email: {
        type: String,
        required: [true, "Please add a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    permission: { type: String, required: true, default: UserTypes_1.permission.USER },
}, { timestamps: true });
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
