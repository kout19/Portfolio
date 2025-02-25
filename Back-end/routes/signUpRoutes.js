const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SignUpForm = require('../models/signupModles');
const app = express();
app.use(express.json());
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 },
}));
router.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newSignUp = new SignUpForm({
      username,
      email,
      password,
    })
    const signUpdata = await newSignUp.save();
    console.log("Account created", signUpdata);
    res.status(201).json({ message: 'Data sent successfully' });
  } catch (err) {
    console.log("Error creating account", err);
    res.status(500).json({ message: 'Inernale server error' });
  }
});
router.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SignUpForm.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: `User not found with ${email} email` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      `${process.env.SECRET_KEY}`,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'signin successful', token });

  } catch (error) {
    console.log('Singin error', error);
    res.status(500).json({ error: 'internal server error' });
  }
});


module.exports = router;