const Joi = require('joi')

const addUser = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .label("Email"),
    givenName: Joi.string()
        .required()
        .label("Name"),
    surname: Joi.string()
        .required()
        .label("Surname"),
    /*CompanyCode: Joi.string()
            .required()
            .label("CompanyCode"),
    CompanyName: Joi.string()
            .required()
            .label("CompanyName"),*/
    usageLocation: Joi.string()
        .max(2)
        .required()
        .label("Country")
    
}).unknown()

module.exports = { addUser }