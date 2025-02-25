const express = require('express');
const Notification = require('../models/notificationModel');
const router = express.Router();
router.get('/count', async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ status: 'unread' });
    res.status(200).json({ unreadCount });
  } catch (err) {
    res.status(500).json({ err: "Error fetching unread count" });
  }
});
router.get('/', async (req, res) => {
  try {
    const notification = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notification);
   } catch (error) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
  
});
router.patch('/messages/:id/read', async (req, res) => {
  try {

    const resultMessage = await Notification.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      {readAt: new Date},
      { new: true }
    );
    
    if (!resultMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message status updated ", data: resultMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
