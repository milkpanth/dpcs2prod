const models = require("../models")
const { Section, CompanySection, CompanyProfile, SubSection } = models
const { addSection, editSection, orderSection, deleteSection } = require("../validators/proposal")
const { errorDataTable, errorJson } = require("../helpers/error")

const { getUser } = require("../helpers/permission")

const { createLog } = require("../helpers/log")
const { 
    SECTION_FN, 
    SECTION_NAME_UPDATE, 
    SECTION_ORDER_ACTIVE_UPDATE,
	SUBSECTION_NAME_UPDATE
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
			const user = await getUser(req)
			const resultRecord = await CompanySection.findAll({
				include: [{
					model: Section,
					include: [{
						model: SubSection
					}]
				}],
				where: {
					CompanyCode: user.CompanyCode
				},
				order: [
					["CompanyOrder", "ASC"],
					[{ model: Section },{ model: SubSection }, "SubID", "ASC"]
				]
			})
			dataTableObj.data = resultRecord
			dataTableObj.recordsFiltered = resultRecord.length
			dataTableObj.recordsTotal = resultRecord.length
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	},
	async updateOrder(req, res){
		try{
			const user = await getUser(req)
			const value = await orderSection.validateAsync(req.body)
			// Need previous order to compare the position
			const oldOrderItem = await CompanySection.findAll({
				include: [{
					model: Section
				}],
				where: {
					CompanyCode: user.CompanyCode
				},
				order: [["CompanyOrder", "ASC"]],
				raw: true
			})
			if(oldOrderItem.length == 0){
				throw Error("Old Item Empty!")
			}

			const nonOrderableItemID = []
			const orderableItemID = []

			for(const item of oldOrderItem){
				if(item["Section.Orderable"]){
					orderableItemID.push(item.CSID)
				}else{
					nonOrderableItemID.push(item.CSID)
				}
			}

			if(value.orderList.some(x => nonOrderableItemID.includes(x))){
				throw Error("Must not have unorderable item!")
			}
			if(!value.orderList.every(x => orderableItemID.includes(x))){
				throw Error("Must have all orderable item!")
			}
			const firstOrderableIndex = oldOrderItem.findIndex(x => x["Section.Orderable"] == true)
			/*const newOrder = orderArray.map((v,i)=>{
				return { 
					"SectionID" : v,
					"Order" : i + firstOrderableIndex + 1
				}
			})*/

			for(let i = 0; i < value.orderList.length; i++){
				await CompanySection.update({"CompanyOrder":  i + firstOrderableIndex + 1}, {
					where: {
						CompanyCode: user.CompanyCode,
						CSID: value.orderList[i]
					}
				})
			}

			for(const each of value.activeList){
				await Section.update({"Active": each.active}, {
					where: {
						SectionID: each.sectionId
					}
				})
			}

			for(const each of value.activeSubList){
				await SubSection.update({"Active": each.active}, {
					where: {
						SubID: each.subId
					}
				})
			}
			
			createLog(req, user.UserMemberID, SECTION_FN, SECTION_ORDER_ACTIVE_UPDATE)
			res.json({})
		}catch(err){
			res.status(400).json(errorJson(err))
		}
	},
	async list(req, res) {
		try {
			const user = await getUser(req)
			const sections = await CompanySection.findAll({
				include: [{
					model: Section,
					include: [{
						model: SubSection
					}]
				}],
				where: {
					CompanyCode: user.CompanyCode
				},
				order: [
					["CompanyOrder", "ASC"],
					[{ model: Section },{ model: SubSection }, "SubID", "ASC"]
				]
			});

			return res.json({ sections })
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async create(req, res) {
		try {
			const value = await addSection.validateAsync(req.body)
			// Update master first
			const masterLast = await Section.findOne({
				order: [["Order", "DESC"]],
				raw: true
			})
			await Section.update({ 
				Order: masterLast.Order + 1,
			}, {
				where : { SectionID: masterLast.SectionID }
			})
			const newSection = await Section.create({ 
				Name: value.name,
				Order: masterLast.Order,
				Orderable: true,
				Active: false
			})
			// Update per each company
			const allCompany = await CompanyProfile.findAll({
				attributes: ["CompanyCode"]
			})
			for(const company of allCompany){
				const eachLast = await CompanySection.findOne({
					where: { CompanyCode: company.CompanyCode },
					order: [["CompanyOrder", "DESC"]],
					raw: true
				})
				const order = eachLast ? eachLast.CompanyOrder : 1
				await CompanySection.update({ 
					CompanyOrder: order + 1,
				}, {
					where: {
						CompanyOrder: order,
						CompanyCode: company.CompanyCode
					}
				})
				await CompanySection.create({ 
					CompanyCode: company.CompanyCode,
					SectionID: newSection.SectionID,
					CompanyOrder: order
				})
			}
			
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
    async editSection(req, res) {
		try {
			const user = await getUser(req)
			const value = await editSection.validateAsync({...req.body,...req.params})
			const csection = await CompanySection.findOne({
				where: {
					CompanyCode: user.CompanyCode,
					SectionID: value.id
				}
			})
			if (!csection) {
				throw Error("Company Section not exist!")
			}
			const section = await csection.getSection()
			if (!section) {
				throw Error("Section not exist!")
			}
			section.Name = value.name
			await section.save()
			createLog(req, user.UserMemberID, SECTION_FN, SECTION_NAME_UPDATE)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async editSubSection(req, res) {
		try {
			const user = await getUser(req)
			const value = await editSection.validateAsync({...req.body,...req.params})
			const subsection = await SubSection.findOne({
				where: {
					SubID: value.id
				}
			})
			if (!subsection) {
				throw Error("Sub Section not exist!")
			}
			subsection.Name = value.name
			await subsection.save()
			createLog(req, user.UserMemberID, SECTION_FN, SUBSECTION_NAME_UPDATE)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const user = await getUser(req)
			const value = await deleteSection.validateAsync(req.params)
			const section = await CompanySection.findOne({
				where: {
					CompanyCode: user.CompanyCode,
					SectionID: value.id
				}
			})
			
			if (!section) {
				throw Error("Section not exist!")
			}
			if(!section.Orderable){
				throw Error("Unable to remove fixed position section!")
			}
			await section.destroy()

			const proposalSection = await CompanySection.findAll({
				where : {
					CompanyCode: user.CompanyCode
				},
				order: [["CompanyOrder", "DESC"]],
				raw: true
			})
			for(let i = 0; i < proposalSection.length; i++){
				await CompanySection.update({"CompanyOrder": i+1}, {
					where: {
						Orderable: true,
						SectionID: proposalSection[i].SectionID,
						CompanyCode: user.CompanyCode
					}
				})
			}

			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	}
}