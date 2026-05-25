const { QueueEvents } = require("bullmq");
const { queueEventConnection } = require("./redisConnection")

const event = new QueueEvents("emailQueue", {
    connection: queueEventConnection
});


events.on(

    "completed",

    ({ jobId }) => {

        console.log(
            "Done:",
            jobId
        );

    }

);

events.on(

    "failed",

    ({ jobId }) => {

        console.log(
            "Failed:",
            jobId
        );

    }
);