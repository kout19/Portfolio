import React, { useState, useEffect } from "react";
import axios from 'axios';
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications/count');
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.log('Error fetching unread count:', error);
      }
    };
    fetchUnreadCount();
  }, []);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications');
      setNotifications(response.data);
      setShowNotifications(true);
    } catch (error) {
      console.log('Error fetching notifications:', error);
    }
  };
  const readNotifications = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/notifications/messages/${id}/read`);
      console.log('Notification status updated:', response.data);
      setSelectedNotification(response.data.data);
      console.log('Selected Notification:', selectedNotification);
      fetchNotifications();
    } catch (error) {
      console.log('Error updating notification status:', error);
    }
  }

  return (
    <div>
      <button onClick={fetchNotifications}>
        Notifications({unreadCount})
      </button>
      {showNotifications && (
        <div className="notifications-list">
          <h3>Notificactions</h3>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                <p>{notification.message}</p>
                <p>{notification.type}</p>
                <p>{notification.status}</p>
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
              </div>
                ))
          ) : (
              <p> Notificactions not Found</p>
          )}
        </div>
        
      )}

    </div>
  );
};
export default Notifications;