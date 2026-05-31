const { createBullBoard } = require("@bull-board/api");                    
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");         
const { ExpressAdapter } = require("@bull-board/express");                                           
const queue = require("./queue");

const serverAdapter = new ExpressAdapter();                               
serverAdapter.setBasePath("/admin/queues");                           

const board = createBullBoard({                                             
    queues: [
        new BullMQAdapter(queue, {
            readOnlyMode: false,
            allowRetries: true,
            description: "Email Sent"
        })
    ],
    serverAdapter
})
 
module.exports = serverAdapter