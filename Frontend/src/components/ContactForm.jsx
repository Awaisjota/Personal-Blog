import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postContact,
  selectContactLoading,
  selectContactError,
} from "../features/contactSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactLoading);
  const error = useSelector(selectContactError);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await dispatch(postContact(form)).unwrap();
      setSuccessMsg("Message submitted successfully!");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccessMsg(""), 4000); // auto hide
    } catch (err) {
      console.error("Error submitting contact:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h2>

      {successMsg && (
        <div className="mb-4 px-4 py-3 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center shadow-sm">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center shadow-sm">
          Something went wrong!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
