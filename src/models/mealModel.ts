import { Schema, model, connect } from "mongoose";

//TODO: make name unique

interface IMeal {
   name: string;
   description: string;
   price: number;
}

const MealSchema = new Schema<IMeal>({
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
});

const mealModel = model("Meal", MealSchema);

export default mealModel;
