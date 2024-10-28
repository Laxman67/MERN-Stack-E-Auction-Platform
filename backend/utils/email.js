import nodemailer from 'nodemailer';

export const sendEmail = async ({ recipent, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const option = {
    from: process.env.SMTP_MAIL,
    to: recipent,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(option);
};
