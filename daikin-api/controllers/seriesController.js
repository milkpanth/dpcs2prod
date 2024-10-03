const models = require("../models")
const { sequelize, Sequelize } = models
const { Op } = Sequelize 
const { Series, SeriesFile, SeriesTemplate } = models
const { getFormmatedName, downloadToTemp, deleteBlob, uploadFile } = require("../helpers/storage")
const { errorJson, errorDataTable } = require("../helpers/error")
const { convertPDF } = require("../helpers/aspose")
const { getOpenIDFromHeader, getUser } = require("../helpers/permission")
const { createLog } = require("../helpers/log")
const { getUserLanguage } = require("../helpers/lang")
const { TEMP_OUTPUT } = require("../constants");

const { 
    SERIES_FN, 
    IMPORT_SERIES, 
    DOWNLOAD_SERIES_TEMPLATE, 
    ADD_SERIES
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

			const orderArray = (req.body.order) ? [[sequelize.col(req.body.columns[req.body.order[0].column].data), req.body.order[0].dir]] : []

			if (req.body.search.value !== "") {
				const resultRecord = await Series.findAndCountAll({
					include: [{
						attributes: [
							"FileID",
							"LangID",
							"Revision"
						],
						model: SeriesFile,
						where: {
							LangID: languageArray
						},
						required: false
					}],
					where: {
						[Op.or]: [{
							SeriesID: {
								[Op.like]: [`%${req.body.search.value}%`]
							}
						}]
					},
					limit: pageLimit,
					offset: pageOffset,
					order: orderArray
				})
				dataTableObj.data = resultRecord.rows
				dataTableObj.recordsFiltered = resultRecord.count
				dataTableObj.recordsTotal = resultRecord.rows.length
			} else {
				const resultRecord = await Series.findAndCountAll({
					include: [{
						attributes: [
							"FileID",
							"LangID",
							"Revision"
						],
						model: SeriesFile,
						where: {
							LangID: languageArray
						},
						required: false
					}],
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
			const allSeries = await Series.findAll();

			return res.json({ allSeries })
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async edit(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { id } = req.params
			const { blobName, language } = req.body
			const series = await Series.findByPk(id)
			if (!series) {
				throw Error("Series not exist!")
			}
			if(!blobName){
				throw Error("File not exist!")
			}
			const files = await series.getSeriesFiles({
				where: {
					LangID: language
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

			await series.createSeriesFile({
				Path: blobName,
				LangID: language,
				Revision: revisionCounter,
				CreatedBy: oid
			})
			//await model.save()
			createLog(req, oid, SERIES_FN, `${ADD_SERIES} ${id}`)
			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async downloadExcel(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const template = await SeriesTemplate.findOne({
				attributes: ["Path"],
				order: [[ "TemplateID", "DESC" ]],
				limit: 1,
				raw: true
			})
			if(!template){
				return res.status(404).end()
			}
			const filePath = await downloadToTemp(template.Path)
			res.set("Content-Disposition", `attachment; filename=${getFormmatedName("SeriesTemplate", template.Path)}`)
            res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
			res.set("Access-Control-Expose-Headers", "Content-Disposition")
			createLog(req, oid, SERIES_FN, DOWNLOAD_SERIES_TEMPLATE)
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(500).json(errorJson(err))
		}
	},
	async downloadPowerPoint(req, res) {
		try {
			const { fileId } = req.params
			const file = await SeriesFile.findByPk(fileId)
			if(!file){
				return res.status(404).end()
			}
			const filePath = await downloadToTemp(file.Path)
			res.set("Content-disposition", `attachment; filename=${getFormmatedName(file.SeriesID, file.Path, file.LangID)}`)
            res.set("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(500).json(errorJson(err))
		}
	},
	async add(req, res) {
		try {
			const oid = getOpenIDFromHeader(req)
			const { array, file } = req.body
			for(const data of array){ 
				const exist = await Series.findByPk(data.Series)
				if(exist){
					if(exist.ClassID !== data.Class){
						exist.ClassID = data.Class
						exist.ImagePath = getImageName(data.Image)
						exist.CreatedBy = oid
						await exist.save()
					}
				}else{
					await Series.create({
						ClassID: data.Class,
						SeriesID: data.Series,
						ImagePath: getImageName(data.Image),
						CreatedBy: oid
					})
				}
			}

			const lastTemplate = await SeriesTemplate.findOne({
				order: [[ "TemplateID", "DESC" ]]
			})
			if(lastTemplate){
				deleteBlob(lastTemplate.Path).catch(err => console.error(err))
				await lastTemplate.destroy()
			}
			if(!file){
				throw Error("No File!")
			}
			await SeriesTemplate.create({
				Path: file
			})

			createLog(req, oid, SERIES_FN, IMPORT_SERIES)

			res.status(204).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async previewPowerPoint(req, res){
		try{
			const { fileId } = req.params
			const file = await SeriesFile.findByPk(fileId)
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

function getImageName(image){
	if(!image){
		return null
	}
	if(image == "/"){
		return null
	}
	
	const img = image.split("/")
	if(img[0]){
		if(img[0].includes(".png") || img[0].includes(".PNG")){
			return img[0].trim()
		}else{
			return img[0].trim() + ".png"
		}
	}
	return null
}