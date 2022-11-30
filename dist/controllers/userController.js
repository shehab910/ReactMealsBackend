"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const controllerUtils_1 = require("./controllerUtils");
// @desc  Register new user
// @route POST /api/users
// @access Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expectedFromBody = ["username", "email", "password"];
    (0, controllerUtils_1.validateBody)(expectedFromBody, req, res);
    //check if user exists
    const userExists = yield userModel_1.default.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    //hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
    //create user
    const user = yield userModel_1.default.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201);
        res.json({
            message: "User created successfully",
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateJWT(user.id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data, User not created");
    }
}));
// @desc  Login a user
// @route POST /api/users/login
// @access Public
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expectedFromBody = ["email", "password"];
    (0, controllerUtils_1.validateBody)(expectedFromBody, req, res);
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        res.json({
            message: "Logged in successfully",
            _id: user.id,
            username: user.username,
            email: user.email,
            permission: user.permission,
            token: generateJWT(user.id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}));
// @desc  Get user data
// @route GET /api/users/me
// @access Private
exports.getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, username, email } = res.locals.user;
    res.json({
        _id,
        username,
        email,
    });
}));
// Generate JWT
const generateJWT = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "msaies2!w#", {
        expiresIn: "30d",
    });
};
