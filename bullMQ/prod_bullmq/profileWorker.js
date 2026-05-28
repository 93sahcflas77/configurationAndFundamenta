const { Worker } = require("bullmq")
const { workerConnection } = require("./redis");


const profileWorker = new Worker(
    "profieQueue",
    async job => {
        console.log("User Profile");
        console.log(job.data);

        new Promise(resolve => {
            setTimeout(resolve, 1000)
        })

        return {
            bio: job.data.bio
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