import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const uri = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false); // state to track loading status
  
  const onSubmit = async (data, e) => {
    setLoading(true);  // set loading to true when form is being submitted
    console.log("Form data submitted");
    console.log(uri);

    try {
      const response = await fetch(`${uri}/submit-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // send form data to the backend
      });
      const result = await response.json();
      
      if (response.ok) {
        setSent(true);
        reset();
      } else {
        setSent(false);
        console.log("Error submitting form", response.statusText);
        alert("There was an error submitting your form");
      }
    } catch (err) {
      console.error("Error occurred", err);
      alert("An error occurred. Please try again later");
    } finally {
      setLoading(false); // set loading to false after submission (success or failure)
    }
  };
return (
  <section id="contact" className="relative py-24 bg-[#0B0016] overflow-hidden">
    {/* Background Glow */}
    <div
      className="absolute right-0 bottom-0 w-[500px] h-[500px] 
    bg-purple-600/20 blur-[140px] rounded-full pointer-events-none"
    />

    <div className="relative max-w-4xl mx-auto px-6">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-white mb-12">
        Contact <span className="text-[#9B4DFF]">Me</span>
      </h2>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-br from-[#1A0033] to-[#240046]
        border border-purple-900/40
        backdrop-blur-lg
        rounded-xl p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block mb-2 text-purple-300 text-sm">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 rounded-md 
            bg-[#0B0016] text-white
            border border-purple-800/50
            focus:outline-none
            focus:border-[#9B4DFF]
            transition-all duration-300"
          />
          {errors.name && (
            <p className="text-[#9B4DFF] text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-purple-300 text-sm">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 rounded-md 
            bg-[#0B0016] text-white
            border border-purple-800/50
            focus:outline-none
            focus:border-[#9B4DFF]
            transition-all duration-300"
          />
          {errors.email && (
            <p className="text-[#9B4DFF] text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 text-purple-300 text-sm">Message</label>
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            className="w-full px-4 py-3 rounded-md 
            bg-[#0B0016] text-white
            border border-purple-800/50
            focus:outline-none
            focus:border-[#9B4DFF]
            transition-all duration-300 resize-none"
          />
          {errors.message && (
            <p className="text-[#9B4DFF] text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md font-medium text-white
          bg-gradient-to-r from-[#7B2FF7] to-[#9B4DFF]
          hover:opacity-90 transition-all duration-300
          disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Send Message"}
        </button>

        {/* Success Message */}
        {sent && (
          <div
            className="mt-6 p-4 rounded-md 
          bg-[#0B0016] border border-[#9B4DFF]/50"
          >
            <p className="text-purple-300 text-sm">
              Your message has been sent successfully.
            </p>
            <p className="text-[#9B4DFF] text-sm mt-1">
              I will contact you soon.
            </p>
          </div>
        )}
      </form>
    </div>
  </section>
);

 
};

export default Contact;
