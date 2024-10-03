const models = require("../models")
const { CompanyProfile, CompanyProfileFile, Section, CompanySection } = models
const { uploadCompanyProfile } = require("../validators/companyprofile")
const { uploadFile, downloadToTemp } = require("../helpers/storage")
const { errorDataTable, errorJson } = require("../helpers/error")
const { convertPDF } = require("../helpers/aspose")

const { getUser } = require("../helpers/permission")
const { DEFAULT_COMPANY_CODE, TEMP_OUTPUT } = require("../constants")
const { createLog } = require("../helpers/log")
const { getUserLanguage } = require("../helpers/lang")
const { 
    COMPANY_FN, 
    COMPANY_ADD, 
    COMPANY_EDIT
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
			const whereObject = user.AdminType ? {} : {
				CompanyCode: user.CompanyCode
			}
			const languageArray = getUserLanguage(user)
			const resultRecord = await CompanyProfile.findAll({
				include: [{
					attributes: [
						"FileID",
						"LangID"
					],
					model: CompanyProfileFile,
					where: {
						LangID: languageArray
					},
					required: false
				}],
				where: whereObject
			})
			dataTableObj.data = resultRecord
			dataTableObj.recordsFiltered = resultRecord.length
			dataTableObj.recordsTotal = resultRecord.length
			res.json(dataTableObj)
		}catch(err) {
			res.status(500).json(errorDataTable(err, dataTableObj))
		}
	},
	async list(req, res) {
		try {
			const user = await getUser(req)
			const whereObject = user.AdminType ? {} : {
				CompanyCode: user.CompanyCode
			}
			const companyProfile = await CompanyProfile.findAll({
				where: whereObject
			});

			return res.json({ companyProfile })
		} catch (err) {
			res.json(errorJson(err))
		}
	},
	async save(req, res) {
		try {
			const user = await getUser(req)
			const languageArray = getUserLanguage(user)
			const selectedCompanyCode = user.AdminType ? req.body.company : user.CompanyCode
			const company = await CompanyProfile.findByPk(selectedCompanyCode)
            if(!company){
                throw Error("Company not exist!")
            }
			
            const company_code =  company.CompanyCode || DEFAULT_COMPANY_CODE
			const value = await uploadCompanyProfile.validateAsync({...req.body, ...{
                company_code
            }})
			
			if(!languageArray.includes(value.language)){
				throw Error("Not in your language!")
			}
            
			const file = await CompanyProfileFile.findOne({
				where: {
					CompanyCode: company_code,
                	LangID: value.language
				}
			})
			if(file){
				file.Path = value.blobName
				file.Preview = null
				file.save()
				createLog(req, user.UserMemberID, COMPANY_FN, `${COMPANY_EDIT} ${company.Name}`)
			}else{
				await CompanyProfileFile.create({
					CompanyCode: company_code,
					Path: value.blobName,
					LangID: value.language
				})
				createLog(req, user.UserMemberID, COMPANY_FN, `${COMPANY_ADD} ${company.Name}`)
			}

			//Create each section
			const allSection = await Section.findAll()
			
			// TODO: Refector Company Section to database query that does not have this new section
			/*const companyWithNoSection = await CompanyProfile.findAll({
				where: {
					SectionID: {
						[Op.notIn]: allSection.map(x => x.)
					}
				}
			})*/
			const allCompany = await CompanyProfile.findAll({
				include:[{
					model: CompanySection
				}]
			})
			for(const eachCompany of allCompany){
				const sections = await eachCompany.getCompanySections()
				if(sections.length == 0){
					await CompanySection.bulkCreate(allSection.map((s) => {
						return {
							CompanyCode: eachCompany.CompanyCode,
							SectionID: s.SectionID,
							CompanyOrder: s.Order
						}
					}))
				}else{
					const allSectionID = sections.map(x => x.SectionID)
					for(const eachSection of allSection){
						if(!allSectionID.includes(eachSection.SectionID)){
							const lastItem = await CompanySection.findOne({
								where: { CompanyCode: eachCompany.CompanyCode },
								order: [["CompanyOrder", "DESC"]],
								raw: true
							})
							await CompanySection.update({ 
								CompanyOrder: lastItem.CompanyOrder + 1,
							}, {
								where: {
									CompanyOrder: lastItem.CompanyOrder,
									CompanyCode: eachCompany.CompanyCode
								}
							})
							CompanySection.create({
								CompanyCode: eachCompany.CompanyCode,
								SectionID: eachSection.SectionID,
								CompanyOrder: lastItem.CompanyOrder
							})
						}
					}
				}
			}
			
			// Update master Company Profile table
			company.setDataValue("UpdatedDate", new Date())
			company.UpdatedBy = user.UserMemberID
			await company.save()
			
			res.status(200).end()
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async previewPowerPoint(req, res){
		try{
			const { fileId } = req.params
			const file = await CompanyProfileFile.findByPk(fileId)
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