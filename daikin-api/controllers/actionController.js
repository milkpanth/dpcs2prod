const models = require("../models")
const {Action} = models
const { errorJson } = require("../helpers/error")

module.exports = {
	async list(req, res) {
		try {
			const allAction = await Action.findAll({
				attributes: { exclude: ['CreatedBy', 'CreatedDate', 'UpdatedBy', 'UpdatedDate'] }
			});

			res.json(allAction)
		} catch (err) {
			res.json(errorJson(err))
		}
	}
}