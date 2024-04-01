import { Router } from "express";
import { registerController } from "../controllers/registerController.js";
import { validate } from "../middleware/validator.js";

// User registration schema
const userRegistrationSchema = {
    type: "object",
    required: ["username", "password"],
    properties: {
        username: { type: "string", minLength: 3 },
        password: { type: "string", minLength: 6 },
    },
};

const registerRouter = Router();

registerRouter.post("/register", validate({ body: userRegistrationSchema }), registerController);

export default registerRouter;
