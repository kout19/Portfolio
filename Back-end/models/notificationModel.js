const mongoose = require('mongoose');
const notificationSchema =  mongoose.Schema({
   message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum:['info','warnning','error'],
    default: 'info',
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default:'unread',
  },
  relatedEntity: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'contacts',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  readAt: {
    type: Date,
  },
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;