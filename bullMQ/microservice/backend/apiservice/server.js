require("dotenv").config();
const express = require("express");
const serverAdapter = require("./bullBoard");
const queue = require("./queue");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use("/admin/queues", serverAdapter.getRouter())

app.get("/", (req, res) => {
    res.json({
        message: "ok"
    })
})

// app.get("/send-email", async (req, res) => {
//     try {

//         const { useremail, subject, test, ctaLink, appName } = req.body

//         const sendEmailData = {
//             useremail, subject, test, ctaLink, appName
//         }

//         const emailQueue = await queue.add(
//             "emailQueue",
//             {
//                 sendEmailData
//             },
//             {
//                 delay: 3000,
//                 priority: 2,
//                 jobId: `emailsent-${Date.now()}`
//             }
//         )

//         res.json({
//             success: "true",
//             queue: emailQueue
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// })


app.post("/send-email", async (req, res) => {
    try {

        const { useremail, subject, test } = req.body

        console.log(req.body);

        const sendEmailData = {
            useremail, subject, test
        }

        const emailQueue = await queue.add(
            "emailQueue",
            {
                sendEmailData
            },
            {
                delay: 3000,
                priority: 2,
                jobId: `emailsent-${Date.now()}`
            }
        )

        res.json({
            success: "true",
            queue: emailQueue
        })

    } catch (error) {
        console.log(error.message);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is runing http:localhost:${process.env.PORT}`)
})
