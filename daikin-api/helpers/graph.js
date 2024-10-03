const axios = require("axios") 
const getToken = require("./aad_auth")
const GRAPH_URL = process.env.GRAPH_ENDPOINT + "v1.0"
const SELECT_ATTRIBUTE = [
    "givenName",
    "surname",
    "CompanyName",
    "extension_25df96e0112c41428645a90445fd9e69_CompanyCode",
    "jobTitle",
    "mail",
    "mobile"
]

module.exports = {
    async listUser(){
        try {
            const { accessToken } = await getToken()
            const response = await axios.get(`${GRAPH_URL}/users`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    async getUserFromGraph(openId){
        try {
            const { accessToken } = await getToken()
            const response = await axios.get(`${GRAPH_URL}/users/${openId}?$select=${SELECT_ATTRIBUTE.join(",")}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    async addUser(data){
        try {
            const { accessToken } = await getToken()
            const response = await axios.post(`${GRAPH_URL}/users`,{
                "accountEnabled": true,
                "displayName": data.displayName,
                "mailNickname": data.displayName,
                "userPrincipalName": data.userPrincipalName,
                "passwordProfile" : {
                  "forceChangePasswordNextSignIn": false,
                  "password": data.passwordProfile
                }
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            return error.response.data ? error.response.data : "Unknown Error!"
        }
    },
    async updateUser(data){
        try {
            const { accessToken } = await getToken()
            const mappedData = {
                "displayName": data.displayName,
                "mail": data.email,
                "jobTitle": data.jobTitle,
                "department": data.department,
                "givenName": data.givenName,
                "surname": data.surname,
                "usageLocation": data.usageLocation,
                "CompanyName": data.CompanyName,
                "extension_25df96e0112c41428645a90445fd9e69_CompanyCode": data.CompanyCode,
                "mobile": data.mobile,
                "streetAddress": data.streetAddress,
                "state": data.state,
                "city": data.city,
                "postalCode": data.postalCode
            }
            Object.keys(mappedData).map(k => mappedData[k] == undefined || mappedData[k] == "" ? delete mappedData[k] : mappedData[k])
            const response = await axios.patch(`${GRAPH_URL}/users/${data.id}`, mappedData, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            return error.response ? error.response.data : "Unknown Error!"
        }
    },
    async inviteUser(data){
        try {
            const { accessToken } = await getToken()
            const response = await axios.post(`${GRAPH_URL}/invitations`,{
                "invitedUserEmailAddress": data.email,
                "inviteRedirectUrl": process.env.REDIRECT_URL
              }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            return error.response ? error.response.data : "Unknown Error!"
        }
    }
}