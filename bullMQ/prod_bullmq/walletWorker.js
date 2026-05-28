const { Worker } = require("bullmq");
const { workerConnection } = require("./redis");


const walletWorker = new Worker(
    "walletQueue",
    async job => {
        console.log("User wallet");
        console.log(job.data);

        new Promise(reslove => {
            setTimeout(reslove, 1000)
        })

        return {
            balance: job.data.balance
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