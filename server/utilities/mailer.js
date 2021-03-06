import nodemailer from 'nodemailer'
require('dotenv').config()

class Mailer {
  constructor() {
    this.configure()
  }

  configure () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: process.env.EMAIL_USER,
             pass: process.env.EMAIL_PASS
         }
    });
  }

  sendConfirmation (email, uuid) {
    const mailOptions = {
      from: 'Matcha Support no-reply@matcha.com', // sender address
      to: email, // list of receivers
      subject: 'Confirm your email address', // Subject line
      html: `<p>Please confirm your email address :</p><br /><p><a href='http://localhost:8080/confirm_user/${uuid}'>Confirm my email address</a></p>`
    };
    this.sendMail(mailOptions)
  }

  sendPassword(email, username, password) {
    const mailOptions = {
      from: 'Matcha Support no-reply@matcha.com', // sender address
      to: email, // list of receivers
      subject: 'New password', // Subject line
      html: `<p>Hello ${ username }, this is your new password :</p><br /><p>${password}</p>`
    };
    this.sendMail(mailOptions)
  }

  sendMail (mailOptions) {
    this.transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log('Email sent');
    });
  }
}

export default Mailer