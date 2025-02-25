import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const AdminPanel = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="./components/dashboard.js" >dashboard</Link></li>
            <li><Link to="./components/notifications.js">Notifications</Link></li>
            <li><Link to="./components/blogManagement.js">Blog</Link> </li>
          </ul>
        </nav>
        <Routes>
          <Route path='' />
          <Route path='' />
        </Routes>
      </div>
    </Router>
  );
};

export default AdminPanel;