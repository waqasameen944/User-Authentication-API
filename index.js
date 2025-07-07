import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Configure dotenv
dotenv.config();

import dbConnect from "./config/db.js";
import userRoutes from "./routes/userAuth.js";
import userProfile from "./routes/userRoutes.js";
import userAuth from "./middlewares/authMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

//👉 rest object
const app = express();
const PORT = process.env.PORT || 3000;

//👉 db
dbConnect();

//👉 middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//👉 routes
app.use("/api/v1/users", userRoutes);
app.use("/user", userAuth, userProfile);

//👉 errorHandler
app.use(errorMiddleware);

//👉 server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
