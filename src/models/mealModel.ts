import { Schema, model } from "mongoose";
import IMeal from "../types/MealTypes";

//TODO: make name unique

const MealSchema = new Schema<IMeal>({
   name: { type: String, unique: true, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
});

const mealModel = model("Meal", MealSchema);

export default mealModel;
