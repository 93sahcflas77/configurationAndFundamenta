const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const path = require("path");
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
})
const PORT = 5000

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        // console.log('message: ', msg);
        io.emit("chat message", msg)
    })

    // socket.on("Hello", (arg1, arg2, arg3) => {
    //     console.log(arg1); // 1
    //     console.log(arg2); // '2'
    //     console.log(arg3); // { 3: '4', 5: <Buffer 06> }
    // }),

    // socket.on("request", (arg1, arg2, callback) => {
    //     console.log(arg1); // { foo: 'bar' }
    //     console.log(arg2); // 'baz'
    //     callback({
    //         status: 'ok'
    //     });
    // }),

    // socket.onAny((eventName, ...args) => {
    //     console.log(eventName); // 'hello'
    //     console.log(args); // [ 1, '2', { 3: '4', 5: ArrayBuffer (1) [ 6 ] } ]
    // })

    // join the room named 'some room'
    // socket.join('some room');

    // broadcast to all connected clients in the room
    // io.to('some room').emit('hello', 'world');

    // broadcast to all connected clients except those in the room
    // io.except('some room').emit('hello', 'world');

    // leave the room
    // socket.leave('some room');

})

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})