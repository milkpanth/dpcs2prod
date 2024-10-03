const models = require("../models")
const axios  = require("axios")
const axiosRetry  = require("axios-retry")
const xpath = require("xpath")
const { DOMParser } = require('xmldom')
const domParser = new DOMParser()
const { convertPDF } = require("../helpers/aspose")
const { errorJson } = require("../helpers/error")

const { downloadToTemp, uploadFile } = require("../helpers/storage")
const { TEMP_OUTPUT } = require("../constants")

axiosRetry(axios, { 
	retryDelay: () => 3000,
	retries: 3,
	onRetry: (retryCount) => {
		console.log(`Retry : ${retryCount}`)
		return
	},
	retryCondition: (responseResult) => {
		return (responseResult.data)
	}
})

module.exports = {
	async preview(req, res) {
		try {
			const googlePreviewData = await axios.get(`https://drive.google.com/viewerng/viewer?url=${req.file.url}`, {
				responseEncoding: "UTF-8",
				responseType: "text/html"
			})
			if(!googlePreviewData.data){
				throw Error("No Data!")
			}
			//console.log(googlePreviewData)
			const doc = domParser.parseFromString(googlePreviewData.data);
			const jsText = xpath.select("string(//script[5])", doc)//xpath.fromPageSource(doc).findElement("//script[5]")
			const parsedObject = JSON.parse(jsText.slice(6, -2))
			//console.log(parsedObject)
			/*const googlePreviewData = await axios.get(`https://drive.google.com/viewerng/viewer?url=https://stordpcsprdsea001.blob.core.windows.net/test/1661231297969-643017648CAT+Telecom.pptx`, req, {
				//responseType: "stream",
			})		
			res.send(a.data).end()*/
			const pdfUrl = parsedObject[1][28][6]
			if(!pdfUrl){
				throw Error("No URL!")
			}
			const pdfPreview = await axios.get(pdfUrl, {
				responseType: "stream"
			})
			pdfPreview.data.pipe(res)
			//res.send(pdfPreview.data).end()
		} catch (err) {
			console.error(err)
			res.status(404).end()
		}
	},
	async uploadExcel(req, res) {
		try {
			if (!req.file) {
				throw Error("No File!")
			}

			res.json({
				blobName: req.file.blobName
			})
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async uploadPowerPoint(req, res) {
		try {
			if (!req.file) {
				throw Error("No File!")
			}
			//const buffer = await fs.readFile(req.file.path)
			//const pdfUrl = await generatePDFLocal(buffer, req.file.filename)
			//const pdfUrl = await googleServicePDFPreview(req.file.url, req.file.blobName)
			res.json({
				blobName: req.file.blobName
			})
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	},
	async previewPowerPoint(req, res){
		try {
			const { blobName } = req.params
			if (!blobName) {
				throw Error("No Blob!")
			}
			/*const blob = await getBlob(blobName)
			const buffer = await blob.downloadToBuffer()*/
			await downloadToTemp(blobName)
			//if(){
			const pdfFile = await convertPDF(blobName)
			uploadFile(`${TEMP_OUTPUT}/${pdfFile}`, pdfFile, "application/pdf")
			//}
			const filePath = await downloadToTemp(pdfFile)
			res.sendFile(filePath, { root: "." })
		} catch (err) {
			res.status(400).json(errorJson(err))
		}
	}
}