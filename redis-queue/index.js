require("dotenv").config()
const express = require("express");
const crypto = require("crypto");
const app = express();
const client = require("./redis");
const { checkSMTP } = require("./nodemailer");
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "ok" })
})

app.post("/add", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            console.log(`name, email, password, role are require`)
        }

        const OTP = crypto.randomInt(1000, 9999);

        const job = {
            id: Date.now(),
            email,
            role,
            OTP
        }

        await client.rPush("emailQueues", JSON.stringify(job))

        return res.status(201).json({
            success: true,
            message: "Job Added To Queue",
            job
        });
    } catch (error) {
        console.log(`Error: ${error}`)
    }

});

app.get("/queueShow", async (req, res) => {
    try {
        const jobs = await client.lRange("emailQueues", 0, -1);

        console.log(jobs);

        const parsedJobs = jobs.map(job =>
            JSON.parse(job)
        );

        return res.json({
            success: true,
            total: parsedJobs.length,
            jobs: parsedJobs
        });

    } catch (error) {
        console.log(`Error: ${error}`)
    }
})

require("./email.worker")

app.listen(PORT, async () => {

    await checkSMTP();
    // await client.connect()

    console.log(`Server is runing this port ${PORT}`)
})