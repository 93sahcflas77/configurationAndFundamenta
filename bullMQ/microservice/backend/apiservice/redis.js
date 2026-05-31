const Redis = require("ioredis");    

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy(times) {
        return Math.min(times * 100, 3000)
    },
    reconnectOnError(){
        return true
    }
}

const queueConnection = new Redis({ 
    ...redisConfig,
    maxRetriesPerRequest: 1
})

module.exports = queueConnection