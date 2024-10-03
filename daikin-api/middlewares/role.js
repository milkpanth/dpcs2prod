require("dotenv").config();
const models = require("../models")
const { User, UserRole } = models

module.exports = async (req, res, next) => {
    if(!req.aad_data){
        throw Error("No Azure Data!")
    }

    const { oid, email } = req.aad_data
    if(!oid){
        throw Error("No OpenID")
    }

    const user = await User.findByPk(oid)
    if(user){
        const role = await UserRole.findAll({
            UserMemberID: oid
        })
    }else{
        await User.Create({
            UserMemberID: oid,
            //UserMemberName: given_name,
            //UserMemberSurename: family_name,
            UserMemberEmail: email,
            UserMemberStatus: true
        })
    }
    //console.log(user)

	return next()
}