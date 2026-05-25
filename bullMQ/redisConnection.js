const Redis = require("ioredis");

const queueConnection = new Redis({
    maxRetriesPerRequest: 1
})

const workerConnection = new Redis({
    maxRetriesPerRequest: null
})

const queueEventConnection = new Redis({
    maxRetriesPerRequest: null
})

module.exports = { queueConnection, workerConnection, queueEventConnection }