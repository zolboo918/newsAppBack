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
          Email: "helpservice@bizcard.ml",
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
  // const Mailjet = require("node-mailjet");
  // const mailjet = Mailjet.apiConnect(
  //   "13c8c97cb46465c426adde105ac51010",
  //   "cf9ffe3164481e6321a6f1bbfb79eaa9"
  // );
  // const request = mailjet.post("send", { version: "v3.1" }).request({
  //   Messages: [
  //     {
  //       From: {
  //         Email: "zolboo412@gmail.com",
  //         Name: "zolboo",
  //       },
  //       To: [
  //         {
  //           Email: "zolboo412@gmail.com",
  //           Name: "zolboo",
  //         },
  //       ],
  //       Subject: "Greetings from Mailjet.",
  //       TextPart: "My first Mailjet email",
  //       HTMLPart:
  //         "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
  //       CustomID: "AppGettingStartedTest",
  //     },
  //   ],
  // });
  // request
  //   .then((result) => {
  //     console.log(result.body);
  //   })
  //   .catch((err) => {
  //     console.log(err.statusCode);
  //   });
};
