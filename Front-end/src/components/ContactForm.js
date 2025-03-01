import React, { useState } from "react";
import {  useForm } from "react-hook-form";
const uri=process.env.REACT_APP_BACKEND_URL;
const Contact = () => {
  const { register, handleSubmit, formState: { errors } ,reset } = useForm();
  const [sent, setSent] =useState(false);
  const onSubmmit = async (data,e) => {
    console.log("Form data submitted");
    console.log(uri);
    try {
      const response = await fetch(`${uri}/submit-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), //send form data to the backend
      });
       const result = await response.json();
      if (response.ok) {
        // alert("Your message has been sent");
        setSent(true);
        reset();
      }
      else {
      setSent(false);
        console.log("Error submitting form", response.statusText);
        alert("There was an error submitting your form");
      }
    } catch (err) {
      console.error("Error occured", err);
      alert("An error occured. Please try again later");
    }
  };
  return (
    <div className="contact-section grid place-items-center p-8 bg-gray-100 ">
      <h2 className=" text-2xl font-bold mb-4">Contact Me</h2>
      <form onSubmit={handleSubmit(onSubmmit)} id="contact" className="bg-white rounded p-4 shadow-md w-full lg:w-1/2 ">
        <div>
          <label for="" className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message} </p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500  text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea {...register("message", { required: "Message is required" })}
            className="w-full p-2 border rounded"></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
        {sent && 
        (
        <>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4" role="alert">
        <p className="text-green-500 text-sm mt-2">Your message has been sent. Thank you for contacting me.</p>
        <p className="text-green-500 text-sm mt-2">I will contact you soon!</p>
        </div>
        </>
        )}
      </form>
    </div>
  );
};
export default Contact;