import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
const uri=process.env.REACT_APP_BACKEND_URL;
const SingInForms = ({visible,onClose}) => {
  const [isSignUp, setisSignUP] = useState(false);
  const [error, setError]=useState("");
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log('Form Data', data);
    const url = isSignUp ? `${uri}/api/signup`
      : `${uri}/api/signin`;
    try {
      const response = await axios.post(url, data,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      // alert(response.data.message);
      if (!isSignUp) {   
        localStorage.setItem('token', response.data.token);
        navigate("/admin/dashboard");
        // isSignUp =!isSignUp; 
      }
      // if (response.status===201) {
      //   alert('Signup successfull')
      // }
      // else {
      //   alert('signup failed, please try again');
      // }
    } catch (err) {
      // console.log('Error:', err.response?.data?.error);
      // alert(err.response?.data?.err || 'Somthing went wrong');
      setError( err.response?.data?.error || 'Somthing went wrong');
    }
  };

  if (!visible) return null;
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex itmes-center justify-center  ">
      <div className="bg-white p-6 rounded shadow-md  w-full max-w-md relative mt-[100px]" >
        <button onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignUp?'Sign Up': 'Sign In'}
        </h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="name">UserName</label>
              <input 
                type="text"
                id="username"
                {...register('username',{required :'Username is required'})}
                className={`w-full border px-3 py-2 rounded ${errors.username ? 'border-red-500' : 'border-gray-500'}`}
                placeholder="Your name" />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>)}
            </div>
          )}
         <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:'Invalid email address',
                },
              })}
              className={`w-full border px-3 py-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-500'}`}
              placeholder="Your Email" />  
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>   
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message:"password must be at least 6 characters long",
                },
              })}
              className={`w-full border px-3 py-2 rounded ${errors.password ?'border-red-500': 'border-gray-500'}`}
              placeholder="Your Password" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message }</p>
            )}
          </div>
          <button 
            type="submit"
            className={`button ${isSignUp?'bg-gray-400 text-gray-700 cursor-not-allowed': 'hover:bg-blue-700'} 
             w-full bg-blue-600 text-white py-2 rounded `}
             disabled={isSignUp}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-center">
          
          {isSignUp ? 
          (
            <>
            <p style={{color:'red'}}>Sorry!, you can't sign up right now.</p>
            <small>Already have an account?</small>
          </> 
          ):
          (
            <>
            <small>Don't have an account?</small>
          </>
          )}
          <button onClick={() => setisSignUP(!isSignUp)}
            className="text-blue-600 hover:underline">
            {isSignUp? ' Sign In': ' Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
export default SingInForms;