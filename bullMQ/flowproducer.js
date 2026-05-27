const { FlowProducer } = require("bullmq");
const { flowproducerConnection } = require("./redisConnection");

// Constructor
const flow = new FlowProducer({                                         // connect to redis server
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
                data: {},
                opts: {

                }
            },
            {
                name: "order",
                queueName: "emailQueue",
                data: {},
                opts: {
                    failParentOnFailure: true,
                    continueParentOnFailure: true,
                    removeDependencyOnFailure: true,
                    ignoreDependencyOnFailure: true
                }
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

flow.getFlow({
    id: "root-job-id",
    queueName: "root queue",
    depth: "limit recovery",
    maxChildren: "limit childern count"
}); 




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