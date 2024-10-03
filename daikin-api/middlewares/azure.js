require("dotenv").config();

const models = require("../models")
const { UserMember, UserRole, CompanyProfile } = models

const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')

const { getUserFromGraph } = require("../helpers/graph")
const { DEFAULT_COUNTRY, DEFAULT_COMPANY_CODE, INTERNAL_USER_PREFIX } = require("../constants")
const { ROLE_GLOBAL } = require("../constants/admin")
const { permissionChecker, getUserType } = require("../helpers/permission")

const client = jwksClient({
    jwksUri: "https://login.microsoftonline.com/common/discovery/keys",
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    cache: true,
    cacheMaxEntries: 10,
    cacheMaxAge: 86400
})

function getKey(header, callback){
    client.getSigningKey(header.kid, (err, key) => {
        if(err){
            callback(err)
        }
        const signingKey = key.publicKey || key.rsaPublicKey
        callback(null, signingKey)
    })
}

const aadMiddleware = async (req, res, next) => {
    try{
        const { authorization } = req.headers
        if(!authorization){
            throw Error("No Authorization")
        }
        const token = authorization.slice(7, authorization.length)
        if(!token){
            throw Error("No Token")
        }
        const aad_user_data = await new Promise((resolve, reject) => jwt.verify(token, getKey, {
            algorithm: "RS256",
            ignoreExpiration: true
        }, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(decoded)
        }))
        req.aad_data = aad_user_data
        next()
    }catch(err){
        console.error(err)
        return res.status(400).send(err.message)
    }
}

const roleMiddleware = async (req, res, next) => {
    try{
        const { oid } = req.aad_data
        if(!oid){
            throw Error("No OpenID")
        }

        const user = await UserMember.findByPk(oid)
        if(!user){
            const info = await getUserFromGraph(oid)
            const { givenName, surname, extension_25df96e0112c41428645a90445fd9e69_CompanyCode, companyName, jobTitle, mail, usageLocation } = info

            const company = await CompanyProfile.findByPk(extension_25df96e0112c41428645a90445fd9e69_CompanyCode || DEFAULT_COMPANY_CODE)
            if(!company){
                await CompanyProfile.create({
                    CompanyCode: extension_25df96e0112c41428645a90445fd9e69_CompanyCode,
                    Name: companyName,
                    CreatedDate: new Date(),
                    CreatedBy: oid
                })
            }
            
            const userType = getUserType(extension_25df96e0112c41428645a90445fd9e69_CompanyCode)
            await UserMember.upsert({
                UserMemberID: oid,
                CompanyCode: extension_25df96e0112c41428645a90445fd9e69_CompanyCode || DEFAULT_COMPANY_CODE,
                UserMemberName: givenName,
                UserMemberSurname: surname,
                UserMemberEmail: mail,
                UserMemberStatus: true,
                Position: jobTitle,
                CountryID: usageLocation || DEFAULT_COUNTRY,
                RecentLogin: new Date()
            })
            if(userType == INTERNAL_USER_PREFIX){
                // Sale Rep
                await UserRole.create({
                    UserMemberID: oid,
                    RoleID: 7
                })
            }else{
                // External
                await UserRole.create({
                    UserMemberID: oid,
                    RoleID: 8
                })
            }
        }

        if(req.metadata){
            const isAllow = await permissionChecker(oid, req.metadata.Menu, req.metadata.Action)
            if(!isAllow){
                return res.status(403).end()
            }
        }
        
        next()
    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }
}

const multipleRoleMiddleware = async (req, res, next) => {
    try{
        const { oid } = req.aad_data
        if(!oid){
            throw Error("No OpenID")
        }

        if(req.metadata){
            for(const each of req.metadata){
                const isAllow = await permissionChecker(oid, each.Menu, each.Action)
                if(isAllow){
                    return next()
                }
            }
        }

        res.status(403).end()
    }catch(err){
        console.error(err)
        res.status(400).send(err.message)
    }
}

module.exports = { aadMiddleware, roleMiddleware, multipleRoleMiddleware }