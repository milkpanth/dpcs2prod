const models = require("../models")
const { sequelize, Sequelize } = models
const UserMember = models.UserMember
const Action = models.Action
const Role = models.Role
const Country = models.Country
const UserRole = models.UserRole
const PendingUser = models.PendingUser
const CompanyProfile = models.CompanyProfile
const CompanyProfileFile = models.CompanyProfileFile
const { Op } = Sequelize 
const { errorDataTable,errorJson } = require("../helpers/error")
const { getOpenIDFromHeader, getUser, getUserType } = require("../helpers/permission")
const { sendMail } = require("../helpers/mail")
const { inviteUser, updateUser } = require("../helpers/graph")
const { createLog } = require("../helpers/log")
const { addUser } = require("../validators/user")
const { SENDGRID_NEW_USER_TEMPLATE } = require("../constants/mail")

const { 
    USER_FN, 
    USER_EDIT, 
    USER_DEL,
	USER_APPROVER_APPROVED,
	USER_APPROVER_REJECTED
} = require("../constants/log")

const ADMIN_ROLE_PRESET = []

module.exports = {
	async create(req, res){
		try {
			const user = await getUser(req)
			
			const {
				displayName,
				email,
				givenName,
				surname,
				jobTitle,
				department,
				usageLocation,
				CompanyCode,
				streetAddress,
				state,
				city,
				postalCode,
				mobile
			} = req.body

			await addUser.validateAsync({
				email,
				givenName,
				surname,
				CompanyCode,
				usageLocation
			})

			const existUserMember = await UserMember.findOne({
				where: { UserMemberEmail: email }
			})
			if(existUserMember){
				throw Error("User already exist!")
			}

			const existPendingUser = await PendingUser.findOne({
				where: { email }
			})
			if(existPendingUser){
				if(existPendingUser.status == "PENDING"){
					throw Error("User status is pending")
				}
				await existPendingUser.destroy()
			}


			const company = await CompanyProfile.findByPk(user.AdminType ? CompanyCode : user.CompanyCode)
			if(!company){
				throw Error("Company not exist!")
			}
			await PendingUser.create({
				displayName,
				email,
				givenName,
				surname,
				jobTitle,
				department,
				usageLocation,
				CompanyName: company.Name,
				CompanyCode: company.CompanyCode,
				streetAddress,
				state,
				city,
				postalCode,
				mobile,
				status: "PENDING",
				CreatedBy: user.UserMemberID,
				CreatedDate: new Date()
			})

			return res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async list(req, res) {
		try {
			const { CompanyCode, AdminType } = await getUser(req)
			const whereObject = AdminType ? {} : { CompanyCode }
			const allUser = await UserMember.findAll({
				include: [{
					model: Country
				}, {
					model: Role
				}],
				where: whereObject
			});

			return res.json({ allUser })
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async edit(req, res) {
		try {
			const { CompanyCode, AdminType, UserMemberID } = await getUser(req)
			const editUserType = getUserType(CompanyCode)
			const { user_id } = req.params
			const { status, roles } = req.body
			const editUser = await UserMember.findByPk(user_id)
			if (!editUser) {
				throw Error("User not exist!")
			}
			if(getUserType(editUser.CompanyCode) != editUserType && AdminType == null){
				throw Error("Unable to modify different user type!")
			}
			if(editUser.CompanyCode != CompanyCode && AdminType == null){
				throw Error("Unable to modify different company user!")
			}
			editUser.UserMemberStatus = status
			await UserRole.destroy({
				where: {
					UserMemberID: editUser.UserMemberID,
				}
			})
			await UserRole.bulkCreate(roles.map(role => {
				return {
					"UserMemberID": editUser.UserMemberID,
					"RoleID": role
				}
			}))
			await editUser.save()
			createLog(req, UserMemberID, USER_FN, `${USER_EDIT} ${editUser.getFullname()}`)
			return res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const { CompanyCode, UserMemberID } = await getUser(req)
			const deleteUserType = getUserType(CompanyCode)
			const { user_id } = req.params
			const deleteUser = await UserMember.findByPk(user_id)
			if (!deleteUser) {
				throw Error("User not exist!")
			}
			if(getUserType(deleteUser.CompanyCode) != deleteUserType && AdminType == null){
				throw Error("Unable to delete different user type!")
			}
			if(deleteUser.CompanyCode != CompanyCode  && AdminType == null){
				throw Error("Unable to delete different company user!")
			}
			if(deleteUser.UserMemberID == UserMemberID){
				throw Error("Unable to delete yourself!")
			}
			await deleteUser.destroy()
			createLog(req, UserMemberID, USER_FN, `${USER_DEL} ${deleteUser.getFullname()}`)
			return res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async dataTable(req, res) {
		const dataTableObj = {
			"draw": parseInt(req.body.draw),
			"recordsTotal": 0,
			"recordsFiltered": 0,
			"data": [],
			"error": null
		}
		try {
			const { CompanyCode, AdminType } = await getUser(req)
			const whereObject = AdminType ? {} : {
				[Op.and]: [{
					CompanyCode
				}]
			}

			const pageLimit = parseInt(req.body.length) || 0
			const pageOffset = parseInt(req.body.start) || 0

			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []
	
			if (req.body.search.value !== "") {
				const resultRecord = await PendingUser.findAndCountAll({
					attributes: [
						"ApprovedBy",
						"ApprovedDate",
						"CompanyCode",
						"CompanyName",
						"CreatedBy",
						"CreatedDate",
						"PendingID",
						"city",
						"department",
						"displayName",
						"email",
						"jobTitle",
						"mobile",
						"postalCode",
						"state",
						"status",
						"streetAddress",
						"usageLocation",
						"givenName",
						"surname"
					],
					where: {
						[Op.or]: [{
							givenName: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						},{
							surname: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						},{
							email: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						}],
						...whereObject
					},
					include: [{
						attributes: [
							"UserMemberName",
							"UserMemberSurname",
							"UserMemberEmail"
						],
						model: UserMember
					}],
					limit: pageLimit,
					offset: pageOffset,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			} else {
				const resultRecord = await PendingUser.findAndCountAll({
					attributes: [
						"ApprovedBy",
						"ApprovedDate",
						"CompanyCode",
						"CompanyName",
						"CreatedBy",
						"CreatedDate",
						"PendingID",
						"city",
						"department",
						"displayName",
						"email",
						"jobTitle",
						"mobile",
						"postalCode",
						"state",
						"status",
						"streetAddress",
						"usageLocation",
						"givenName",
						"surname"
					],
					include: [{
						attributes: [
							"UserMemberName",
							"UserMemberSurname",
							"UserMemberEmail"
						],
						model: UserMember
					}],
					where: whereObject,
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
    },
	async viewRole(req, res){
		try{
			const oid = getOpenIDFromHeader(req)
			const user = await UserMember.findOne({
				include: [{
					model: Role,
					attributes: ['RoleID'],
					include: [{
					  model: Action,
					  attributes: ['MenuListID','Read','IU','Delete','Active'],
					}]
				  }],
				where: { UserMemberID: oid }
			});
			if(!user){
				throw Error("User not exist!")
			}
			if(user.AdminType){
				user.Roles = await Role.findAll({
					include: [{
					  model: Action,
					  attributes: ['MenuListID','Read','IU','Delete','Active'],
					}],
					where: {
						RoleID: {[Op.ne]: 8}
					}
				})
			}
			return res.json({
				roles: user.Roles,
				adminType: user.AdminType
			})
		}catch(err){
			res.status(400).json(errorJson(err))
		}
	},
	async viewInfo(req, res){
		try{
			const user = await getUser(req)
			const companyProfile = await CompanyProfile.findByPk(user.CompanyCode, 
				{
					include: [{
						model: CompanyProfileFile
					}]
				})
			res.json({
				user,
				companyProfile
			})
		}catch(err){
			res.status(400).json(errorJson(err))
		}
	},
	async review(req, res) {
		try {
			const { UserMemberID, CompanyCode, AdminType } = await getUser(req)
			const { pending_id, is_approved } = req.body
			const pendingUser = await PendingUser.findByPk(pending_id)
			if (!pendingUser){
				throw Error("Pending User not exist!")
			}

			if(pendingUser.status != "PENDING"){
				throw Error("Already reviewed!")
			}

			if(pendingUser.CompanyCode != CompanyCode && AdminType == null){
				throw Error("Unable to review different company user!")
			}

			pendingUser.status = (is_approved) ? "APPROVED" : "REJECTED"
			pendingUser.ApprovedBy = UserMemberID
			pendingUser.ApprovedDate = new Date()
			if(is_approved){
				// Send to AAD
				const responseData = await inviteUser({
					email: pendingUser.email,
				})
				if(responseData.error){
					throw responseData.error
				}

				const { invitedUser } = responseData
				const existUser = await UserMember.findByPk(invitedUser.id)
				if(existUser){
					throw Error(`Unable to create user because ObjectID already existed!`)
				}

				updateUser({
					displayName: pendingUser.displayName,
					email: pendingUser.email,
					jobTitle: pendingUser.jobTitle,
					department: pendingUser.department,
					givenName: pendingUser.givenName,
					surname: pendingUser.surname,
					usageLocation: pendingUser.usageLocation,
					CompanyName: pendingUser.CompanyName,
					CompanyCode: pendingUser.CompanyCode,
					streetAddress: pendingUser.streetAddress,
					state: pendingUser.state,
					city: pendingUser.city,
					postalCode: pendingUser.postalCode,
					mobile: pendingUser.mobile,
					id: invitedUser.id
				})
				
				const member = await UserMember.create({
					CompanyCode: pendingUser.CompanyCode,
					UserMemberID: invitedUser.id,
					UserMemberName: pendingUser.givenName,
					UserMemberSurname: pendingUser.surname,
					UserMemberEmail: pendingUser.email,
					Position: pendingUser.department,
					UserMemberStatus: true,
					Position: pendingUser.jobTitle,
					CountryID: pendingUser.usageLocation,
					CreatedBy: pendingUser.CreatedBy
				})
				// Sale Rep
				await UserRole.create({
					UserMemberID: member.UserMemberID,
					RoleID: 7
				})
				
				const newUserCompany = await CompanyProfile.findByPk(pendingUser.CompanyCode)
				sendMail(pendingUser.email, SENDGRID_NEW_USER_TEMPLATE, {
					company_name: newUserCompany.Name
				})
				createLog(req, UserMemberID, USER_FN, `${USER_APPROVER_APPROVED} ${pendingUser.givenName} ${pendingUser.surname}`)
			}else{
				createLog(req, UserMemberID, USER_FN, `${USER_APPROVER_REJECTED} ${pendingUser.givenName} ${pendingUser.surname}`)
			}
			await pendingUser.save()
			

			res.status(200).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async recentLogin(req, res){
		try{
			const oid = getOpenIDFromHeader(req)
			const user = await UserMember.findByPk(oid)
			if(!user){
				throw Error("User not exist!")
			}
			const now = new Date().getTime()
			//const last = new Date(user.RecentLogin).getTime() + (5 * 60 * 1000) // 5Min
			/*const last = new Date(user.RecentLogin).getTime() + (1 * 1000) //1 Sec
			if(last > now){
				return res.status(429).end()
			}*/

			user.RecentLogin = now
			await user.save()

			res.status(200).end()
		}catch(err){
			res.status(400).json(errorJson(err))
		}
	}
}