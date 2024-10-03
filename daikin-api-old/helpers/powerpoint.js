const path = require('path');
const fs = require('fs').promises;
const axios = require("axios")
const xpath = require('xpath')
const { DOMParser } = require('xmldom')
const domParser = new DOMParser()
const { setTimeout } =  require("timers/promises")

const libre = require('libreoffice-convert')
const convertWithOptions = require('util').promisify(libre.convertWithOptions)
//const convertWithOptions = libre.convertWithOptions

const { uploadBlob } = require("./storage")
const { TEMPLATE_DIR, TEMP_OUTPUT, PDF_PREFIX, PREVIEW_PREFIX } = require("../constants")
const EXPIRE_TIME = 60 * 60 * 12 // 12 Hour

module.exports = {
    async generatePDF(fileBuff, fileName, isPreview){
        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        const pdfBuf = await convertWithOptions(fileBuff, "pdf", undefined, {
            //sofficeBinaryPaths: ["addons/libreoffice/program/simpress.exe"],
            tmpOptions: {
                tmpdir: TEMP_OUTPUT
            }
        })
        //const pdfBuff = await converter.convert("../temps/1662627760970-0f042348-fa59-4ce0-a914-7aab1a1bdd04.pptx");

        await uploadBlob(pdfBuf, `${fileName}${(isPreview) ? PREVIEW_PREFIX : PDF_PREFIX}.pdf`, "application/pdf")
        /*convertWithOptions(fileBuff, "pdf", undefined, {
            sofficeBinaryPaths: ["addons/libreoffice/program/soffice.exe"],
            tmpOptions: {
                tmpdir: TEMP_OUTPUT
            }
        },(err, pdfBuf)=>{
            if(err){
                console.error(err)
                return
            }
            uploadBlob(pdfBuf, `${fileName}${PREVIEW_PREFIX}.pdf`, "application/pdf")
        })*/

        // Remove unused file
        //removeOldFile(TEMP_OUTPUT, EXPIRE_TIME)
        return `${fileName}${(isPreview) ? PREVIEW_PREFIX : PDF_PREFIX}.pdf`
    },
    async generatePDFLocal(fileBuff, fileName, isPreview){
        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        /*const pdfBuf = await convertWithOptions(fileBuff, "pdf", undefined, {
            sofficeBinaryPaths: ["addons/libreoffice/program/soffice.exe"],
            tmpOptions: {
                tmpdir: TEMP_OUTPUT
            }
        })*/
        const pdfBuf = await convertWithOptions(fileBuff, "pdf", undefined, {
            sofficeBinaryPaths: ["addons/libreoffice/program/simpress.exe"],
            tmpOptions: {
                tmpdir: TEMP_OUTPUT
            }
        })
        await fs.writeFile(`${fileName}${(isPreview) ? PREVIEW_PREFIX : PDF_PREFIX}.pdf`, pdfBuf)
        //uploadBlob(pdfBuf, `${fileName}${PREVIEW_PREFIX}.pdf`, "application/pdf")
        /*convertWithOptions(fileBuff, "pdf", undefined, {
            sofficeBinaryPaths: ["addons/libreoffice/program/soffice.exe"],
            tmpOptions: {
                tmpdir: TEMP_OUTPUT
            }
        },(err, pdfBuf)=>{
            if(err){
                console.error(err)
                return
            }
            uploadBlob(pdfBuf, `${fileName}${PREVIEW_PREFIX}.pdf`, "application/pdf")
        })*/

        // Remove unused file
        //removeOldFile(TEMP_OUTPUT, EXPIRE_TIME)

        return `${fileName}${(isPreview) ? PREVIEW_PREFIX : PDF_PREFIX}.pdf`
    },
    async googleServicePDFPreview(url, fileName){
        try{
            if(!url){
                throw Error("No Document URL!")
            }

            await setTimeout(8000)

            const pdfUrl = await axios.get(`https://drive.google.com/viewerng/viewer?url=${url}`, {
                responseEncoding: "UTF-8",
                responseType: "text/html",
                "axios-retry": { 
                    retryDelay: () => 5000,
                    retries: 3,
                    onRetry: (retryCount) => {
                        console.log(`Retry : ${retryCount}`)
                    },
                    /*retryCondition: (responseResult) => {
                        const doc = domParser.parseFromString(responseResult.response.data);
                        const jsText = xpath.select("string(//script[5])", doc)
                        return true
                    }*/
                }
            }).then((response) => {
                //console.log(response)
                if (response.status !== 200) {
                    throw Error("Response Not 200!")
                }
                if(!response.data){
                    throw Error("No Data!")
                }
                const doc = domParser.parseFromString(response.data);
                const jsText = xpath.select("string(//script[5])", doc)
                if(!jsText){
                    throw Error("No JS Text!")
                }
                const parsedObject = JSON.parse(jsText.slice(6, -2))
                const url = parsedObject[1][28][6]
                return url
            }).catch((error) => {
                throw error
            })

            if(!pdfUrl){
                throw Error("No PDF URL!")
            }
            const pdfPreview = await axios.get(pdfUrl, {
                responseType: "arraybuffer"
            })
            if(!pdfPreview.data){
				throw Error("No Data!")
			}
            await fs.writeFile(`${TEMP_OUTPUT}/${fileName}${PREVIEW_PREFIX}.pdf`, pdfPreview.data)
            return `https://ase-dpcs-bndev-sea-001.azurewebsites.net/ppt/${fileName}${PREVIEW_PREFIX}.pdf`
        }catch(err){
            console.error(err)
            return null
        }
    },
    TEMP_OUTPUT,
    TEMPLATE_DIR
}

const removeOldFile = async (directory, seconds) => {
    const currentTime = Math.floor(new Date().getTime() / 1000);

    /*const files = Array.from(await fs.readdir(directory)).filter((file) => {
        return extensions.indexOf(file.split('.').at(-1)) !== -1;
    });*/
    const lists = await fs.readdir(directory)

    for (const item of lists) {
        const filePath = path.join(directory, item);
        const stats = await fs.stat(filePath);
        const birthTime = Math.floor(stats.birthtimeMs / 1000);
        if (currentTime - birthTime > seconds) {
            fs.rm(filePath);
        }
    }
}