import React, { useState } from "react";
import planeIcon from "/paper-plane.png"; //adjust path as needed

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

// Get a free access key at https://web3forms.com/ — just enter the
// email you want messages delivered to, no account/signup needed, the
// key arrives by email instantly. Paste it below.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // This is the actual fix: the old form had no onSubmit at all, so
  // clicking "Send Message" did nothing but reload the page. This
  // handler is what actually sends the email — everything else below
  // it (state, inputs, status message) exists to support this one function.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New portfolio message from ${form.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-8 pb-20 pt-20 mt-0"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-purple-500 font-semibold text-lg uppercase tracking-wide">
          Get in Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
          Let’s Build Something Great Together
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Have a question, project idea, or just want to say hello? Feel free to
          reach out using the form below.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Side - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group bg-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <img
              src={planeIcon}
              alt="paper plane"
              className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-12"
            />
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm font-medium text-center">
              Message sent — thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm font-medium text-center">
              Something went wrong. Please try again, or email me directly.
            </p>
          )}
        </form>

        {/* Right Side - Contact Info */}
        <div className="bg-gradient-to-r from-purple-500 to-amber-500 text-white rounded-2xl p-8 flex flex-col justify-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

          <div className="space-y-4 text-lg">
            <p>
              📍 <span className="font-medium">Location:</span> Patna, Bihar,
              India
            </p>
            <p>
              📞 <span className="font-medium">Phone:</span> +91 7667029898
            </p>
            <p>
              📧 <span className="font-medium">Email:</span>{" "}
              ritikraj3221@gmail.com
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <a
              href="https://www.linkedin.com/in/ankit-kumar-80473a383/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
            >
              <FaLinkedin className="text-blue-700 text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/ritik_raj_4113/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
            >
              <FaInstagram className="text-pink-500 text-2xl" />
            </a>
            <a
              href="https://github.com/Ankit-2607"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
            >
              <FaGithub className="text-black text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
