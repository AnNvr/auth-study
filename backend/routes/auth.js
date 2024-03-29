import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post("/auth", authController)

export default authRouter