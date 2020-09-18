const  functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require('cors')({origin: true});

admin.initializeApp();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sweetdogphotography@gmail.com',
        pass: 'UQAafLI7e^2sHx@d'
    }
});


exports.sendEmail = functions.https.onCall(async (html: string, email: string) => {
    console.log(email);
    const options = {
        from: email,
        to: 'sweetdogphotography@gmail.com',
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
