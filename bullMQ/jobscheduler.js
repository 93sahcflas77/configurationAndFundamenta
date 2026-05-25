const { JobScheduler } = require("bullmq");
const { jobschedulerConection } = require("./redisConnection");

// Constructor
const scheduler = new JobScheduler({
    jobschedulerConection
})

// Properties
console.log(scheduler.opts);   // Configuration.
console.log(scheduler.client);  // Redis connection.
console.log(scheduler.closing);  // Closing state.


// Methods
async function create() {

    // Create schedule  or Update existing
    await scheduler.upsertJobScheduler(
        "daily-email",
        {
            every: 5000,
            pattern: "* 8 * * *",
            limit: 10,
            startDate: Date.now()+5000,
            endDate: "2026-12-31",
            tz: "Asia/Kolkata",
            immediately: true
        },
        {
            name: "sendEmail",
            data: {
                email: "chandan7073251686@gmail.com"
            },
            opts: {
                attempts: 5
            }
        },
    )

    console.log("Scheduler Created");


    // Remove Schedule
    await scheduler.removeJobScheduler("daily-email");  //Output: scheduler removed


    // getJobSchedulers()  Read schedules.
    const jobs = await scheduler.getJobSchedulers();
    console.log(jobs);


    // getJobScheduler()  Read one.
    const job = await scheduler.getScheduler("daily-email");
    console.log(job);



    // pause()  Pause scheduler.
    await scheduler.pause();

    // resume
    await scheduler.resume();

    // waitUntilReady()  Wait Redis.
    await scheduler.waitUntilReady();

    // close() Graceful shutdown.
    await scheduler.close();

    // disconnect()  Force disconnect.
    await scheduler.disconnect()
}