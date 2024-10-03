const models = require("../models")
const { UserLog } = models

module.exports = {
    async createLog(req, oid, type, detail){
        const ipaddress = getIP(req)
        UserLog.create({
            UserMemberID: oid,
            IPAddress: ipaddress,
            Function: type,
            Detail: detail,
            CreatedDate: new Date()
        })
    }
}

function getIP(req){
    const forwardedRemote = req.headers["x-real-ip"] || req.headers["x-forwarded-for"]
    const proxyRemote = req.ip || req.connection.remoteAddress
    const ip = (forwardedRemote) ? forwardedRemote : proxyRemote
    if (ip.substr(0, 7) == "::ffff:") {
        return ip.substr(7)
    }
    return ip
}
