const models = require("../models")
const { sequelize, Generic, GenericSubType, GenericFile } = models
const { Op } = models.Sequelize
const { getFormmatedName, downloadToTemp, deleteBlob, uploadFile } = require("../helpers/storage")
const { errorDataTable, errorJson } = require("../helpers/error")
const { convertPDF } = require("../helpers/aspose")
const { getOpenIDFromHeader, getUser } = require("../helpers/permission")
const { getUserLanguage } = require("../helpers/lang")
const { TEMP_OUTPUT } = require("../constants")

const { createLog } = require("../helpers/log")
const { 
    GENERIC_FN, 
    GENERIC_FILE_ADD, 
    GENERIC_FILE_EDIT, 
    GENERIC_FILE_DEL
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
			const languageArray = getUserLanguage(user)
			const pageLimit = parseInt(req.body.length) || 0
			const pageOffset = parseInt(req.body.start) || 0
			const { type_id, subtype_id } = req.body

			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []

			if (type_id || subtype_id) {
				const whereObj = {}
				if(type_id){
					whereObj.GenericID = type_id
				}
				if(subtype_id){
					whereObj.GenericSubTypeID = subtype_id
				}
				const resultRecord = await GenericSubType.findAndCountAll({
					where: whereObj,
					attributes: [
						"GenericSubTypeID",
						"Name"
					],
					limit: pageLimit,
					offset: pageOffset,
					include: [{
						attributes: [
							"FileID",
							"Path",
							"Detail",
							"LangID",
							"CreatedBy",
							"UpdatedBy",
							"CreatedDate",
							"UpdatedDate",
							[sequelize.fn("CONCAT", "/genericFile/download/", sequelize.col("FileID")), "FullPath"]
						],
						model: GenericFile,
						where: {
							LangID: languageArray
						}
					},{
						attributes: [
							"GenericID",
							"Name"
						],
						model: Generic
					}],
					subQuery: false,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			} else {
				const resultRecord = await GenericSubType.findAndCountAll({
					attributes: [
						"GenericSubTypeID",
						"Name"
					],
					include: [{
						attributes: [
							"FileID",
							"Path",
							"Detail",
							"LangID",
							"CreatedBy",
							"UpdatedBy",
							"CreatedDate",
							"UpdatedDate",
							[sequelize.fn("CONCAT", "/genericFile/download/", sequelize.col("FileID")), "FullPath"]
						],
						model: GenericFile,
						where: {
							FileID: {
								[Op.ne]: null
							},
							LangID: languageArray
						}
					},{
						attributes: [
							"GenericID",
							"Name"
						],
						model: Generic
					}],
					subQuery: false,
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
	async create(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { blobName, generic_sub_id, language } = req.body
			if(!blobName){
				throw Error("File not exist!")
			}
			const file = await GenericFile.findOne({
				where:{
					GenericSubTypeID: generic_sub_id,
                	LangID: language
				},
				order: [[ "FileID", "DESC" ]]
			})
			const gst = await GenericSubType.findByPk(generic_sub_id)
			if(file){
				file.Path = blobName
				file.Preview = null
				file.save()
				createLog(req, oid, GENERIC_FN, `${GENERIC_FILE_EDIT} ${gst.Name}`)
			}else{
				await GenericFile.create({ 
					Path: blobName,
					GenericSubTypeID: generic_sub_id,
					LangID: language,
					CreatedBy: oid
				})
				createLog(req, oid, GENERIC_FN, `${GENERIC_FILE_ADD} ${gst.Name}`)
			}
			
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
    async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const { blobName, generic_sub_id, language } = req.body
			const generic_file = await GenericFile.findByPk(id)
			if (!generic_file) {
				throw Error("GenericFile not exist!")
			}
			if(!blobName){
				throw Error("File not exist!")
			}
			deleteBlob(generic_file.Path).catch(err => console.error(err))
			generic_file.Path = blobName
			generic_file.Preview = null
			
			generic_file.GenericSubTypeID = generic_sub_id
			generic_file.LangID = language
			generic_file.CreatedBy = oid
			await generic_file.save()
			const gst = await GenericSubType.findByPk(generic_sub_id)
			createLog(req, oid, GENERIC_FN, `${GENERIC_FILE_EDIT} ${gst.Name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async delete(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const generic_file = await GenericFile.findByPk(id)
			if (!generic_file) {
				throw Error("GenericFile not exist!")
			}
			deleteBlob(generic_file.Path).catch(err => console.error(err))
			const gst = await GenericSubType.findByPk(generic_file.GenericSubTypeID)
			await generic_file.destroy()
			createLog(req, oid, GENERIC_FN, `${GENERIC_FILE_DEL} ${gst.Name}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async downloadPowerPoint(req, res) {
		try {
			const { fileId } = req.params
			const file = await GenericFile.findByPk(fileId)
			if(!file){
				return res.status(404).end()
			}
			const subType = await GenericSubType.findByPk(file.GenericSubTypeID)
			const filePath = await downloadToTemp(file.Path)
			res.set("Content-disposition", `attachment; filename=${getFormmatedName(subType.Name, file.Path, file.LangID)}`)
            res.set("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(500).json(errorJson(err))
		}
	},
	async previewPowerPoint(req, res){
		try{
			const { fileId } = req.params
			const file = await GenericFile.findByPk(fileId)
			if(!file){
				return res.status(404).end()
			}
			let pdfFile
			if(file.Preview){
				pdfFile = file.Preview
			}else{
				await downloadToTemp(file.Path)
				pdfFile = await convertPDF(file.Path, true)
				uploadFile(`${TEMP_OUTPUT}/${pdfFile}`, pdfFile, "application/pdf")
				file.Preview = pdfFile
				await file.save()
			}
			
			const filePath = await downloadToTemp(pdfFile)
			res.sendFile(filePath, { root: "." })
		}catch(err){
			res.status(400).json(errorJson(err))
		}
	}
}