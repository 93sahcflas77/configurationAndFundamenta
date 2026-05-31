require("dotenv").config()
require("./emailWorker");
const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.json({
        sucess: true
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is runing http://localhost:${process.env.PORT}`)
})