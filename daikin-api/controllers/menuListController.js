const models = require("../models")
const MenuList = models.MenuList
const { errorJson } = require("../helpers/error")

module.exports = {
    async list(req, res) {
		try{
			const allMenu = await MenuList.findAll({
				attributes: {exclude: ['CreatedBy','CreatedDate','UpdatedBy','UpdatedDate']}
			});

			res.json(allMenu)
		} catch (err) {
			res.json(errorJson(err))
		}
	}
}