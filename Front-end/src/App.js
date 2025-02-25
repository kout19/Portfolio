import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import AdminDashboard from "./admin/components/dashboard";
import ProtectedRoute from "./admin/components/protectedRoute";
import PostBlog from "./admin/components/postBlog";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
       
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        <Route path="/logout" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
