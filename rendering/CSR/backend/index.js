const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 7000;

app.use(cors({
    origin: "http://localhost:5173"
}
))

const user = {
    name: "chandan thakur",
    age: 25,
    email: "chandan7073251686@gmail.com",
    phone: 7073251686
}

app.get("/", (req, res) => {
    res.json({
        message: "ok",
        data: user
    })
})


app.listen(PORT, () => {
    console.log(`Server is runing port ${PORT}`);
})