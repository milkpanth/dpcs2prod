const axios = require("axios")
const SERVICE_URL = "http://localhost:5000/Main"

const mergePPTX = async (fileList, fileName) => {
    if(fileList.length == 1){
        const firstFile = fileList.pop()
        console.log("Copying PPTX file to local...")
        await fs.copyFile(`${firstFile.folder}/${firstFile.file}`, `${TEMP_OUTPUT}/${fileName}`)
    }else{
        console.log("Merging PPTX via PPTXMerger Service...")

        // Merge the presentations.
        await axios.post(SERVICE_URL, {
            "fileName": fileName,
            "fileList": fileList.map(f=>f.file)
        })
        //console.log("Writing merged PPTX file to local...")
       // await fs.writeFile(`${TEMP_OUTPUT}/${fileName}`, res.body)
    }
}

module.exports = { mergePPTX }