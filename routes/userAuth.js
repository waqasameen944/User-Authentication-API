import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";

//👉 router object
const router = express.Router();

//👉 routes

//👉  POST /register
router.post("/register", userRegister);

//👉  POST /login
router.post("/login", userLogin);

export default router;
