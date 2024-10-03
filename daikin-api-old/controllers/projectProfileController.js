const models = require("../models")
const { ProjectProfile } = models
const { editProject } = require("../validators/project")
const { errorDataTable, errorJson } = require("../helpers/error")
// TODO: Query from Azure AD 
const company_code = "0000"
const company_name = "Niche-Est Solution(Thailand) Co.,Ltd."

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
	
			const resultRecord = await ProjectProfile.findAndCountAll({
				limit: pageLimit,
				offset: pageOffset,
				order: [["CompanyCode", "ASC"]]
			})
			dataTableObj.data = resultRecord.rows
			dataTableObj.recordsFiltered = resultRecord.count
			dataTableObj.recordsTotal = resultRecord.rows.length
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	},
    async edit(req, res) {
		try {
			const value = await editProject.validateAsync({...req.body,...req.params})
			const project = await ProjectProfile.findByPk(value.id)
			if (!project) {
				throw Error("Project not exist!")
			}
			project.ProjectName = value.name
            project.CustomerName = value.customer
            project.ProjectAddress = value.address
			await project.save()
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	}
}