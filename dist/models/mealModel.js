"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//TODO: make name unique
const MealSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});
const mealModel = (0, mongoose_1.model)("Meal", MealSchema);
exports.default = mealModel;
