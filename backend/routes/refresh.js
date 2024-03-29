import { Router } from "express";
import {handleRefreshToken} from "../controllers/refreshTokenController.js"

const refreshRouter = Router()

refreshRouter.get("/refresh", handleRefreshToken)

export default refreshRouter