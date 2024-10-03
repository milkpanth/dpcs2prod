
const { deleteBlob } = require("../helpers/storage")
const models = require("../models")

const { Sequelize, PendingProposal } = models
const { Op } = Sequelize

const INACTIVE_HOUR = 1

module.exports = async () => {
    try {
        const beforeDate = new Date(Date.now() - INACTIVE_HOUR * 60 * 60 * 1000)  

        const resultRecord = await PendingProposal.findAll({
            where: {
                CreatedDate: { [Op.lt]: beforeDate }
            }
        })

        if (resultRecord.length > 0) {
            for(const proposal of resultRecord){
                console.log(`Delete Pending Proposal: ${proposal.ID}`)
                deleteBlob(proposal.ProposalData.PDFFile)
                deleteBlob(proposal.ProposalData.PPTXFile)
                
                proposal.destroy()
            }
        }
    } catch (err) {
        console.error(err);
    }
}