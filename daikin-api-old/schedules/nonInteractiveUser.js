const models = require("../models")

const { Sequelize, UserMember } = models
const { Op } = Sequelize

const INACTIVE_DAY = 7

module.exports = async () => {
    try {
        const beforeDate = new Date(Date.now() - INACTIVE_DAY * 24 * 60 * 60 * 1000) 
        const resultRecord = await UserMember.findAll({
            where: {
                CreatedDate: { [Op.lt]: beforeDate }
            }
        })

        if (resultRecord.length > 0) {
            for(const user of resultRecord){
                console.log(`Delete Inactive User: ${user.UserMemberID}`)
                
                //user.destroy()
            }
        }
    } catch (err) {
        console.error(err);
    }
}