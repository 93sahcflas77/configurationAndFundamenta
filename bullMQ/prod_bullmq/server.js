require("dotenv").config()
const express = require("express");
const serverAdapter = require("./bullBoard");
const { checkSMTP } = require("./nodemailer");
const emaiSent = require("./sendEmail")
const welcomeTeplate = require("./welcome.templates");
const route = require("./flow.route");
const queue = require("./queue");
const app = express();

require("./worker")
require("./saveWorker")
require("./sendWorker")
require("./walletWorker")
require("./profileWorker")


app.use("/", route)

app.use("/admin/queues", serverAdapter.getRouter())

app.get("/queue", async (req, res) => {

    const completedCount = await queue.getCompletedCount();

    res.json({
        QueueName: queue.name,
        JobsOptionn: queue.jobsOpts,
        QueueClient: queue.token,
        CompleteJob: completedCount
    })
})


app.get("/process/:id", async (req, res) => {

    try {
        const job = await queue.getJob(`${req.params.id}`);  // WORKER ALL METHOD SAME USE

        if (!job) {
            return res.status(404).json({
                message: "Job Not Found"
            });
        }

        res.json({
            id: job.id,
            progress: job.progress,
            data: job.data,
            returnvalue: job.returnvalue,
            failedReason: job.failedReason
        })

    } catch (error) {
        console.log(error)
    }
})

app.get("/email-sent", async (req, res) => {
    try {
        const userEmail = "chandan707325186@gmail.com";

        const html = welcomeTeplate({
            username: userEmail,
            ctaLink: "http://localhost:7000/admin/queues",
            appName: "INNOWAVE"
        })

        // await emaiSent({
        //     to: userEmail,
        //     subject: "Welcomw my App",
        //     html
        // })

        const job = await queue.add(
            "emailQueue",
            {
                to: userEmail,
                subject: "WelCome my application",
                text: "testing bullmq",
                html: html
            },
            {
                delay: 5000,
                priority: 2,
                jobId: `emailQueue`,
            }
        )

        const jobStatus = await job.getState()

        res.json({
            success: "ok",
            message: `Email successful sent ${userEmail}`,
            jodId: job.id,
            jobData: job.data,
            jobTimestam: job.timestamp,
            Status: jobStatus,
            process: job.progress
        })
    } catch (error) {
        console.error(`Sent mail Error: ${error.message}`)
    }
})

app.listen(process.env.PORT, async () => {

    await checkSMTP()
    await queue.setGlobalConcurrency(5)
    await queue.setGlobalRateLimit(5, 6000)


    console.log(`Server is runing http//localhost:${process.env.PORT}`)
})