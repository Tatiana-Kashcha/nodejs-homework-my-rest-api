const nodemailer = require("nodemailer");

const { MAILTRAP_USER, MAILTRAP_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

const sendEmail = (message) => {
  message["from"] = "tkashcha@gmail.com";

  return transport.sendMail(message);
};

module.exports = sendEmail;
