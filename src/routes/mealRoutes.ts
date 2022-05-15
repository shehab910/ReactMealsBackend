import express, { Request, Response } from "express";
import {
   getMeals,
   addMeal,
   updateMeal,
   deleteMeal,
} from "../controllers/mealController";

const router = express.Router();

router.get("/", getMeals);

router.post("/", addMeal);

router.put("/:id", updateMeal);

router.delete("/:id", deleteMeal);

export default router;
