const express = require("express");
const serverAdapter = require("./BullMQUI");
const queue = require("./queue")

const app = express();

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(7000, () => {
    console.log(
        "Bull Board Running"
    );
});