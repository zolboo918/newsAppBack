const nodemailer = require("nodemailer");
const Mailjet = require("node-mailjet");
module.exports = async function sendGridEmailSender(option) {
  const mailjet = new Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "bizcardmailer6@gmail.com",
          Name: "BizCard",
        },
        To: [
          {
            Email: option.to,
            Name: "",
          },
        ],
        Subject: "Bizcard нууц үг сэргээх хүсэлт",
        TextPart: "",
        HTMLPart: option.html,
      },
    ],
  });
  request
    .then((result) => {
      console.log("email sent");
      return true;
    })
    .catch((err) => {
      console.log(err.statusCode);
      return false;
    });
};
