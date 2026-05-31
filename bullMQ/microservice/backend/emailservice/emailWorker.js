const { Worker } = require("bullmq")
const workerConnection = require("./redis");
const sendEmail = require('./sendEmail');
const welcomeTemplate = require("./welcome.templates")

const emailWorker = new Worker(
    "emailQueue",
    async job => {

        console.log("Sending ......")

        console.log(job.data);

        // const html = welcomeTemplate({
        //     username: job.data.sendEmailData.useremail,
        //     ctaLink: job.data.sendEmailData.ctaLink,
        //     appName: job.data.sendEmailData.appName
        // })

        await sendEmail({
            to: job.data.sendEmailData.useremail,
            subject: job.data.sendEmailData.subject,
            text: job.data.sendEmailData.test,
            // html
        })

        console.log('Sent email')

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

module.exports = emailWorker