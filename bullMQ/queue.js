const { Queue } = require("bullmq");
const { queueConnection } = require("./redisConnection");

const emailQueue = new Queue("emailQueue",
    {
        // connection: {
        //     host: "127.0.0.1",
        //     port: 6379
        // }

        connection: queueConnection,
        
    }
)

// await emailQueue.setGlobalConcurrency(4);  // set global limit only 4 job working 
// await emailQueue.removeGlobalConcurrency();  // Removing Global concurrceny

// await emailQueue.setGlobalRateLimit(5, 6000);   // Global Rate limit controls jobs PER TIME Not simultameous jobs

// const ttl = await emailQueue.getRateLimitTtl();  // add a Rate limiting
// console.log(ttl);  // Geting current TTL
// await emailQueue.removeGlobalRateLimit();  // remove a rate limit



// Queue Properties
// console.log(emailQueue.name);        // Queue name.
// console.log(emailQueue.opts);        // Queue options.
// console.log(emailQueue.keys)         // Redis keys.
// console.log(emailQueue.jobsOpts)     // Default job options.
// console.log(emailQueue.token)       // Queue token.

// Queue token.
// console.log(emailQueue.client);               // Returns Redis client.
// console.log(emailQueue.defaultJobOptions);    // Default job options.
// await emailQueue.repeat                       // Access repeat manager. Repeatable jobs are managed through this accessor.
// console.log(await emailQueue.redisVersion);   // redisVersion
// console.log(emailQueue.metaValues)            // meta value

// Event Methods
// emailQueue.on("error", (e) => {    // Listen continuously.
//     console.log(e);
// })

// emailQueue.once("progress", () => {})    // Listen only one time.
// emailQueue.off( "completed", handler);   // Remove listener.
// emailQueue.emit( event, data );      //Manually trigger event.




module.exports = emailQueue;