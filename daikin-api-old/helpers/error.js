module.exports = {
    errorJson(err) {
        console.error(err)
        if(err.details){
            return { message: err.details.errorCode }
        }
        if(err.message){
            return { message: err.message }
        }
        return { message: "Unknown Error!" }
    },
    errorDataTable(err, dt){
        console.error(err)
        dt.error = err.message
        return dt
    }
}