require("dotenv").config();

const axios  = require("axios")
const api = require("asposeslidescloud");
const CloudConvert = require("cloudconvert");
const { promises : fs, createReadStream } = require('fs');
const { TEMP_OUTPUT, PDF_PREFIX } = require("../constants");
const { SCREENSHOT } = require("../constants/container");

//const slidesApi = new api.SlidesApi("9451f5a5-f5ff-4a0e-a43e-60c5cdf1f87c", "c5e83f8238507eb3303f974ea2449aa8");
const slidesApi = new api.SlidesApi(null, null, "http://localhost:8088");
const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API_KEY);

const convertPDF = async (fileName, isPreview) => {
    const job = await cloudConvert.jobs.create({
        "tasks": {
            "import-1": {
                "operation": "import/upload"
            },
            "task-1": {
                "operation": "convert",
                "input": [
                    "import-1"
                ],
                "output_format": "pdf"
            },
            "export-1": {
                "operation": "export/url",
                "input": [
                    "task-1"
                ],
                "inline": false,
                "archive_multiple_files": false
            }
        },
        "tag": "jobbuilder"
    })

    const uploadTask = job.tasks.find(task => task.name === "import-1")
    const inputFile = createReadStream(`${TEMP_OUTPUT}/${fileName}`)
    
    await cloudConvert.tasks.upload(uploadTask, inputFile)


    const finished_job = await cloudConvert.jobs.wait(job.id)
    const fileLists = cloudConvert.jobs.getExportUrls(finished_job)
    const file = fileLists.pop()

    const convertRespose = await axios.get(file.url, {
        responseType: "arraybuffer"
    })
    if(!convertRespose.data){
        throw Error("No Data!")
    }
    const pdfFileName = `${fileName}${(isPreview) ? PREVIEW_PREFIX : PDF_PREFIX}.pdf`
    await fs.writeFile(`${TEMP_OUTPUT}/${pdfFileName}`, convertRespose.data)
    
    return pdfFileName
}

const convertPNG = async (fileName) => {
    console.log("Convert PPTX to PNG...")
    const job = await cloudConvert.jobs.create({
        "tasks": {
            "import-1": {
                "operation": "import/upload"
            },
            "task-2": {
                "operation": "convert",
                "input": [
                    "import-1"
                ],
                "output_format": "png"
            },
            "export-2":{
                "operation": "export/azure/blob",
                "input": [
                    "task-2"
                ],
                "storage_account": process.env.CLOUD_CONVERT_AZURE_ACCOUNT,
                "sas_token": process.env.CLOUD_CONVERT_SAS_TOKEN,
                "container": SCREENSHOT,
            }
        },
        "tag": "jobbuilder"
    })

    const uploadTask = job.tasks.find(task => task.name === "import-1")
    const inputFile = createReadStream(`${TEMP_OUTPUT}/${fileName}`)
    
    await cloudConvert.tasks.upload(uploadTask, inputFile)

    const finished_job = await cloudConvert.jobs.wait(job.id)
    return finished_job.every(j => j.status == "finished")
}

const mergePPTX = async (fileList, fileName) => {
    const files = []

    const request = new api.OrderedMergeRequest()
    request.presentations = []

    if(fileList.length == 1){
        const firstFile = fileList.pop()
        console.log("Copying PPTX file to local...")
        await fs.copyFile(`${firstFile.folder}/${firstFile.file}`, `${TEMP_OUTPUT}/${fileName}`)
    }else{
        for(const eachFile of fileList){
            const presentation = new api.PresentationToMerge()
            presentation.path = eachFile.file//"1665424701715-1c9de39d-226f-421c-895a-082247efadc9.pptx"
            //if(eachFile.local){
                files.push(createReadStream(`${eachFile.folder}/${eachFile.file}`)) 
            //}else{
            //    presentation.source = api.PresentationToMerge.SourceEnum.Storage
            //}
            request.presentations.push(presentation)
        }
        console.log("Merging PPTX via ASPOSE...")
        // Collect the presentations to merge.
        /*const fileStream1 = fs.createReadStream("temps/1665424701715-1c9de39d-226f-421c-895a-082247efadc9.pptx")
        const fileStream2 = fs.createReadStream("temps/1664936461106-211b0d65-7040-4d06-a901-2895dcd3cdf3.pptx")
        

        // Prepare information for the first presentation to merge.
        const presentation1 = new api.PresentationToMerge()
        presentation1.path = "1665424701715-1c9de39d-226f-421c-895a-082247efadc9.pptx"
        //presentation1.slides = [1, 2]

        // Prepare information for the secondary presentation to merge.
        const presentation2 = new api.PresentationToMerge()
        presentation2.path = "1664936461106-211b0d65-7040-4d06-a901-2895dcd3cdf3.pptx"
        //presentation1.slides = [1, 2]*/

        // Prepare the merge request.
        

        // Merge the presentations.
        const res = await slidesApi.mergeOnline(files, request)
        //const res = await slidesApi.mergeAndSaveOnline(pptxFile, files, request, "AzureStorage")
        //console.log(res)
        /*.then((response) => {
            // Save the result to a file.
            fs.writeFile(TEMP_OUTPUT + "/MyPresentation.pptx", response.body, (error) => {
                if (error) throw error
                console.log("OK")
            })
            
        }).catch((err)=>{
            console.error(err)
        })*/
        console.log("Writing merged PPTX file to local...")
        await fs.writeFile(`${TEMP_OUTPUT}/${fileName}`, res.body)
    }
}

module.exports = { convertPNG, convertPDF, mergePPTX }