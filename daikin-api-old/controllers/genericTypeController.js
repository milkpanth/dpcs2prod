const models = require("../models")
const { sequelize, Generic } = models
const { errorDataTable, errorJson } = require("../helpers/error")
const { getOpenIDFromHeader } = require("../helpers/permission")

const { createLog } = require("../helpers/log")
const { 
    GENERIC_FN, 
    GENERIC_TYPE_ADD, 
    GENERIC_TYPE_EDIT, 
    GENERIC_TYPE_DEL
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
	
			const resultRecord = await Generic.findAndCountAll({
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
			const genericType = await Generic.findAll();

			return res.json({ genericType })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async create(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { name, detail } = req.body
			await Generic.create({ 
				Name: name, 
				Detail: detail,
				CreatedBy: oid
			})
			createLog(req, oid, GENERIC_FN, `${GENERIC_TYPE_ADD} ${name}`)

			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
    async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const { name, detail } = req.body
			const generic = await Generic.findByPk(id)
			if (!generic) {
				throw Error("Generic not exist!")
			}
			generic.Name = name
			generic.Detail = detail
			generic.CreatedBy = oid
			await generic.save()
			createLog(req, oid, GENERIC_FN, `${GENERIC_TYPE_EDIT} ${name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const generic = await Generic.findByPk(id)
			if (!generic) {
				throw Error("Generic not exist!")
			}
			await generic.destroy()
			createLog(req, oid, GENERIC_FN, `${GENERIC_TYPE_DEL} ${generic.Name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	}
}