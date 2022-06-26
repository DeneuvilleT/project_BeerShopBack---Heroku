import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const clientId = '353286467335-8eb60mlmge0mp6o6422p88ljgd8i68mj.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04fRbTIK-Ow2gCgYIARAAGAQSNwF-L9Ir2A12RVl9zM0coD0TYz8W3eO8ZXNUM3UORrX1p5B9AHo7vG020FwXBgg67AFrAFPzCUY';
const acessToken = 'ya29.A0ARrdaM_rQOaNcRy_IdY_I9c83eX9kwTFWLC8LPPXn5ruELrgXMZ28TcEaSvZ59zplborTUdhCGNnO0mD3QEvD3oX0uB98_qiP80EfOjUK5IRXzWVVwgU3-0GTCjep037zM5bD9ndKlsP_ZW14BqcjuxTxEM6YUNnWUtBVEFTQVRBU0ZRRl91NjFWUGx6WFNzZzB1SkY5clluYVVCT2RGZw0163';

const mailing = (mailTo, subject, title, text) => {

   const oauth2Client = new OAuth2(
      clientId, clientSecret, "https://developers.google.com/oauthplayground",
   );
   console.log(mailTo, subject, title, text)
   oauth2Client.setCredentials({
      refresh_token: refreshToken,
   });

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: "deneuville.thomas@gmail.com",
         clientId: clientId,
         clientSecret: clientSecret,
         refreshToken: refreshToken,
         accessToken: acessToken,
      }
   })

   const mailOptions = {
      from: 'BeerShop',
      to: mailTo,
      subject: subject,
      text: '',
      html: "<b>" + title + "</b><p>" + text + "<p>",
   }

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("raté ==>");
         return console.log(error);
      } else {
         console.log("Réussi");

      }
   })
}

export default mailing;