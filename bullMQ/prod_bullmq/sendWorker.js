const { Worker } = require("bullmq")
const { workerConnection } = require("./redis");


const worker = new Worker(
    "sendQueue",
    async job => {
        console.log("Send Email");

        console.log(job.data);

        new Promise(reslove => {
            setTimeout(reslove, 1000)
        })

        return {
            email: job.data.email
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