require("dotenv").config()
const express = require("express");
const upload = require("./multer");
const { checkconnection, client } = require("./minio");
const app = express();
const sendEmail = require("./sendEmail");
const { tryCatch } = require("bullmq");


app.post("/", upload.single("file"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const objectName = `${req.file.originalname}`;
        const bucketName = "chandan"

            const uploadData = await client.putObject(
                bucketName,
                objectName,
                req.file.buffer,
                req.file.size,
                {
                    "Content-Type": req.file.mimetype
                }
            )

            const fileUrl = `http://localhost:9000/${bucketName}/${objectName}`
        //     // htis download url

            const stream = await client.getObject(bucketName, objectName)

            await sendEmail({
                to: "chandan7073251686@gmail.com",
                subject: "file upload",
                text: "file upload successful",
                attachments: [
                    // manually
                    // {
                    //     filename: "test.txt",
                    //     path: "./files/text.txt"
                    // }

                    // file upload us: req.file  using up multer this function multer.diskStorage
                    // {
                    //     filename: req.file.filename,
                    //     path: req.file.path
                    // } 

                    // using in mino file path and file name
                    // file upload us: req.file  using up multer this function multer.diskStorage
                    {
                        filename: req.file.originalname, 
                        content: stream
                    } 
                ]
        })



        res.json({
            sucess: true,
            message: "file sent",
            objectName,
            bucketName,
            fileUrl
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})





app.listen(process.env.PORT, async () => {
    await checkconnection()
    console.log(`Server is runing http://localhost:${process.env.PORT}`)
})