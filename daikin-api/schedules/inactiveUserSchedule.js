const models = require("../models")
const { formatDateFullMonth } = require("../helpers/storage")
const { sendMail } = require("../helpers/mail")
const { SENDGRID_EXPIRE_USER_TEMPLATE } = require("../constants/mail")

const { Sequelize, UserMember, CompanyProfile } = models
const { Op } = Sequelize 
const INACTIVE_DAY = 30
const BEFORE_DAY = 1

module.exports = async () => {
    try {
        const nowDate = new Date()
        nowDate.setHours(0,0,0,0)

        // Use before expire day to send email first
        const beforeDate = new Date(nowDate.getTime() - (INACTIVE_DAY - BEFORE_DAY) * 86400000)  // 86400000 = 24 * 60 * 60 * 1000
        

        /*const resultRecord = await sequelize.query(`SELECT u.UserMemberID, u.CreatedDate AS CDate, l.CreatedDate AS LDate FROM usermembers AS u 
        LEFT JOIN userlogs AS l ON l.id = (SELECT id FROM userlogs AS ul WHERE ul.UserMemberID = u.UserMemberID ORDER BY ul.CreatedDate DESC LIMIT 1)
        WHERE u.CreatedDate > "${formatSQLDate(beforeDate)}" AND (l.CreatedDate < "${formatSQLDate(beforeDate)}" OR l.CreatedDate IS NULL)`, { 
            type: sequelize.QueryTypes.SELECT
        })*/
        const resultRecord = await UserMember.findAll({
            where: {
                [Op.or]: [{
                    RecentLogin: {
                        [Op.lte]: beforeDate
                    }
                },{
                    RecentLogin: {
                        [Op.eq]: null
                    }
                }],
                CreatedDate: {
                    [Op.lte]: beforeDate
                },
                UserMemberStatus: true
            },
            raw: true
        })

        if (resultRecord.length > 0) {
            /*const deleteUserArray = resultRecord.map(x => {
                console.log(`Delete Inactive User: ${x.UserMemberID}`)
                return x.UserMemberID
            })

            await UserMember.update({
                UserMemberStatus: false
            },{ 
                where: { UserMemberID: deleteUserArray }
            })*/
            for(const each of resultRecord){
                /*if(each.UserMemberID !== "9e1f806f-d8fd-475f-9286-12a3f3bed388"){
                    continue
                }*/
                const user = await UserMember.findByPk(each.UserMemberID)
                

                const counter = dateDiffInDays(each.RecentLogin || each.CreatedDate, nowDate)

                if(counter < INACTIVE_DAY){
                    const company = await CompanyProfile.findByPk(user.CompanyCode)
                    const expire = formatDateFullMonth(new Date(nowDate.getTime() + (BEFORE_DAY * 86400000)))
                    
                    sendMail(user.UserMemberEmail, SENDGRID_EXPIRE_USER_TEMPLATE, {
                        expire_date: expire,
                        no_login_day_counter: INACTIVE_DAY,
                        company_name: company.Name
                    })
                    console.log(`Send expire mail: ${user.UserMemberEmail}`)
                }else{
                    user.UserMemberStatus = false
                    user.save()
                    console.log(`Inactive user: ${user.UserMemberEmail}`)
                }
            }
        }
    } catch (err) {
        console.error(err)
    }
}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}