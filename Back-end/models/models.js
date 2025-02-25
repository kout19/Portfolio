const mongoose = require('mongoose');
const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.validate} is not a valid email address`,
    },
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [4, "Message must be at least 10 characters"],
    maxlength: [500, "Message cannot exceed 500 charcters"],
    trim: true,
  },
  submitedAt: {
    type: Date,
    default: Date.now,
  }
});


const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;