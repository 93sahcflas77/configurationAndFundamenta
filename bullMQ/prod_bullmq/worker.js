const { Worker } = require("bullmq")
const { workerConnection } = require("./redis")
const sendEmail = require("./sendEmail")
const { addJobLog } = require("./queue")


const worker = new Worker(
    "emailQueue",
    async job => {

        await job.updateProgress({
            step: "Preparing Email",
            percent: 20
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));

        await job.updateProgress({
            step: "Sending Email",
            percent: 60
        });

        await sendEmail({
            to: job.data.to,
            subject: job.data.subject,
            text: job.data.text,
            html: job.data.html
        })

        await job.updateProgress({
            step: "Completed",
            percent: 100
        });

        return {
            success: "Email successfully sent",
            jobId: job.id
        }
    },
    {
        connection: workerConnection,
        lockDuration: 12000,
        stalledInterval: 5000,
        maxStalledCount: 2,
        drainDelay: 5,
        skipLockRenewal: false,
        skipStalledCheck: false,
        metrics: {
            maxDataPoints: 500
        }
    }
)

worker.on("completed", (job) => {

    console.log(`Job ${job.id} completed`);

});

worker.on("failed", (job, err) => {

    console.log(`Job ${job.id} failed`);

    console.log(err.message);

});

worker.on("progress", (job, progress) => {

    console.log(`Job ${job.id} progress:`, progress);

});