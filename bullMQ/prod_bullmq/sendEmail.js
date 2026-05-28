const { transporter } = require('./nodemailer');

module.exports = async ({ to, subject, text, html, attachments = [] }) => {
  try {
    if (!to || !subject) {
      console.error('Missing required fields: to, subject');
    }

    const mailOption = {
      from: `"Tony Stark" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOption);

    if (info.rejected.length > 0) {
      console.log(`Some recipients were rejected: ${info.rejected}`);
    }

    console.log(`Email sent: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Failed to send email', error);
    process.exit(1);

    return {
      success: false,
      error: error.message,
    };
  }
};
