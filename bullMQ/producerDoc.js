const queue = require("./queue");


const addJobs = async () => {
    await queue.add(
        "sendEmail",
        {
            email: "test@gmail.com"
        },
        {
            repeat: {
                every: 5000,   // Run repeatedly in milliseconds.
                pattern: "*/5 * * * *",    //Cron schedule.  minute hour day month weekday  
                limit: 10,             // Stop after N executions.
                startDate: new Date("2026-12-01"),     // Start scheduling later. [every + statrDate ]
                endDate: new Date("2026-12-31"),      // Stop scheduling after a date. [every + endDate]
                tz: "Asia/Kolkata",               // Timezone
                offset: 10000,           // Delay schedule start.
                immediately: true,      // Run once immediately, then repeat.
                count: 2,     // Current execution count. Usually do not set manually.
                key: "daily-email",   /// Custom repeat identifier.
                // Useful for:
                //     tracking, removal, dedupe
                //     Remove:
                //     await queue.removeRepeatableByKey(
                //         "daily-email"
                //     );
                
                // production
                // pattern,
                // tz,
                // startDate,
                // endDate,
                // limit,
                // immediately,
                // key
            },
            // removeOnComplete: true,
            // removeOnComplete: 2,
            removeOnComplete: {
                age: 3600,  // hour
                count: 1000
            },

            // removeOnFail: true,
            // removeOnFail: 2
            removeOnFail: {
                age: 24 * 3600 // 24 hour
            },


            delay: 0,     //bullmq supports delayed execution

            priority: 5,     // job important

            attempts: 5,      // retry count

            // backoff: 2,      // retry stratgy
            backoff: {
                type: "exponential",
                delay: 1000
            },

            jobId: "email-123456794", // unique jobs

            lifo: false,          // stack behaivor

            timeout: 3000

        }
    )

    // await queue.addBulk([
    //     {
    //         name: "sendEmail",
    //         data: {
    //             email: "normal@gmail.com",
    //             type: "normal"
    //         },
    //         opts: {
    //             removeOnComplete: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             removeOnFail: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             priority: 10,
    //             delay: 0,
    //             attempts: 5,
    //             backoff: {
    //                 type: "exponential",
    //                 delay: 100
    //             },
    //             jobId: "normal_email"
    //         }
    //     },
    //     {
    //         name: "sendEmail",
    //         data: {
    //             email: "urgent@gmail.com",
    //             type: "urgent"
    //         },
    //         opts: {
    //             removeOnComplete: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             removeOnFail: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             priority: 1,
    //             delay: 0,
    //             attempts: 5,
    //             backoff: {
    //                 type: "exponential",
    //                 delay: 100
    //             },
    //             jobId: "urgent_email"
    //         }
    //     },
    //     {
    //         name: "sendEmail",
    //         data: {
    //             email: "vip@gmail.com",
    //             type: "vip"
    //         },
    //         opts: {
    //             removeOnComplete: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             removeOnFail: {
    //                 age: 3600,
    //                 count: 100
    //             },
    //             priority: 2,
    //             delay: 0,
    //             attempts: 5,
    //             backoff: {
    //                 type: "exponential",
    //                 delay: 100
    //             },
    //             jobId: "vip_email"
    //         }
    //     }
    // ])

    console.log("Job Added");

}

addJobs()

// single add job
await queue.add("sendEmail",
    {

    },
    {

    }
)

//  addBulk
await queue.addBulk([
    {
        name: "sendEmail",
        data: {
            email: "",
            type: ""
        },
        opts: {

        }
    }
])

