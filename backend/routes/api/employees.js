import { Router } from "express"
import { getAllEmployees, getEmployeeByID, createEmployee, updateEmployee, deleteEmployee } from "../../controllers/employeesController.js"
import { roles } from "../../config/roles.js"
import { verifyRoles } from "../../middleware/verifyRoles.js"

const employeesRouter = Router()

employeesRouter.route("/employees")
    .get(getAllEmployees)
    .post(verifyRoles(roles.Admin, roles.Editor), createEmployee)
    
    employeesRouter.route("/employees/:id")
    .get(getEmployeeByID)
    .put(verifyRoles(roles.Admin, roles.Editor), updateEmployee)
    .delete(verifyRoles(roles.Admin, roles.Editor), deleteEmployee)

    export default employeesRouter

