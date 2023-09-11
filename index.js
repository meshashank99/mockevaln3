const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")

const PORT = process.env.PORT

const { connection } = require("./config/db")
const { classifiedRouter } = require("./routes/classified.routes")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("base api endpoint")
})  

app.use("/classifieds", classifiedRouter)

app.listen(PORT, async () => { 
    try { 
        await connection
        console.log("connected to db succesfully")
    } catch {
        console.log("error while connecting to db")
        console.log(error)
    }
    console.log(`listening on port ${PORT}`) 
}) 