import Employee from "../model/employee.js";

export const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees)
        return res.status(204).json({
            message: "No employees found.",
        });
    res.json(employees);
};

export const getEmployeeByID = async (req, res) => {
    // check if the ID exists
    if (!req?.params?.id)
        return res.status(400).json({
            message: "Employee ID required",
        });
    // test passed - now search for the employee
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({
            message: `Employee ID ${req.params.id} not found`,
        });
    }
    res.json(employee);
};

export const createEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({
            message: "First and last name are required"
        })
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error" });
    }
}


export const updateEmployee = async (req, res) => {
    const id = req.params.id;

    if (!id) return res.status(400).json({
        message: "ID parameter is required"
    });

    const employee = await Employee.findOne({ _id: id}).exec()

    if (!employee) return res.status(204).json({
        message: `No employee matches ID ${id}.`
    })

    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save()
    res.json(result)
}

export const deleteEmployee = async (req, res) => {
    const id = req.params.id;

    if (!id) return res.status(400).json({
        message: "ID parameter is required"
    });

    const employee = await Employee.findOne({ _id: id}).exec()

    if (!employee) return res.status(204).json({
        message: `No employee matches ID ${id}.`
    })
    
    const result = await employee.deleteOne({ _id: req.params.id });
    res.json(result);
};