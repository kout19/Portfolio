import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from 'axios';
const DashboardHeader = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
 
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
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg mt-[280px]">
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
                    className={`px-4 py-2 text-sm  ${
                      notification.status === "read"
                        ? "text-gray-500"
                        : "text-blue-800 font-bold"
                    } hover:bg-gray-100`}
                  >
                    {notification.message}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500">
                  No Notifications
                </li>
              )}
            </ul>
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