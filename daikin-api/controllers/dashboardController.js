const models = require("../models")
const { sequelize, Sequelize } = models
const { Op } = Sequelize 
const { GenericList, UserMember, Proposal, GenericSubType, Generic, CompanyProfile } = models

const { errorDataTable, errorJson } = require("../helpers/error")
const { getUser } = require("../helpers/permission")

module.exports = {
	async dataTable(req, res) {
		const dataTableObj = {
			"draw": parseInt(req.body.draw),
			"recordsTotal": 0,
			"recordsFiltered": 0,
			"data": [],
			"error": null,
            "isSuperAdmin": false
		}
		try {
            const user = await getUser(req)
            const { extra } = req.body
            
            const filterObject = createSearchFilter(extra, user)
			const pageLimit = parseInt(req.body.length) || 0
			const pageOffset = parseInt(req.body.start) || 0
	
			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []
			const resultRecord = await Proposal.findAndCountAll({
                attributes: [
                    [sequelize.literal(`SUM(Type = "GENERIC")`), "GTotal"],
                    [sequelize.literal(`SUM(Type = "PROJECT")`), "PTotal"],
                    [sequelize.fn("CONCAT", sequelize.col("UserMemberName"), " ", sequelize.col("UserMemberSurname")), "FullName"],
                ],
                include: [{
					attributes: ["UserMemberName", "UserMemberSurname", "UserMemberEmail"],
					model: UserMember,
                    include: [{
                        attributes: ["CompanyCode", "Name"],
                        model: CompanyProfile
                    }]
				}, {
					attributes: ["GenericSubTypeID"],
					model: GenericList,
                    include: [{
                        model: GenericSubType,
                        include: [{
                            model: Generic
                        }]
                    }]
				}],
                where: filterObject,
                /*{
                    [Op.or]: filterArray,
                    [Op.and]: filterArray
                },*/
                group: ["Proposal.CreatedBy", "GenericList.GLID"],
				limit: pageLimit,
				offset: pageOffset,
                order: orderArray
			})
			dataTableObj.data = resultRecord.rows
			dataTableObj.recordsFiltered = resultRecord.count.length
			dataTableObj.recordsTotal = resultRecord.rows.length
			dataTableObj.isSuperAdmin = user.IsSuperAdmin
            
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	},
    async chartSummary(req, res) {
        try {
            const user = await getUser(req)
            const { extra } = req.body

            const filterObject = createSearchFilter(extra, user)
			const resultRecord = await Proposal.findAll({
                attributes: [
                    [sequelize.literal(`CAST(SUM(Type = "GENERIC") as UNSIGNED)`), "GTotal"],
                    [sequelize.literal(`CAST(SUM(Type = "PROJECT") as UNSIGNED)`), "PTotal"],
                    [sequelize.literal(`DATE_FORMAT(Proposal.CreatedDate, '%m-%Y')`), "MonthYear"],
                ],
                include: [{
					attributes: [],
					model: UserMember
				}, {
					attributes: [],
					model: GenericList,
                    include: [{
                        attributes: [],
                        model: GenericSubType,
                        include: [{
                            attributes: [],
                            model: Generic
                        }]
                    }]
				}],
                where: filterObject,
                order: [[sequelize.col("MonthYear"), "ASC"]],
                group: ["MonthYear"]
			})
			res.json(resultRecord)
		}catch(err) {
			res.status(400).json(errorJson(err))
		}
    }
}

function createSearchFilter(extra, user){
    const orSearchArray = []
    const andSearchArray = []
    const { name, email, type, customer, start, end, generictype, genericsubtype, company } = extra
    if(name){
        orSearchArray.push({
            "$UserMember.UserMemberName$": {
                [Op.substring]: name.trim()
            }
        })
        orSearchArray.push({
            "$UserMember.UserMemberSurname$": {
                [Op.substring]: name.trim()
            }
        })
    }
    if(email){
        andSearchArray.push({
            "$UserMember.UserMemberEmail$": {
                [Op.substring]: email.trim()
            }
        })
    }
    if(type){
        andSearchArray.push({
            "Type": type
        })
    }
    if(generictype){
        andSearchArray.push({
            "$GenericList.GenericSubType.GenericID$": generictype
        })
    }
    if(genericsubtype){
        andSearchArray.push({
            "$GenericList.GenericSubTypeID$": genericsubtype
        })
    }
    if(customer){
        andSearchArray.push({
            "CustomerName": {
                [Op.like]: [`%${customer}%`]
            }
        })
    }
    if(user.AdminType){
        if(company){
            andSearchArray.push({
                "$UserMember.CompanyCode$": company
            })
        }
    }else{
        andSearchArray.push({
            "$UserMember.CompanyCode$": user.CompanyCode
        })
    }
    if(start && end){
        andSearchArray.push({
            "CreatedDate": {
                [Op.between]: [`${start} 00:00:00`, `${end} 23:59:59`]
            }
        })
    }else{
        if(start){
            andSearchArray.push({
                "CreatedDate": {
                    [Op.gte]: `${start} 00:00:00`
                }
            })
        }
        if(end){
            andSearchArray.push({
                "CreatedDate": {
                    [Op.lte]: `${end} 23:59:59`
                }
            })
        }
    }
    if(orSearchArray.length > 0 && andSearchArray.length > 0){
        return {
            [Op.or]: orSearchArray,
            [Op.and]: andSearchArray
        }
    }else if(orSearchArray.length > 0){
        return {
            [Op.or]: orSearchArray
        }
    }else if(andSearchArray.length > 0){
        return {
            [Op.and]: andSearchArray
        }
    }
}