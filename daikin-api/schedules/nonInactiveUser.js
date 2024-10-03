const models = require("../models")
const { formatSQLDate } = require("../helpers/storage")

const { Sequelize, sequelize, UserMember, UserLog } = models
const { Op,literal } = Sequelize

const INACTIVE_DAY = 7

module.exports = async () => {
    try {
        const beforeDate = new Date(Date.now() - INACTIVE_DAY * 24 * 60 * 60 * 1000) 
        //console.log(await UserLog.findAll())
        const resultRecord = await sequelize.query(`SELECT u.UserMemberID, u.CreatedDate AS CDate, l.CreatedDate AS LDate FROM usermembers AS u 
        LEFT JOIN userlogs AS l ON l.id = (SELECT id FROM userlogs AS ul WHERE ul.UserMemberID = u.UserMemberID ORDER BY ul.CreatedDate DESC LIMIT 1)
        WHERE u.CreatedDate < "${formatSQLDate(beforeDate)}" AND (l.CreatedDate < "${formatSQLDate(beforeDate)}" OR l.CreatedDate IS NULL)`, { 
            type: sequelize.QueryTypes.SELECT 
        })

        if (resultRecord.length > 0) {
            const deleteUserArray = resultRecord.map(x => {
                console.log(`Delete Inactive User: ${x.UserMemberID}`)
                return x.UserMemberID
            })

            await UserMember.update({
                UserMemberStatus: false
            },{ 
                where: { UserMemberID: deleteUserArray }
            })

        }
    } catch (err) {
        console.error(err);
    }
}