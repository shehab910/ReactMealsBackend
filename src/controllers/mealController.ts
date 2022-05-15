import { Request, Response } from "express";

// @desc  Get meals
// @route GET /api/meals
// @access Public
export const getMeals = (req: Request, res: Response) => {
   res.status(200).json({
      message: "Meals were fetched",
   });
};

// @desc  add meal
// @route POST /api/meals
// @access Private
export const addMeal = (req: Request, res: Response) => {
   console.log(req.body);

   res.status(200).json({
      message: "Added Meal",
   });
};

// @desc  Update meal
// @route PUT /api/meals/:id
// @access Private
export const updateMeal = (req: Request, res: Response) => {
   res.status(200).json({
      message: `Updated meal with id ${req.params.id}`,
   });
};

// @desc  Delete meal
// @route DELETE /api/meals/:id
// @access Private
export const deleteMeal = (req: Request, res: Response) => {
   res.status(200).json({
      message: `Deleted Meal with id ${req.params.id}`,
   });
};
