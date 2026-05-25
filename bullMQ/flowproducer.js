const { FlowProducer } = require("bullmq");
const { flowproducerConnection } = require("./redisConnection");

// Constructor
const flow = new FlowProducer({
    flowproducerConnection
})


// Properties
console.log(flow.opts);  // Configuration
console.log(flow.closing);  // Closing state.
console.log(flow.client);  // Redis connection.


// Methods
async function create() {

    // add():-   Create dependency tree.
    flow.add({
        name: "parent",
        queueName: "emailQueue",
        data: {
            year: 2025
        },
        children: [
            {
                name: "users",
                queueName: "emailQueue",
                data: {}
            },
            {
                name: "order",
                queueName: "emailQueue",
                data: {}
            }
        ]
    })


    // addBulk()  Add multiple flow trees.
    // flow.addBulk([
    //     {
    //         name: "A",
    //         queueName: "p",
    //         data: {

    //         },
    //         children: [
    //             {
    //                 name: "",
    //                 queueName: "",
    //                 data: {}
    //             },
    //             {
    //                 name: "",
    //                 queueName: "",
    //                 data: {}
    //             }
    //         ]
    //     },
    //      {
    //         name: "B",
    //         queueName: "p",
    //         data: {

    //         },
    //         children: [
    //             {
    //                 name: "",
    //                 queueName: "",
    //                 data: {}
    //             },
    //             {
    //                 name: "",
    //                 queueName: "",
    //                 data: {}
    //             }
    //         ]
    //     }
    // ])

    await flow.close();     // Close connection.
    await flow.disconnect();  //Force disconnect.
    await flow.waitUntilReady();   // Wait Redis.
    

}   

create()

// Flow: users, orders ---> parent..




// Lifecycle
// create flow
// ↓
// children execute
// ↓
// children completed
// ↓
// parent unlocked
// ↓
// parent executes
// ↓
// complete