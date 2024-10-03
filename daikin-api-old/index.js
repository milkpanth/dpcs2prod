require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./models")
const allRoute = require("./routes");
const allSchedule = require("./schedules")
const cors = require("cors")
const http = require("http")
const https = require("https")
const fs = require("fs")

//sequelize.sync().then(()=>{
  app.use(cors({ origin: "*" }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(allRoute);

  allSchedule.start()
  
    http.createServer((req, res) => {
      res.writeHead(301, { "Location": "https://" + req.headers["host"] + req.url });
      res.end();
    }).listen(80)
    const options = {
      key: fs.readFileSync("./2023-_.daikinthai.com-decrypted.key"),
      cert: fs.readFileSync("./2023-_.daikinthai.com.crt"),
      ca: fs.readFileSync("./2023-DigiCertCA.crt")
    }
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Production server listening on the port : ${PORT}`);
    })
  
//}).catch((error) => {
//  console.error("Sequelize Sync Error!")
//  console.error(error)
//  process.exit()
//})