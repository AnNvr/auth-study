import { Router } from "express"
import { getAllUsers, getUserByID, deleteUser } from "../../controllers/usersController.js"
import { roles } from "../../config/roles.js"
import { verifyRoles } from "../../middleware/verifyRoles.js"

const usersRouter = Router();

usersRouter.route("users")
    .get(verifyRoles(roles.Admin), getAllUsers)
    .delete(verifyRoles(roles.Admin), deleteUser)

usersRouter.route('users/:id')
    .get(verifyRoles(roles.Admin), getUserByID)

export default usersRouter
