const Joi = require('joi')

const uploadCompanyProfile = Joi.object({
    company_code: Joi.string()
        .required()
        .label("CompanyCode"),
    /*company_name: Joi.string()
        .required()
        .label("CompanyName"),*/
    language: Joi.string()
        .min(2)
        .max(2)
        .required()
        .label("Language"),
    blobName: Joi.string()
        .required()
        .label("File")
}).unknown()

module.exports = { uploadCompanyProfile }