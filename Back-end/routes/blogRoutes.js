const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blogModels');
const app = express();
const router = express.Router();
app.use('../uploads', express.static(path.join(__dirname, '../uploads')));

// Define allowed MIME types for images
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  },
});
// Multer file filter function
const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed'), false); // Reject file
  }
  cb(null, true); // Accept file
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // File size limit: 1MB
});

// POST route to handle file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content,tags } = req.body;
  ; // Parse tags from request body

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create a new blog post
    const newPost = new Blog({
      title,
      content,
      tags,
      image: {
        url: req.file.path.replace(/\\/g, '/'),
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

    // Save the blog post to the database
    const savedPost = await newPost.save();

    res.status(200).json({ savedPost });
  } catch (error) {
    console.error('Error at posting blogs:', error);
    res.status(500).json({ message: 'Internal error, cannot post blog' });
  }
});

// GET route to fetch all blogs
router.get('/data', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error when fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.log("error deleting post", error);
    res.status(500).json({ message: "server error" });
  }
})

module.exports = router;
