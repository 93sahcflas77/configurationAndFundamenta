const queue = require("./queue");


const addJobs = async () => {
    // await queue.add(
    //     "emailQueue",
    //     {
    //         email: "test@gmail.com"
    //     },
    //     {
    //         // repeat: {
    //         //     // every: 3000,
    //         //     // pattern: "*/5 * * * *"   //minute hour day month weekday
    //         // },
    //         delay: 10000,
    //         // removeOnComplete: true,
    //         // removeOnFail: true
    //         // removeOnComplete: 2,
    //         // removeOnFail: 2
    //         removeOnComplete: {
    //             age: 3600,  // hour
    //             count: 1000
    //         },
    //         removeOnFail: {
    //             age: 24 * 3600 // 24 hour
    //         }
    //     }
    // )
    await queue.addBulk([
        {
            name: "emailQueue",
            data: {
                email: "normal@gmail.com", 
                type: "normal"
            },
            opts: {
                removeOnComplete: {
                    age: 3600,
                    count: 100
                },
                removeOnFail: {
                    age: 3600,
                    count: 100
                },
                priority: 10,
                delay: 0,
                attempts: 5,
                backoff: {
                    type: "exponential",
                    delay: 100
                },
                jobId: "normal",
            }
        },
        // {
        //     name: "emailQueue",
        //     data: {
        //         email: "urgent@gmail.com",
        //         type: "urgent"
        //     },
        //     opts: {
        //         removeOnComplete: {
        //             age: 3600,
        //             count: 100
        //         },
        //         removeOnFail: {
        //             age: 3600,
        //             count: 100
        //         },
        //         priority: 1,
        //         delay: 0,
        //         attempts: 5,
        //         backoff: {
        //             type: "exponential",
        //             delay: 100
        //         },
        //         jobId: "urgent"
        //     }
        // },
        // {
        //     name: "emailQueue",
        //     data: {
        //         email: "vip@gmail.com",
        //         type: "vip"
        //     },
        //     opts: {
        //         removeOnComplete: {
        //             age: 3600,
        //             count: 100
        //         },
        //         removeOnFail: {
        //             age: 3600,
        //             count: 100
        //         },
        //         priority: 2,
        //         delay: 0,
        //         attempts: 5,
        //         backoff: {
        //             type: "exponential",
        //             delay: 100
        //         },
        //         jobId: "vip",
        //     }
        // }
    ])
    console.log("Job Added");

}

addJobs()

