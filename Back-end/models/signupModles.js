const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const signUpSchema = mongoose.Schema({
  username: {
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
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  password: {
    type: String,
    required:[true, 'Password is required'],
    minlength: [6, 'Password length must be at least 6 characters long'],
    maxlength: [15, 'Password cannot exceed 15 characters'],
  },
  role: {
    type: String,
    default:'user',
  },
  submitedAt: {
    type: Date,
    default:Date.now,
  }
})
signUpSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
})
const SignUpForm = mongoose.model("SignUpFrom", signUpSchema);
module.exports = SignUpForm;
