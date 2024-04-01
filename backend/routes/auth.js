import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { validate } from "../middleware/validator.js";

const loginSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
};

const authRouter = Router();

authRouter.post("/auth", validate({ body: loginSchema }), authController);

export default authRouter;
