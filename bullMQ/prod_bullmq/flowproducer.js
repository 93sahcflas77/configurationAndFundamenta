const { FlowProducer } = require("bullmq")
const { flowproducerConnection } = require("./redis");

module.exports = new FlowProducer({
    flowproducerConnection
})