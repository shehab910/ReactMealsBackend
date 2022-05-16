import express, { Request, Response } from "express";
import {
   getMeals,
   addMeal,
   updateMeal,
   deleteMeal,
} from "../controllers/mealController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getMeals);

router.post("/", protect, addMeal);

router.put("/:id", protect, updateMeal);

router.delete("/:id", protect, deleteMeal);

export default router;
