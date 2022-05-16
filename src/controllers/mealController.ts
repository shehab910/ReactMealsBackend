import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel";
import { validateBody } from "./controllerUtils";

// @desc  Get meals
// @route GET /api/meals
// @access Public
export const getMeals = asyncHandler(async (req: Request, res: Response) => {
   const meals = await Meal.find();

   res.status(200).json(meals);
});

// @desc  add meal
// @route POST /api/meals
// @access Private(Admin)
export const addMeal = asyncHandler(async (req: Request, res: Response) => {
   const expectedFromBody = ["name", "description", "price"];
   validateBody(expectedFromBody, req, res);

   const meal = await Meal.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
   });

   res.status(200).json(meal);
});

// @desc  Update meal
// @route PUT /api/meals/:id
// @access Private()
export const updateMeal = asyncHandler(async (req: Request, res: Response) => {
   const meal = await Meal.findById(req.params.id);
   if (!meal) {
      res.status(400);
      throw new Error("Meal not found");
   }

   const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });
   res.status(200).json(updatedMeal);
});

// @desc  Delete meal
// @route DELETE /api/meals/:id
// @access Private()
export const deleteMeal = asyncHandler(async (req: Request, res: Response) => {
   const meal = Meal.findById(req.params.id);
   if (!meal) {
      res.status(400);
      throw new Error("Meal not found");
   }
   await meal.deleteOne();

   res.status(200).json({ id: req.params.id });
});
