import { Validator, ValidationError } from "express-json-validator-middleware";

// Create validator object to configure the validator in a variable
const validator = new Validator()

// Export the middleware for use in endpoints
export const validate = validator.validate

// Export error handling middleware
export const validateErrorMiddleware = (err, req, res, next) => {
    if (res.headersSent) return next(err)

    const isValidationError = err instanceof ValidationError
    if (!isValidationError) return next(err)

    res.status(400).json({
        status: 400,
        message: "Validation Error Ongoing",
        errors: err.validationErrors
    })

    next()
}