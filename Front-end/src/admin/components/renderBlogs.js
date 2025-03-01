import React, { useEffect, useState } from "react";
import axios from "axios";
const uri=process.env.REACT_APP_BACKEND_URL;
const FetchBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const fetchBlogsPost = async () => {
    try {
      const response = await axios.get(`${uri}/admin/blogs/data`);
      // console.log(response.data);
      response.data.map((obj) => {
        // console.log(obj.image.url)
      });
      setPosts(response.data);
      const initialLikes = {};
      response.data.forEach((like) => {
        initialLikes[like._id] = 0;
      });
      // console.log(initialLikes);
      setLikes(initialLikes);
    } catch (error) {
      console.log("Error when fetching blogs",error);
    }
  }
  const handleEdit = (postId) => {
    console.log("Eddit post with ID", postId);
  }
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${uri}/admin/blogs/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      
    }catch(error){
      console.error("Error deleting the post:", error);
    }
  }
  useEffect(() => {
    fetchBlogsPost();
  },[])
  const handleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes, [id]: prevLikes[id] + 1,
    }));
  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
    <div className="max-w-4xl w-full ">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-700 leading-realxed">{post.content}</p>
         <p>{post.image?.url && (
            <img src={`http://localhost:5000/${post.image.url}`}
              alt="blog image"
              className="w-64 max-h-60 object-cover rounded-lg transition-transform duraition-300 "
            />
         )}</p> 
          <div className="flex items-center space-x-4 mt-4">
            <button onClick={() => handleLike(post._id)}
              className="flex items-center bg-white-500 text-gray-600  hover:text-blue-600 ">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-1"
                viewBox="0 0 24 24"
              >
                <path d="M14 9V5a3 3 0 10-6 0v4H5a2 2 0 00-2 2v7a2 2 0 002 2h12.586a2 2 0 001.414-.586l3.586-3.586a2 2 0 00.414-2.414l-2.586-4.828A2 2 0 0017.586 9H14z"/>
              </svg>
              Like
            </button>
            <span className="text-gray-500">{likes[post._id]}</span>
            <button 
              className="flex items-center text-gray-600 bg-white hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-1"
                viewBox="0 0 24 24"
              >
                <path d="M7 22a1 1 0 01-.707-.293l-3-3A1 1 0 013 18V5a2 2 0 012-2h14a2 2 0 012 2v13a2 2 0 01-2 2H8l-1 1a1 1 0 01-.707.293H7z"/>
                
              </svg>
              Comment
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() =>  handleEdit(post._id) }
              className="mr-4 text-sm text-blue-500 hover:text-blue-700"
            >
            Edit
            </button>
            <button onClick={() => handleDelete(post._id)}
            className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
          
        </div>
      ))}
    </div>
    </div>
  );
}
export default FetchBlogs;