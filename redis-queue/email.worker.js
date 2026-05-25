const client = require("./redis");
const welcomeTemplate = require("./welcome.templates");
const sendEmail = require("./sendEmail")

async function processJobs() {
    console.log("Worker Started...");

    while (true) {
        try {
            const result = await client.lPop("emailQueues");

            if (result) {
                const parsedJob = JSON.parse(result);
                
                const html = welcomeTemplate({
                    username: parsedJob.email,
                    ctaLink: 'https://www.google.com',
                    otp: parsedJob.OTP
                })

                await sendEmail({
                    to: parsedJob.email,
                    subject: 'Welcome to My app ',
                    html
                })

            }

        } catch (error) {
            console.log(error);
        }
    }
}

processJobs()