const nodemailer = require("nodemailer");

module.exports = async function PasswordResetEmail(options) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  const link = ``;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${process.env.SMTP_FROM} <${process.env.SMTP_MAIL}>`, // sender address
    to: options.to, // list of receivers
    subject: options.subject, // Subject line
    html: options.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
