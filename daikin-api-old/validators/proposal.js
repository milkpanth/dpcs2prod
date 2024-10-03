const Joi = require('joi')

const addSection = Joi.object({
    name: Joi.string()
        .required()
        .label("Name")
}).unknown();

const editSection = Joi.object({
    id: Joi.number()
        .required()
        .label("ID"),
    name: Joi.string()
        .required()
        .label("Name")
}).unknown();

const deleteSection = Joi.object({
    id: Joi.number()
        .required()
        .label("ID")
}).unknown();

const orderSection = 
Joi.object({
    orderList: Joi.array().options({ abortEarly: false }).items(Joi.number()),
    activeList: Joi.array().options({ abortEarly: false }).items(
        Joi.object({
        sectionId: Joi.number()
            .required()
            .label("sectionID"),
        active: Joi.boolean()
            .required()
            .label("Active")
    })),
    activeSubList: Joi.array().options({ abortEarly: false }).items(
        Joi.object({
        subId: Joi.number()
            .required()
            .label("subID"),
        active: Joi.boolean()
            .required()
            .label("Active")
    }))
})

module.exports = { addSection, editSection, deleteSection, orderSection }