const express = require("express");
const serverAdapter = require("./BullMQUI");
const queue = require("./queue")

const app = express();


// Queue Methods
async function checks() {
    const count = await queue.count();   // Total waiting jobs.
    // console.log(count)

    const fetchOneJob = await queue.getJob("urgent")   // Fetch one job getJob(jod_id)
    // console.log(fetchOneJob);

    const allJobs = await queue.getJobs(["completed", "failed"]);     // Get many jobs.
    // console.log(allJobs);

    const getJobStatus = await queue.getJobState("vip");    // job status  getJobStatus(jo_id)
    console.log(getJobStatus);

    const getJobsCount = await queue.getJobCounts("completed", "failed");
    console.log(getJobsCount);


    const getJobCountByType = await queue.getJobCountByTypes("completed");
    console.log(getJobCountByType);

    const getWaiting = await queue.getWaiting();
    console.log(getWaiting);

    const getWatingCount = await queue.getWaitingCount();
    console.log(getWatingCount);

    const getActive = await queue.getActive();
    console.log(`Job active: ${getActive}`);

    const getctiveCount = await queue.getActiveCount();
    console.log(`Actine job count: ${getctiveCount}`);

    const getComplete = await queue.getCompleted();
    console.log(`Complete job: ${getComplete}`);

    const getComleteCount = await queue.getCompletedCount();
    console.log(`Complete job count: ${getComleteCount}`);

    const getFailed = await queue.getFailed();
    console.log(`Failed Job: ${getFailed}`)

    const getFailedCount = await queue.getFailedCount();
    console.log(`Failed job count: ${getFailedCount}`)

    const getDelay = await queue.getDelayed();
    console.log(`Delay job: ${getDelay}`);

    const getDelayCount = await queue.getDelayedCount();
    console.log(`Delay job count: ${getDelayCount}`);

    const getWatinghildren = await queue.getWaitingChildren();
    console.log(`Wating children job: ${getWatinghildren}`);

    const getWaitingChildrCount = await queue.getWaitingChildrenCount();
    console.log(`Waiting children job count: ${getWaitingChildrCount}`);

    await queue.pause();        // Pause queue. Jobs stop processing. 
    const isPuased = await queue.isPaused();
    console.log(`Paused jobs: ${isPuased}`);

    await queue.resume();   // Resume queue.
    const isPua = await queue.isPaused();
    console.log(`resume paused jobs: ${isPuased}`);

    await queue.remove();
    // queue.remove() ≠ remove jobs only
    // queue.remove() = remove queue definition + associated Redis data

    await queue.drain();    // Remove waiting jobs.

    // await queue.clean(10000, 100, "completed")   //Supports completed, failed, delayed, wait, active, paused, prioritized states.

    // await queue.obliterate()     // Destroy everything.

    // await queue.retryJobs({
    //     count: 3,
    // });

    // await queue.removeRepeatable("emailQueue", "*/5 * * * *")   //Deletes scheduled configuration.
    // await queue.removeRepeatableByKey(key)    // removeRepeatableByKey(jobs[0].key);


    const getRepeatableJobs = await queue.getRepeatableJobs();
    console.log(`Get repeatabl jobs: ${JSON.stringify(getRepeatableJobs, null ,2)}`)

    const getQueueEvents = await queue.getQueueEvents();
    console.log(`get Queue Events: ${JSON.stringify(getQueueEvents, null, 2)}`);

    const getWorker = await queue.getWorkers();  // Get connected workers.
    console.log(`Get worker: ${JSON.stringify(getWorker, null ,2)}`)  

    const getMetrics = await queue.getMetrics("completed");
    console.log(`Get metrics: ${JSON.stringify(getMetrics, null, 2)}`)

    const addJobLog = await queue.addJobLog("urgent", "10");   // Store logs for a job.
    console.log(`Add to log ${addJobLog}`)

    const getJobLogs = await queue.getJobLogs("urgent");;
    console.log(`Get job logs: ${JSON.stringify(getJobLogs, null ,2)}`)

    const trimEvents = await queue.trimEvents(100);
    console.log(`trim event: ${JSON.stringify(trimEvents, null, 2)}`)

    const waitUntilReady = await queue.waitUntilReady();
    // console.log(`wait untill ready: ${JSON.stringify(waitUntilReady, null ,2)}`);

    const meta = await queue.getMeta();
    console.log(`meta: ${JSON.stringify(meta, null, 2)}`)

    // await queue.close();   // Graceful close.
    // await queue.disconnect();   // Force disconnect.
}

// checks()    

async function stop() {

    const jobs =
        await queue
            .getRepeatableJobs();

    for (
        const job
        of jobs
    ) {

        await queue
            .removeRepeatableByKey(
                job.key
            );

        console.log(
            "Removed:",
            job.name
        );

    }

    await queue.close();

}

stop();

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(7000, () => {
    console.log(
        "Bull Board Running"
    );
});