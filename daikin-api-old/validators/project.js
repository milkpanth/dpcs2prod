const Joi = require('joi')

const editProject = Joi.object({
    id: Joi.number()
        .required()
        .label("ProjectID"),
    name: Joi.string()
        .required()
        .label("ProjectName"),
    customer: Joi.string()
        .required()
        .label("Customer"),
    address: Joi.string()
        .required()
        .label("Address")
}).unknown()

module.exports = { editProject }