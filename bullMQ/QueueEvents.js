const { QueueEvents } = require("bullmq");
const { queueEventConnection } = require("./redisConnection")

const events = new QueueEvents("emailQueue", {
    connection: queueEventConnection
});


// QueueEvents Properties
console.log(events.name);   // Queue name.
console.log(events.opts); // Configuration.
console.log(events.running);  // Current state.
console.log(events.client);   // Redis connection.


// QueueEvents Methods


async function met(){

    // waitUntilReady
    await events.waitUntilReady();   // Wait for Redis.
    console.log("Ready");

    // close()
    await events.close();   // Gracefully close. connected  ->  close
 
    // disconnect()
    await events.disconnect()  // Force disconnect.

}

met()

// Listen continuously.  output:- every completion
events.on(
    // "failed",
    "completed",

    ({ jobId }) => {

        console.log(
            "Done:",
            jobId
        );

    }

);

// Listen once.
events.once("completed", ({jobId}) => {
    console.log(jobId)
})


//  Remove listener.
events.off("completed", () => {
    console.log("remove listener")
})


// emit()   Manual event.
events.emit("completed", "hello");


// removeAllListeners()   Remove listeners.
events.removeAllListeners();


// completed   Triggered after success.
events.on("completed", ({jobId, returnvalue}) => {
    console.log(`jodID: ${jobId} and retuen value: ${returnvalue}`)
})


// failed  Triggered after failure.
events.on("failed", ({jobId, failedReason}) => {
    console.log(failedReason);
})


// active   Job started.
events.on("active", ({jobId, prev}) => {
    console.log(`job id: ${jobId} and pre job: ${prev}`)
})


// waiting  Waiting queue.
events.on("waiting", ({jobId, prev}) => {
    console.log(`job id: ${jobId} and pre job: ${prev}`)
})


// delayed   Delayed.
events.on("delayed", ({jobId, delay}) => {
    console.log(`job id: ${jobId} and delay job: ${delay}`)
})


// progress  Progress updates.
events.on("progress", ({jobId, data}) => {
    console.log(`job id: ${jobId} and job data: ${delay}`)
})


// paused
events.on("paused", () => {
    console.log("paused")
})


// resumed
events.on("resumed", () => {
    console.log("resumed")
})


// removed   Job removed.
events.on("removed", ({jobId, prev}) => {
    console.log(`job id: ${jobId} and remov job: ${prev}`)
})


// drained   Queue empty.
events.on("drained", ({}) => {
    console.log("empty");
})


// cleaned   Cleanup finished.
events.on("cleaned", ({count}) => {
    console.log(`clean count: ${count}`);
})


