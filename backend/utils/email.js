import nodemailer from 'nodemailer';

export const sendEmail = async ({ recipent, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, //smtp.gmail.con
    port: process.env.SMTP_PORT, //587
    service: process.env.SMTP_SERVICE, //gmail
    auth: {
      user: process.env.SMTP_MAIL, //your mail
      pass: process.env.SMTP_PASSWORD, // you mail app password
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
