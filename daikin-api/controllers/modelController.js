const models = require("../models")
const { sequelize, Sequelize } = models
const { Op } = Sequelize 
const { Model, ModelFile, ModelTemplate, Section } = models
const { getFormmatedName, deleteBlob, downloadToTemp, uploadFile } = require("../helpers/storage")
const { TEMP_OUTPUT } = require("../constants");

const { errorJson, errorDataTable } = require("../helpers/error")
const { convertPDF } = require("../helpers/aspose")
const { getOpenIDFromHeader, getUser } = require("../helpers/permission")
const { createLog } = require("../helpers/log")
const { getUserLanguage } = require("../helpers/lang")
const { ADD_MODEL, IMPORT_MODEL, MODEL_FN, DOWNLOAD_MODEL_TEMPLATE } = require("../constants/log")

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
	
			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []
			
			if (req.body.search.value !== "") {
				const resultRecord = await Model.findAndCountAll({
					include: [{
						attributes: [
							"FileID",
							"SectionID",
							"SubSectionID",
							"LangID",
							"Revision",
							//[sequelize.fn("CONCAT", "model/download/", sequelize.col("FileID")), "FullPath"]
						],
						model: ModelFile,
						where: {
							LangID: languageArray
						},
						required: false
					}],
					where: {
						[Op.or]: [{
							ModelID: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						}]
					},
					distinct: true,
					limit: pageLimit,
					offset: pageOffset,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			} else {
				const resultRecord = await Model.findAndCountAll({
					include: [{
						attributes: [
							"FileID",
							"SectionID",
							"SubSectionID",
							"LangID",
							"Revision",
							[sequelize.fn("CONCAT", "model/download/", sequelize.col("FileID")), "FullPath"]
						],
						model: ModelFile,
						where: {
							LangID: languageArray
						},
						required: false
					}],
					distinct: true,
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
	async list(req, res) {
		try {
			const allModel = await Model.findAll()

			return res.json({ allModel })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async add(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { array, file } = req.body
			for(const data of array){ 
				const exist = await Model.findByPk(data.Model)
				if(exist){
					if(exist.ClassID !== data.Class || exist.SeriesID !== data.Series){
						exist.ClassID = data.Class
						exist.SeriesID = data.Series
						exist.UpdatedBy = oid
						await exist.save()
					}
				}else{
					await Model.create({
						ModelID: data.Model,
						ClassID: data.Class,
						SeriesID: data.Series,
						CreatedBy: oid
					})
				}
			}

			const lastTemplate = await ModelTemplate.findOne({
				order: [[ "TemplateID", "DESC" ]]
			})
			if(lastTemplate){
				deleteBlob(lastTemplate.Path).catch(err => console.error(err))
				await lastTemplate.destroy()
			}
			if(!file){
				throw Error("No File!")
			}
			await ModelTemplate.create({
				Path: file,
				CreatedBy: oid
			})

			createLog(req, oid, MODEL_FN, IMPORT_MODEL)
			
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const { blobName, language, section, subsection } = req.body
			const model = await Model.findByPk(id)
			if (!model) {
				throw Error("Model not exist!")
			}
			if(!blobName){
				throw Error("File not exist!")
			}
			// Main Section
			const allSection = await Section.findAll({
				raw: true
			})
			if(allSection.filter(x => !x.Orderable).map(x => x.SectionID).includes(section)){
				throw Error("Section not allow!")
			}
			const isExist =  allSection.find(x => x.SectionID == section)
			if(!isExist){
				throw Error("Section not exist!")
			}

			const files = await model.getModelFiles({
				where: {
					LangID: language,
					SectionID: section,
					SubSectionID: subsection
				},
				limit: 1
			})
			
			let revisionCounter = 1
			if(files.length > 0){
				const file = files[0]
				deleteBlob(file.Path).catch(err => console.error(err))
				revisionCounter = file.Revision + 1
				await file.destroy()
			}

			await model.createModelFile({
				SectionID: section,
				SubSectionID: subsection,
				Path: blobName,
				LangID: language,
				Revision: revisionCounter,
				CreatedBy: oid
			})
			//await model.save()
			createLog(req, oid, MODEL_FN, `${ADD_MODEL} ${id}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async downloadExcel(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const template = await ModelTemplate.findOne({
				attributes: ["Path"],
				order: [[ "TemplateID", "DESC" ]],
				raw: true
			})
			if(!template){
				return res.status(404).end()
			}
			const filePath = await downloadToTemp(template.Path)
			res.set("Content-Disposition", `attachment; filename=${getFormmatedName("ModelTemplate", template.Path)}`)
            res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
			res.set("Access-Control-Expose-Headers", "Content-Disposition")
			createLog(req, oid, MODEL_FN, DOWNLOAD_MODEL_TEMPLATE)
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(500).json(errorJson(err))
		}
	},
	async downloadPowerPoint(req, res) {
		try {
			const { fileId } = req.params
			const file = await ModelFile.findByPk(fileId)
			if(!file){
				return res.status(404).end()
			}
			const filePath = await downloadToTemp(file.Path)
			res.set("Content-disposition", `attachment; filename=${getFormmatedName(file.ModelID, file.Path, file.LangID)}`)
            res.set("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(500).json(errorJson(err))
		}
	},
	async previewPowerPoint(req, res){
		try{
			const { fileId } = req.params
			const file = await ModelFile.findByPk(fileId)
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