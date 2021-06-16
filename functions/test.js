//const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId = "1025842671920-07461gu02ioqvt4ai539lq52pimbk4n2.apps.googleusercontent.com"
const clientSecret = "9iMieygoMGBMaEBVx_gkiUMg"
const redirectUrl = "https://developers.google.com/oauthplayground"
const refreshToken = "1//04yR2ar02OTjTCgYIARAAGAQSNwF-L9Irp99urvprfFDthB198VzPHeLBtFJaUIrAvlWgpXg8B-SOUpcHceybWGWV_CkIcLZNdj0"

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

async function poop() {
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
      user: 'naima.maria.malik@gmail.com',
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  let info = await transporter.sendMail({
    from: '"Saad Ahmed" <saadist@gmail.com>', // sender address
    to: "naima.maria.malik@gmail.com", // list of receivers
    subject: "Hello sexy", // Subject line
    text: "You so bad!", // plain text body
    html: "<b>I so bad!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  //functions.logger.info("Hello logs!", {structuredData: true});
  return nodemailer.getTestMessageUrl(info);
}

poop()
