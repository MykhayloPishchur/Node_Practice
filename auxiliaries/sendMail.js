const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "michaellolik@gmail.com",
        pass: "genius1610",
      },
    });
  }

  async sendVerificationEmail(email, verificationLink) {
    return this.transporter.sendMail({
      to: email,
      from: process.env.MY_MAIL,
      subject: "Please, verify your email",
      html: `<a href="${verificationLink}">Click here for verify your account</a>`,
    });
  }
}

exports.mailSender = new MailSender();
