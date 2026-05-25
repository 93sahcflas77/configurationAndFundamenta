const { Worker } = require("bullmq");
const { workerConnection } = require("./redisConnection");
const queue = require("./queue");

const worker = new Worker("emailQueue",
    async job => {
        // console.log(job.id);  // Unique job identifier. 
        // console.log(job.name);  // Job type.
        // job.data.email = "a@gmail.com"  // Update:data
        // console.log(job.opts);  // Job options.
        // console.log(job.queueName); // Queue owner.
        // console.log(job.timestamp); // Creation time.
        // console.log(job.processedOn); // Start time.
        // console.log(job.finishedOn); // Finish time.
        // console.log(job.progress); // Progress value.
        // console.log(job.attemptsMade); // Retry count.
        // console.log(job.delay); // Delay job
        // console.log(job.failedReason); // Failure cause.
        // console.log(job.returnvalue); // Worker result.

        // Change payload.
        // await job.updateData({
        //     email: "chandan7073251686@gmail.com"
        // })


        // Update progress.
        // await job.updateProgress("20");
        // await job.updateProgress("100");
        // console.log(job.progress); // Progress value.

        // await job.updateProgress("10");
        // console.log("Processing...   10%");
        // await job.updateProgress("50");
        // console.log("Processing...   50%");
        // await job.updateProgress("100");


        // log():- Add logs.
        // await job.log("started");
        // const logs = await queue.getJobLogs(job.id);
        // console.log(logs);


        // remove
        // await job.remove();
        // console.log("delete a job");


        // retry
        // await job.retry("failed")   // Retry failed job.


        // discard
        // await job.discard()   //Disable retries.


        // promote
        // await job.promote()   // Move delayed → waiting. 


        // changeDelay
        // await job.changeDelay(3000);    //Update delay.


        // moveToCompleted
        // await job.moveToCompleted("done", job.token)  // Force complete.
        

        // moveToFailed
        // await job.moveToFailed(new Error(). job.token);  // Force fail.


        // moveToDelayed
        // await job.moveToDelayed(Date.now()+5000, job.token);   // Move to delayed.



        // extendLock
        // await job.extendLock(job.token, 30000);    // Extend processing lock.



        // getState 
        const state = await job.getState();   //Read status. [waiting]
        console.log(`job status: ${state}`);


        // await job.isCompleted();
        // await job.isFailed();
        // await job.isDelayed();
        // await job.isWaiting();
        // await job.isActive();


        // waitUntilFinished
    //    const result =  await job.waitUntilFinished();   // Wait for result.
        // console.log(result);
       
        // return {
        //     ok: true
        // }


        await new Promise(resolve => {
            setTimeout(resolve, 5000)
        })

        console.log("Processing:", job.data);  // Actual payload.

        console.log(`Done`);

        
        
        // Parent Job Access
        const parent = await job.getParent();
        console.log(parent);

        // getChildrenValues()   Read child results.
        const values = await job.getChildrenValues();
        console.log(values);

        // getDependencies()  Read dependencies.
        const dep = await job.getDependencies();
        console.log(dep); 

        // removeDependency()  Remove one child.
        await job.removeDependency(childKey)

        // moveToWaitingChildren()   Move parent.    parent  -> wait children
        await job.moveToWaitingChildren(job.token)

    },
    {
        // connection:{
        //     host: "127.0.0.1",
        //     port: 6379
        // }

        // worker option
        connection: workerConnection,  //Connect Worker → Redis.
        concurrency: 5,  // Number of jobs processed simultaneously.
        // autorun: true,  // Auto start processing. Default true, ex: autorun: false then await worker.run()  user thrn worker run
        // lockDuration: 120000 , // 2 min     // How long Worker owns a job.  start -> lock -> work -> unlock
        // stalledInterval:  5000 ,      // Check interval for stuck jobs.  every 30 sec -> check dead workers
        // maxStalledCount: 2,   // Retry stalled jobs.  attempt1 → crash | attempt2 → fail
        // drainDelay: 10,         // Wait before polling empty queue. Queue empty -> sleep 5 sec -> check again  default value -> 5 [1-> lower and 10-> higher]
        // skipLockRenewal:  false,   // Disable lock extension. default true job running ->  extend lock  ->  extend lock    value true then long job  -> lock expires  ->duplicate execution
        // skipStalledCheck: false,   // Disable stalled detection.  default value false detect crashes  -> recover jobs  value true crashed job -> lost forever
        // metrics: {                // Collect Worker metrics.
            // maxDataPoints: 500
        // }

    }
)

// Worker Properties
// console.log(worker.name); // Queue name.
// console.log(worker.opts);   //Worker options.
// console.log(worker.id); // Worker identifier.
// console.log(worker.concurrency);   // Number of parallel jobs.
// console.log(worker.running);   // Current state.


// Worker Methods
async function check(){  
    // await worker.pause();  // Stop taking jobs.
    // console.log(worker.running);

    // await worker.resume();  // Resume processing.
    // console.log(worker.running);

    // await worker.close(); // Graceful shutdown.  finish current job -> close
    // await worker.disconnect(); // Immediate disconnect. stop now

    // await worker.run();   // Start worker.

    const waitUntilReady = await worker.waitUntilReady();    // Wait Redis connection.
    // console.log(`wait Until Ready: ${JSON.stringify(waitUntilReady, null, 2)}`);

    const isRunning = await worker.isRunning();   // Check state.
    // console.log(`Is running: ${isRunning}`);

    const isPaused = await worker.isPaused();  // Check pause.
    // console.log(`Is paused: ${isPaused}`);

    const getNetJob = await worker.getNextJob();   // Fetch next manually.
    // console.log(`What next job: ${getNetJob}`)

    const rateLimit = await worker.rateLimit(5000); // Pause temporarily.
    // console.log(`Rate limit: ${rateLimit}`);

    const delay = await worker.delay(3000);  // Delay worker.
    // console.log(`worker delay: ${delay}`);

    const emit = await worker.emit("hello");
    // console.log(`worker emit: ${emit}`);

    const removeAllListeners = await worker.removeAllListeners();
    // console.log(`remove All Listeners: ${removeAllListeners}`)
}

check();

worker.on("completed", (job) => {  // Listen event.
    console.log(job.id)
})


worker.once("completed", () => {  // Listen once.
    console.log("once")
})


function fn(){}

worker.on("completed", fn);
worker.off("completed", fn);    // Remove listener.



// Event method

// complet
worker.on("completed", (job) => {
    console.log(job.id)
})

// failed
worker.on("failed", (job, error) => {
    console.log(error.message);
})

//  active
worker.on("active", (job) => [
    console.log("start")
])

// progress
worker.on("progress", (job, p) => {
    console.log(p);
})

// paused
worker.on("paused", () => {
    console.log("paused");
})

// resumed
worker.on("resumed", () => {
    console.log("resumed");
})

// error
worker.on("error", (err) => {
    console.log(err.message);
})

// drained Queue empty.
worker.on("drained", () => {
    console.log("empty")
})

// closing
worker.on("closing", () => {
    console.log("closing")
})

// closed
worker.on("closed", () => {
    console.log("closed");
})

