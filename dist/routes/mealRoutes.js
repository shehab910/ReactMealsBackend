"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mealController_1 = require("../controllers/mealController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", mealController_1.getMeals);
router.post("/", authMiddleware_1.protect, mealController_1.addMeal);
router.put("/:id", authMiddleware_1.protect, mealController_1.updateMeal);
router.delete("/:id", authMiddleware_1.protect, mealController_1.deleteMeal);
exports.default = router;
