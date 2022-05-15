import express, { Request, Response } from "express";
import dotenv from "dotenv";
const dottenvc = dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

//to access the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/meals", require("./routes/mealRoutes"));

app.listen(port, () => {
   console.log("Example app listening on port 5000!");
});
