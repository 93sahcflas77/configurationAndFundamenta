const express = require("express");
const route = express.Router();
const flow = require("./flowproducer");

route.get("/flow", async (req, res) => {

    const defaultOption = {
        removeOnComplete: {
            age: 3600,
            count: 100
        },
        removeOnFail: {
            age: 24 * 3600
        },
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000
        }
    }

    try {

        const name = "chandan thakur"
        const email = "chandan7073251686@gmail.com"

        const flowResult = await flow.add({
            name: "parent",
            queueName: "registerQueue",
            data: {
                name,
                email
            },
            children: [
                {
                    name: "save-user",
                    queueName: "saveQueue",
                    data: {
                        name,
                        email
                    },
                    opts: {
                        ...defaultOption,
                        delay: 1000,
                        priority: 2,
                        jobId: `saveQueue-${Date.now()}`
                    }
                },
                {
                    name: "send-email",
                    queueName: "sendQueue",
                    data: {
                        name,
                    },
                    opts: {
                        ...defaultOption,
                        delay: 1000,
                        priority: 5,
                        jobId: `sentQueue-${Date.now()}`
                    }
                },
                {
                    name: "create-wallet",
                    queueName: "walletQueue",
                    data: {
                        balance: 0
                    },
                    opts: {
                        ...defaultOption,
                        delay: 1000,
                        priority: 6,
                        jobId: `sentQueue-${Date.now()}`
                    }
                },
                {
                    name: "create-profir",
                    queueName: "profieQueue",
                    data: {
                        bio: "new user"
                    },
                    opts: {
                        ...defaultOption,
                        delay: 1000,
                        priority: 15,
                        jobId: `sentQueue-${Date.now()}`
                    }
                }
            ]
        })

        res.json({
            success: true,
            flowResult
        })
    } catch (error) {
        console.error(error)
    }
})







module.exports = route;