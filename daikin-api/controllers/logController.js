const models = require("../models")
const { sequelize, Sequelize } = models
const { Op } = Sequelize 
const { UserMember, UserLogs } = models

const { errorJson, errorDataTable } = require("../helpers/error")

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
	
			let orderArray = []
			if(req.body.order){
				orderArray = [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]]
			}

			if (req.body.search.value !== "") {
				const resultRecord = await UserLogs.findAndCountAll({
					include: [{
						attributes: ["UserMemberEmail"],
						model: UserMember
					}],
					where: {
						[Op.or]: [{
							Function: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						},{
							Detail: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						},{
							"$UserMember.UserMemberEmail$": {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						}]
					},
					limit: pageLimit,
					offset: pageOffset,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			} else {
				const resultRecord = await UserLogs.findAndCountAll({
					include: [{
						attributes: ["UserMemberEmail"],
						model: UserMember
					}],
					limit: pageLimit,
					offset: pageOffset,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			}
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	}
}