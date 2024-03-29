const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId = "538930344767-95aureeie4sjajafsdisadkuqr9arf2i.apps.googleusercontent.com"
const clientSecret = "l-9VhO019MChH4RPYLOS4o5r"
const redirectUrl = "https://developers.google.com/oauthplayground"
const refreshToken = "1//04yR2ar02OTjTCgYIARAAGAQSNwF-L9Irp99urvprfFDthB198VzPHeLBtFJaUIrAvlWgpXg8B-SOUpcHceybWGWV_CkIcLZNdj0"

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onCall(async (data, context) => {
  // let testAccount = await nodemailer.createTestAccount();
  const oauth = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
  oauth.setCredentials ({ refresh_token: refreshToken });

  const accessToken = await new Promise((resolve, reject) => {
    oauth.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token 🙁");
      }
      resolve(token);
    });
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: 'saadist@gmail.com',
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  let info = await transporter.sendMail({
    from: '"Naima Malik" <naima.maria.malik@gmail.com>', // sender address
    to: "noma_m@hotmail.com, saadist@gmail.com", // list of receivers
    subject: "Hello sexy", // Subject line
    text: "You so bad!", // plain text body
    html: "<b>I so bad!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  //functions.logger.info("Hello logs!", {structuredData: true});
  return nodemailer.getTestMessageUrl(info);
});
