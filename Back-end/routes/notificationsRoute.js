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
    const notification = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(10);
    if(!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
   } catch (error) {
    res.status(500).json({ error: "Error fetching notifications",error });
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
router.get('/:id', async (req, res) => {
  try {
    const readNotificaiton = await Notification.findById(req.params.id).populate('relatedEntity');
    if (!readNotificaiton) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(readNotificaiton);
  } catch (error) {
    res.status(500).json({ error: "Error to read notification",error });
  }
}
);
router.delete('/:id', async(req, res)=>{
  try{
  const notificationId = req.params.id;

  // Find and delete the notification by ID
  const deletedNotification = await Notification.findByIdAndDelete(notificationId);

  if (!deletedNotification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  res.status(200).json({ message: "Notification deleted successfully" });
} catch (err) {
  console.error("Error deleting notification", err);
  res.status(500).json({ message: "Server error" });
}
});
module.exports = router;
