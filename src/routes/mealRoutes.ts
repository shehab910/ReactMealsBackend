import express, { Request, Response } from "express";
import {
   getMeals,
   addMeal,
   updateMeal,
   deleteMeal,
} from "../controllers/mealController";
import { protectAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getMeals);

router.post("/", protectAdmin, addMeal);

router.put("/:id", protectAdmin, updateMeal);

router.delete("/:id", protectAdmin, deleteMeal);

export default router;
