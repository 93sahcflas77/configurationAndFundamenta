const { Queue } = require("bullmq");
const { queueConnection } = require("./redis")

const queue = new Queue(
    "emailQueue",
    {
        connection: queueConnection,
        defaultJobOptions: {
            removeOnComplete: {
                age: 3600,
                count: 100
            },
            removeOnFail: {
                age: 24 * 3600
            },
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000,
            }
        }
    }
)


module.exports = queue