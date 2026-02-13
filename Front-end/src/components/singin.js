import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const uri = process.env.REACT_APP_BACKEND_URL;

const SingInForms = ({ visible, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when the form is submitted
    const url = isSignUp ? `${uri}/api/signup` : `${uri}/api/signin`;

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!isSignUp) {
        localStorage.setItem('token', response.data.token);
        navigate("/admin/dashboard");
      }
      
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false); // Set loading to false once the request is finished
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0  z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" bg-gradient-to-r from-[#5B2FF6] to-[#7B4DFF]   text-white p-6 rounded shadow-md w-full max-w-md relative mt-[100px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-200 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block mb-1 font-medium" htmlFor="username">
                UserName
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                className={`w-full border px-3 py-2 rounded ${errors.username ? "border-red-500" : "border-gray-500"}`}
                placeholder="Your name"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full border px-3 py-2 rounded ${errors.email ? "border-red-500" : "border-gray-500"}`}
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full border px-3 py-2 rounded ${errors.password ? "border-red-500" : "border-gray-500"}`}
              placeholder="Your Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`button ${isSignUp ? "bg-gray-400 text-gray-700 cursor-not-allowed" : " bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF] "} w-full bg-blue-600 text-white py-2 rounded`}
            disabled={loading} // Disable the button while loading
          >
            {
              loading ? (
                <ClipLoader color="#fff" loading={loading} size={20} /> // Display the loader when loading
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              ) // Show text when not loading
            }
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-center">
          {isSignUp ? (
            <>
              <p style={{ color: "red" }}>
                Sorry, you can't sign up right now.
              </p>
              <small>Already have an account?</small>
            </>
          ) : (
            <>
              <small>Don't have an account?</small>
            </>
          )}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-300 hover:underline "
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SingInForms;
