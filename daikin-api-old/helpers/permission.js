const models = require("../models")
const { INTERNAL_USER_PREFIX, EXTERNAL_USER_PREFIX } = require("../constants")
const { ROLE_GLOBAL, ROLE_LOCAL } = require("../constants/admin")
const UserMember = models.UserMember
const Role = models.Role
const Action = models.Action
const TYPE_OF_ACTION = {
    'READ':'Read',
    'MODIFY':'IU',
    'DELETE':'Delete',
    'ACTIVE':'Active'
}

module.exports = {
    async permissionChecker(UserMemberID, MenuListID, TypeOfAction) {
        const user = await UserMember.findOne({
			include: [{
				model: Role,
                attributes: ['RoleID'],
				include: [{
				  model: Action,
                  attributes: ['MenuListID','Read','IU','Delete','Active'],
				}]
			  }],
			where: {
				UserMemberID,
                UserMemberStatus: true
			}

		});
        
        if(!user){
            return false
        }

        if([ROLE_GLOBAL, ROLE_LOCAL].includes(user.AdminType)){
            return true
        }

        return user.Roles.some(role => {
            const matchAction = role.Actions.find(x=> x.MenuListID == MenuListID)
            if(!matchAction){
                return false
            }
            return matchAction[TypeOfAction]
        })
    },
    getOpenIDFromHeader(request) {
        if(!request.aad_data){
            return null
        }
        return request.aad_data.oid
    },
    async getUser(request) {
        if(!request.aad_data){
            return null
        }
        if(!request.aad_data.oid){
            return null
        }
        const user = await UserMember.findByPk(request.aad_data.oid)
        return user
    },
    setPermission(menu, action) {
        return (req, res, next) => {
            req.metadata = {
                Menu: menu,
                Action: action
            }
            next()
        }
    },
    setMultiplePermission(array) {
        return (req, res, next) => {
            req.metadata = array.map(x => {
                return {
                    Menu: x.menu,
                    Action: x.action
                }
            })
            next()
        }
    },
    getUserType(company_code){
        if(company_code?.startsWith("INT")){
            return INTERNAL_USER_PREFIX
        }
        return EXTERNAL_USER_PREFIX
    },
    TYPE_OF_ACTION
}