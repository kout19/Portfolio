const Contact = require("../models/models");
const express = require('express');
const Notification = require('../models/notificationModel');
const router = express.Router();
const app = express();
app.use(express.json());

router.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contactData = new Contact({
      name,
      email,
      message
    });
    const savedContactData = await contactData.save();
    const notify= new Notification({
      message: `New contact message from ${name}`,
      type: 'info',
      relatedEntity: contactData._id,
    });
   await notify.save();
    console.log("conatact saved to database", savedContactData);
    console.log("Notificaction created", notify);
    res.status(200).json({ message: "Message sent ", data: savedContactData });
    
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.status(400).json({ errors });
    }
    else {
      console.log("Eorr ooccured", err);
      res.status(500).json({ error: "internal server Error" });
    }
  }
});
// async function saveCotactForm() {
//   const { name, email, message } = req.body;
//   const newContact = new Contact({
//     name,
//     email,
//     message
//   });
//   try {
//     const result = await newContact.save();
//     console.log("Contact form submitted:", result);
//   }catch (err) {
//     console.log("Error occured", err.message);
//   }
// }
module.exports = router;