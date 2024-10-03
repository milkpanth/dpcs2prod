const fs = require('fs').promises;

const { TEMP_OUTPUT } = require("../constants")
const EXPIRE_TIME = 60 * 60 * 12
const path = require("path")

module.exports = async () => {
    try {
        const directory = TEMP_OUTPUT
        const seconds = EXPIRE_TIME
        const currentTime = Math.floor(new Date().getTime() / 1000)
        /*const files = Array.from(await fs.readdir(directory)).filter((file) => {
            return extensions.indexOf(file.split('.').at(-1)) !== -1;
        });*/
        const lists = await fs.readdir(directory)

        for (const item of lists) {
            const filePath = path.join(directory, item)
            const stats = await fs.stat(filePath)
            const birthTime = Math.floor(stats.birthtimeMs / 1000)
            if (currentTime - birthTime > seconds) {
                console.log(`Delete temp file: ${item}`)
                fs.rm(filePath, { recursive: true })
            }
        }
    } catch (err) {
        console.error(err);
    }
}