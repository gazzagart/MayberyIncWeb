'use strict';
const functions = require('firebase-functions');
const prpl = require('prpl-server');
const express = require('express');
const rendertron = require('rendertron-middleware');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const wazzaEmail = functions.config().wazza.email;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Your company name to include in the emails
const APP_NAME = 'Maybery INC';

const app = express();

const rendertronMiddleware = rendertron.makeMiddleware({
  proxyUrl: 'https://render-tron.appspot.com/render',
  injectShadyDom: true,
});

app.use((req, res, next) => {
  req.headers['host'] = 'mayberyinc.firebaseapp.com';
  return rendertronMiddleware(req, res, next);
});

app.get('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

exports.app = functions.https.onRequest(app);

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger for new email on contact page]
exports.newEmailSent = functions.firestore.document('emailMessages/{docId}')
    .onCreate(async (snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const messageInfo = snap.data();
    // access a particular field as you would any JS property
    const firstName = messageInfo.firstName;
    const lastName = messageInfo.lastName;
    const subject = messageInfo.subject;
    const message = messageInfo.message;
    const email = messageInfo.email;
    const mailOptions = {
      from: `${APP_NAME} - ${email}`,
      to: wazzaEmail,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = subject;
    mailOptions.text = `Hey Warwick you have a message from ${firstName || '(Didn\'t provide first name) '} ${lastName || '(Didn\'t provide last name)' }`;
    mailOptions.text += `\n\nEmail of sender: ${email}\n`
    mailOptions.text += "\nMessage is as follows:\n\n"
    mailOptions.text += message;
    try {
      await mailTransport.sendMail(mailOptions);
        console.log('New email sent to:', wazzaEmail);
      } catch(error) {
        console.error('There was an error while sending the email:', error);
      }
      return null;
    });
  // [END onCreateTrigger for new email on contact page]