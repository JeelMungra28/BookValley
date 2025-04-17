const Joi = require("joi");

const rentalValidation = Joi.object({
    bookId: Joi.string().required().messages({
        "any.required": "Book ID is required",
        "string.empty": "Book ID cannot be empty"
    }),
    rentalPeriod: Joi.number().integer().min(1).max(30).required().messages({
        "any.required": "Rental period is required",
        "number.base": "Rental period must be a number",
        "number.min": "Rental period must be at least 1 day",
        "number.max": "Rental period cannot exceed 30 days"
    })
});

module.exports = { rentalValidation };
