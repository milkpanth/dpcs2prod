module.exports = {
    getUserLanguage(user) {
        const langArray = ["en"]
        if(!user){
            return langArray
        }
        if(user.CountryID){
            // Map country to language
            switch(user.CountryID){
                case "TH":
                    langArray.push("th")
                    break
                case "VN":
                    langArray.push("vn")
                    break
            }
        }
        return langArray
    }
}