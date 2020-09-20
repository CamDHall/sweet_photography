const  functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require('cors')({origin: true});

admin.initializeApp();

const config = functions.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email.address,
        pass: config.email.pass
    }
});


exports.sendEmail = functions.https.onCall(async (html: string, email: string) => {
    const options = {
        from: email,
        to: config.email.address,
        subject: 'Sweet Photography- Contact Form',
        html: html
    };

    try {
        await transporter.sendMail(options);
        return true;
    } catch(error) {
        return false;
    }
});
