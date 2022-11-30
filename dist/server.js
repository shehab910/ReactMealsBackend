"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dottenvc = dotenv_1.default.config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
const mealRoutes_1 = __importDefault(require("./routes/mealRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const port = process.env.PORT || 5000;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
//to access the body of the request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/meals", mealRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
