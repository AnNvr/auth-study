import { Router } from "express";
import {logoutController} from "../controllers/logoutController.js";

const logoutRouter = Router()

logoutRouter.get("/logout", logoutController)

export default logoutRouter