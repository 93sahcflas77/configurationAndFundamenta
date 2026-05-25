const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: false,
});

const checkSMTP = async () => {
  try {
    await transporter.verify();
    console.log("SMTP server connected successfully");
  } catch (err) {
    console.log('SMTP connection failed', err)
  }
};

module.exports = { transporter, checkSMTP };
