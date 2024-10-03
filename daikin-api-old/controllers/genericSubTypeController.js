const models = require("../models")
const { sequelize, Generic, GenericSubType } = models
const { errorDataTable, errorJson } = require("../helpers/error")
const { getOpenIDFromHeader } = require("../helpers/permission")

const { createLog } = require("../helpers/log")
const { 
    GENERIC_FN, 
    GENERIC_SUBTYPE_ADD, 
    GENERIC_SUBTYPE_EDIT, 
    GENERIC_SUBTYPE_DEL
} = require("../constants/log")

module.exports = {
	async dataTable(req, res) {
		const dataTableObj = {
			"draw": parseInt(req.body.draw),
			"recordsTotal": 0,
			"recordsFiltered": 0,
			"data": [],
			"error": null
		}
		try {
			const pageLimit = parseInt(req.body.length) || 0
			const pageOffset = parseInt(req.body.start) || 0

			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []
	
			const resultRecord = await GenericSubType.findAndCountAll({
				include: [{
					attributes: [
						"Name"
					],
					model: Generic
				}],
				limit: pageLimit,
				offset: pageOffset,
                order: orderArray
			})
			dataTableObj.data = resultRecord.rows
			dataTableObj.recordsFiltered = resultRecord.count
			dataTableObj.recordsTotal = resultRecord.rows.length
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	},
	async list(req, res) {
		try {
			const genericSubType = await GenericSubType.findAll();

			return res.json({ genericSubType })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async create(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { name, detail, generic_id } = req.body
			if(!generic_id){
				throw Error("No Generic!")
			}
			if(!name){
				throw Error("No Name!")
			}
			await GenericSubType.create({ 
				Name: name, 
				Detail: detail,
				GenericID: generic_id,
				CreatedBy: oid
			})
			createLog(req, oid, GENERIC_FN, `${GENERIC_SUBTYPE_ADD} ${name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
    async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const { name, detail, generic_id } = req.body
			const generic_sub = await GenericSubType.findByPk(id)
			if (!generic_sub) {
				throw Error("GenericSubType not exist!")
			}
			if(!generic_id){
				throw Error("No Generic!")
			}
			if(!name){
				throw Error("No Name!")
			}
			generic_sub.Name = name
			generic_sub.Detail = detail
			generic_sub.GenericID = generic_id
			generic_sub.CreatedBy = oid
			await generic_sub.save()
			createLog(req, oid, GENERIC_FN, `${GENERIC_SUBTYPE_EDIT} ${name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const generic_sub = await GenericSubType.findByPk(id)
			if (!generic_sub) {
				throw Error("GenericSubType not exist!")
			}
			await generic_sub.destroy()
			createLog(req, oid, GENERIC_FN, `${GENERIC_SUBTYPE_DEL} ${generic_sub.Name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	}
}