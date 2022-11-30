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
exports.deleteMeal = exports.updateMeal = exports.addMeal = exports.getMeals = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mealModel_1 = __importDefault(require("../models/mealModel"));
const controllerUtils_1 = require("./controllerUtils");
// @desc  Get meals
// @route GET /api/meals
// @access Public
exports.getMeals = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meals = yield mealModel_1.default.find();
    res.status(200).json(meals);
}));
// @desc  add meal
// @route POST /api/meals
// @access Private(Admin)
exports.addMeal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user is an admin
    (0, controllerUtils_1.validateAdmin)(res);
    const expectedFromBody = ["name", "description", "price"];
    (0, controllerUtils_1.validateBody)(expectedFromBody, req, res);
    const meal = yield mealModel_1.default.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    res.status(200).json(meal);
}));
// @desc  Update meal
// @route PUT /api/meals/:id
// @access Private()
exports.updateMeal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user is an admin
    (0, controllerUtils_1.validateAdmin)(res);
    const meal = yield mealModel_1.default.findById(req.params.id);
    if (!meal) {
        res.status(400);
        throw new Error("Meal not found");
    }
    const updatedMeal = yield mealModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedMeal);
}));
// @desc  Delete meal
// @route DELETE /api/meals/:id
// @access Private()
exports.deleteMeal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user is an admin
    (0, controllerUtils_1.validateAdmin)(res);
    const meal = mealModel_1.default.findById(req.params.id);
    if (!meal) {
        res.status(400);
        throw new Error("Meal not found");
    }
    yield meal.deleteOne();
    res.status(200).json({ id: req.params.id });
}));
