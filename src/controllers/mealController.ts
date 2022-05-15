import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// @desc  Get meals
// @route GET /api/meals
// @access Public
export const getMeals = asyncHandler(async (req: Request, res: Response) => {
   res.status(200).json({
      message: "Meals were fetched",
   });
});

// @desc  add meal
// @route POST /api/meals
// @access Private
export const addMeal = asyncHandler(async (req: Request, res: Response) => {
   if (!req.body.text) {
      res.status(400);
      throw new Error("Please provide text");
   }

   res.status(200).json({
      message: "Added Meal",
   });
});

// @desc  Update meal
// @route PUT /api/meals/:id
// @access Private
export const updateMeal = asyncHandler(async (req: Request, res: Response) => {
   res.status(200).json({
      message: `Updated meal with id ${req.params.id}`,
   });
});

// @desc  Delete meal
// @route DELETE /api/meals/:id
// @access Private
export const deleteMeal = asyncHandler(async (req: Request, res: Response) => {
   res.status(200).json({
      message: `Deleted Meal with id ${req.params.id}`,
   });
});
