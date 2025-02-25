import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import ReactQuill from 'react-quill';
const PostBlog = () => {
  const { register, handleSubmit, reset,setValue, trigger } = useForm();
  const [content, setContenet] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState([]);
  const handleAddTag = (event) => {
    if (event.key ==="Enter" && event.target.value.trim()) {
      // event.preventDefault();
      const newTag = event.target.value.trim();
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setValue('tags', updatedTags);
      event.target.value = '';
    }
  };
  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue('tags', updatedTags);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => console.log('Error reading file');
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data) => {
    const rawContent = content;
    const plainTextContent = rawContent.replace(/<[^>]*>/g, '');
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', plainTextContent);
    formData.append('tags', JSON.stringify(tags));

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
      console.log(data.image[0]);
    } else {
      alert('Please select an image');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/admin/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        console.log(response.data);
        alert('Blog posted')
      }
    } catch (error) {
      if (error.response) {
        console.log("error posting data", error.response.data);
        console.log("status code", error.response.status);
      } else {
        console.log("error", error.message);
      }
      alert('Failed to create the blog post');
      
    }
  }
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            placeholder="Enter your blog title"
            type="text"
            {...register('title', { required: "true" })}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-lg font-meduim mb-2">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => {
              setContenet(value);
              setValue('content', value);
              trigger("content");
            }}
            placeholder="Write youor blog content here..."
            className="bg-white border rounded" />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:bg-blue-200" />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="max-u-full h-auto rounded" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex itmes-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-red-500 hover:text-red-700">
                  &times;
                </button>
              </div>
            ))}
           
            <input
              type="text"
              placeholder="Press enter to add tags"
              onKeyDown={handleAddTag}
              className=" border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  )
};

export default PostBlog;