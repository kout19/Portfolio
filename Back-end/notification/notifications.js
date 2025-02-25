const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'knewinfo2022@gmail.com',
    pass: '@K12212324252627k',
  }
});
const sendNotification = (formData) => {
  const mailOptions = {
    from: "koutlook19@gmail.com",
    replyTo:formData.email,
    to: "koutlook19@gmai.com",
    subject: `New contact from submission form${formData.name}`,
    text: `You received a message:\n\n${formData.message}:\n\n From:${formData.email}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email", err);
    }
    else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendNotification;