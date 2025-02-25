const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config
const runDB = require('./config/db');
const contactFormRouter = require("./controllers/controller");
const signUpFormRouter = require('./routes/signUpRoutes');
const notifications = require('./routes/notificationsRoute');
const blogs = require('./routes/blogRoutes');
const app = express();
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;
runDB();
app.use(cors());
app.use(express.json());
app.use('/notifications', notifications);
app.post('/submit-contact', contactFormRouter);
app.post('/api/signup', signUpFormRouter);
app.post('/api/signin', signUpFormRouter)
app.use('/admin/blogs', blogs);



app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});