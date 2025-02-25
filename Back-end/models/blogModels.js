const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: { type: String },
    mimeType: { type: String },
    size:{type: Number},
  },
  tags:[String],
  // auther: { type: mongoose.Schema.Types.ObjectId, ref:'signupfroms', required: true, default: 'Admin' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  

})
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;