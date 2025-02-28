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
    ref:'Contact',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  readAt: {
    type: Date,
  },
});

notificationSchema.post("findOneAndDelete", async function (doc) {
  if (doc && doc.relatedEntity) {
    await mongoose.model("Contact").findByIdAndDelete(doc.relatedEntity);
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;