const models = require("../models")
const { 
    CompanyProfileFile,
    GenericFile,
    ModelFile,
    ModelTemplate,
    Proposal,
    SeriesFile,
    SeriesTemplate,
} = models
const { getBlob } = require("../helpers/storage")

module.exports = async () => {
    //const lostFile = []
    async function checkFile(files){
        for(const f of files){
            if(f.Path){
                await isExist(f.Path)
            }
            if(f.Preview){
                await isExist(f.Preview)
            }
            if(f.PDFFile){
                await isExist(f.PDFFile)
            }
            if(f.PPTXFile){
                await isExist(f.PPTXFile)
            }
        }
    }

    async function isExist(f){
        const bc = await getBlob(f)
        const x = await bc.exists()
        if(!x){
            console.log(f)
        }
        /*.then(x => {
            if(!x){
                //lostFile.push(f)
                console.log(f)
            }
            return x
        }).catch(e => {
            console.log(e)
            return false
        })*/
    }
    const cp = await CompanyProfileFile.findAll()
    console.log("CompanyProfileFile")
    await checkFile(cp)
    
    const g = await GenericFile.findAll()
    console.log("GenericFile")
    await checkFile(g)

    const mf = await ModelFile.findAll()
    console.log("ModelFile")
    await checkFile(mf)

    const mt = await ModelTemplate.findAll()
    console.log("ModelTemplate")
    await checkFile(mt)

    const p = await Proposal.findAll()
    console.log("Proposal")
    await checkFile(p)

    const sf = await SeriesFile.findAll()
    console.log("SeriesFile")
    await checkFile(sf)

    const st = await SeriesTemplate.findAll()
    console.log("SeriesTemplate")
    await checkFile(st)

}