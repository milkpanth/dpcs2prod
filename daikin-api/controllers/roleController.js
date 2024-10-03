const models = require("../models")
const Role = models.Role
const Action = models.Action
const MenuList = models.MenuList
const { errorJson } = require("../helpers/error")

const { getOpenIDFromHeader } = require("../helpers/permission")
const { createLog } = require("../helpers/log")
const { 
    ROLE_FN, 
    ROLE_ADD, 
    ROLE_EDIT,
	ROLE_DEL
} = require("../constants/log")

module.exports = {
	async allRole(req, res) {
		try {
			const allRoleHeader = await Role.findAll({});
			return res.json({ allRoleHeader })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async list(req, res) {
		try {
			const allRole = await Role.findAll({
				model: Role,
				include: {
					model: Action,
					attributes: { exclude: ["RoleID", "MenuListID", "CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate"] },
					include: {
						model: MenuList,
						attributes: { exclude: ["CreatedBy", "CreatedDate", "UpdatedBy", "UpdatedDate"] }
					}
				}
			});
			return res.json({ allRole })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async save(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { name, actions } = req.body
			const allMenu = await MenuList.findAll()
			const dbAllMenu = allMenu.map(x => x.MenuListID)
			const reqAllMenu = actions.map(x => x.MenuListID)
			const isMenuEqual = (JSON.stringify(reqAllMenu.sort()) === JSON.stringify(dbAllMenu.sort()))
			if (!isMenuEqual) {
				throw Error("Action data not match all menu!")
			}
			const role = await Role.create({
				RoleName: name
			})
			await Action.bulkCreate(actions.map(action => {
				if(!action.Delete && !action.IU && !action.Read){
					action.Active = false
				}
				action.RoleID = role.RoleID
				return action
			}))
			createLog(req, oid, ROLE_FN, `${ROLE_ADD} ${name}`)
			res.json({})
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { role_id } = req.params
			const { name, actions } = req.body
			const role = await Role.findByPk(role_id)
			if (!role) {
				throw Error("Role Not Exist!")
			}
			role.RoleName = name
			await Action.destroy({
				where: {
					RoleID: role.RoleID
				}
			})
			await Action.bulkCreate(actions.map(action => {
				if(!action.Delete && !action.IU && !action.Read){
					action.Active = false
				}
				action.RoleID = role.RoleID
				return action
			}))
			await role.save()
			createLog(req, oid, ROLE_FN, `${ROLE_EDIT} ${name}`)
			return res.status(204).end()
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { role_id } = req.params
			const role = await Role.findByPk(role_id)
			if (!role) {
				throw Error("Role Not Exist!")
			}
			/*const listUser = await role.getUserMembers({raw: true})
			if(listUser.length > 0){
				await role.removeUserMembers(listUser.map(x => x.UserMemberID))
			}
			const listAction = await role.getActions({raw: true});
			if(listAction.length > 0){
				await role.removeActions(listAction.map(x => x.ActionID))
			}*/
			await role.destroy()
			createLog(req, oid, ROLE_FN, `${ROLE_DEL} ${role.RoleName}`)
			return res.status(204).end()
		} catch (err) {
			res.json(errorJson(err))
		}
	}
}