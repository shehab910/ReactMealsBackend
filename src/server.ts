import express, { Request, Response, Errback, NextFunction } from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
const dottenvc = dotenv.config();
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
import mealRouter from "./routes/mealRoutes";
import userRouter from "./routes/userRoutes";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({ origin: "*", credentials: true }));

//to access the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/meals", mealRouter);

app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});
