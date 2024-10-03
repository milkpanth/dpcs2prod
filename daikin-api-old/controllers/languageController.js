const models = require("../models")
//const { Language } = models
const { errorJson } = require("../helpers/error")
const { getUser } = require("../helpers/permission")
const { getUserLanguage } = require("../helpers/lang")

module.exports = {
	async list(req, res) {
		try {
			const user = await getUser(req)
			const languages = getUserLanguage(user)
			//const languages = await Language.findAll()
			
			return res.json({ languages })
		} catch (err) {
			res.json(errorJson(err))
		}
	}
}