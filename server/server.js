const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173'
  }));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// app.get('/forgotpassword', async (req, res) => {

//     res.send("sending mail");
// })

// Forgot password route
app.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  // res.json({ msg: "Sending Mail"});

  // Create password reset link
  const resetLink = `http://localhost:5173/update?email=${email}`;

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Link',
    html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json('Password reset link sent successfully!' + `${resetLink}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send password reset link.');
  }
});

// Reset Password Route
app.post('/updatepassword', async (req, res) => {
  const { password } = req.body;
  const email = req.body.email;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Successfull',
    html: `<p>Your password is updated Successfully. password is "${password}".</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json('Password updated successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json('Failed to send password reset link.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
