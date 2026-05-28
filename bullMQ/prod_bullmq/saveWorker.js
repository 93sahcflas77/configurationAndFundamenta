const { Worker } = require("bullmq")
const { workerConnection } = require("./redis");

const saveWorker = new Worker(
    "saveQueue",
    async job => {
        console.log("Save User")
        console.log(job.data);

        new Promise(reslove => {
            setTimeout(reslove, 1000)
        })

        return {
            email: job.data.email,
            name: job.data.name
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