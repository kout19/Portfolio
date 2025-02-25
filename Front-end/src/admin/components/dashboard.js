import React, { Children, useState } from 'react';
import axios from 'axios';
import DashboardHeader from './dashboardHeader';
import SideBar from './blogSideBar';
import PostBlog from './postBlog';
import FetchBlogs from './renderBlogs';

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponenet] = useState('fetchBlogs');
  const fetchingRole = async () => {
     const response = await axios.get('http://localhost:5000/api/signin');
  console.log(response.data);
  }
  fetchingRole();
  const renderComponent = () => {
    
    switch (selectedComponent) {
      case 'fetchBlogs':
       return <FetchBlogs/>
      case 'postBlog':
        return <PostBlog />
      default:
        return <FetchBlogs/> 
    }
  }
  return (
    <div>
      <DashboardHeader />
      <div className="flex">
        <SideBar setSelectedComponenet={setSelectedComponenet} />
        <main className="flex-1 bg-gray-100 p-6">
          {/* {children} */}
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;