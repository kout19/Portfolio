import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const DashboardHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  // const [deleteNotification, setDeleteNotification] = useState(null);
  //Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications');
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching notifications', error);
      }
  };
  //Count new notificaitons
  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notifications");
      const count = response.data.filter(
        (notification)=>notification.status==="unread"
      ).length;
      setUnreadCount(count);
    } catch (error) {
      console.log("Error fetching unread count", error);
    }
  };
  //Mark all notifications s Read
  const markAsRead = async (messageId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/notifications/messages/${messageId}/read`);
      console.log(response.data);
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, status: 'read' }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error making messages as read');
    }
  };
  //Toggle notificationss dropdown
    const toggleNotifications = () => {
    setIsNotificationsVisible((prevState) => {
      const newState = !prevState;
      console.log(newState);
      if (newState) {
         fetchNotifications();
      }
      return newState;
   });
  }
// Read each notification details
const handleNotificationClick = async (notificationId) => {
  try {
    const response = await fetch(`http://localhost:5000/notifications/${notificationId}`);
    const data = await response.json();
    console.log(data);
    setSelectedNotification(data);
  } catch (error) {
    console.error("Error fetching notification details:", error);
  }
};
//Delete notification
const handleDeleteNotification = async (notificationId, event) => {
  event.stopPropagation();
  try {
    const response = await axios.delete(`http://localhost:5000/notifications/${notificationId}`);
    // console.log(response.data);
      setNotifications((prev) => prev.filter((notification) =>notification._id !== notificationId));
      // setSelectedNotification(null);
      console.log("Notification deleted successfully");
      // window.location.reload();
  }
  catch (error) {
    console.error("Error deleting notification", error);
  }
};
  //Navigate to the notification related entity
  

  //Lgining out
  const hanldeLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  //Toggling user  profile
   const hanldeDropdown = () => {
    setShowDropdown(!showDropdown);
  }
  useEffect(() => {
    fetchUnreadCount();
  },[]);
  useEffect(() => {
    if (isNotificationsVisible) {
      fetchNotifications();
    }
  }, [isNotificationsVisible]);
  

 return (
    <header className="flex items-center justify-between bg-blue-300 p-4 shadow-md">
      {/* Logo or Dashboard Title */}
      <div className="text-white text-xl font-bold">Admin Dashboard</div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
       {/* Notifications Button */}
       {unreadCount >0 && (
         <button
           onClick={toggleNotifications}
           className="text-white relative p-2 py-4 px-4 rounded-full bg-gray-100 hover:bg-gray-400 focus:outline-none"
           aria-label="notifications"
         >
           <i className="fas fa-bell"></i>
           <span className="absolute top-4 right-1 bg-red-500 text-xs text-black rounded-full h-4 w-6 flex items-center justify-center">
             {unreadCount}
            
           </span>
         </button>
       )}
        {/* Notifications Dropdown */}
        {isNotificationsVisible && (
          <div className="absolute right-0 top-16 mt-2  bg-white rounded-md shadow-lg z-10 overflow-y-auto max-h-96 " style={{width: '40rem'}}>
            <div className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
             <span className="font-bold text-gray-700">Notifications</span>
             
              <button
               onClick={() => {
                 notifications.filter((notification) => notification.status ==='unread').forEach((message) =>markAsRead(message._id))}}
                className="text-sm text-blue-500 hover:underline"
              >
                Mark All as Read
               </button>
            </div>
            <ul className="">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification._id}
                    onClick={() => {handleNotificationClick(notification._id)
                    notifications.filter((notification) => notification._id ===notification._id).forEach((message) =>markAsRead(message._id))
                    }}
                    
                    className={`px-4 py-2 text-sm  ${
                      notification.status === "read"
                        ? "text-gray-500"
                        : "text-blue-800 font-bold "
                    } hover:bg-gray-100 cursor-pointer`}
                  >
                    {notification.message}
                    <button
                      onClick={(event) => handleDeleteNotification(notification._id, event)}
                      className=" ml-4 text-sm text-red-500 hover:underline">
                      Delete
                      </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500">
                  No Notifications
                </li>
              )}
            </ul>
            {selectedNotification && (
              <div className="p-4 border-t border-gray-300">
                <h3 className="text-lg font-bold text-gray-700">
                  Notification Details
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedNotification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedNotification.createdAt}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedNotification.relatedEntity?.name}
                </p>
                <p className="text-sm text-gray-500"> 
                  {selectedNotification.relatedEntity?.email}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedNotification.relatedEntity?.message}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="relative group">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white flex items-center space-x-2"
          >
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>Admin</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
              <a
                href="/profile"
                className="block px-4 py-2 text-white hover:text-gray-400"
              >
                Profile
              </a>
              <a onClick={hanldeLogout}
                href="/logout"
                className="block px-4 py-2 text-white hover:text-gray-400"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;