import { Router } from "express";
import { registerController } from "../controllers/registerController.js";

const registerRouter = Router();

registerRouter.post("/register", registerController);

export default registerRouter;
