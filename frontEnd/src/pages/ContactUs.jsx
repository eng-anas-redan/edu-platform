import React from "react";
import Navbar from "../components/Navbar";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
const ContactUs = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <>
      <Navbar userId={currentUser.id} fName={currentUser?.fname} />
      <div className="min-h-screen bg-gradient-to-bl from-primary-600 via-blue-950 to-primary-700 flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-4xl font-bold text-center mb-4">
            Contact Us
          </h1>
          <p className="text-center text-white mb-12">
            We'd love to hear from you. Send us a message!
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className=" bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg shadow-black/20">
              <h2 className="text-white text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="text-white space-y-4">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary-400 " />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-primary-400 " />
                  <span>+963 000 000 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary-400 " />
                  <span>Damascus, Syria</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg shadow-black/20">
              <form className="text-white space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 text-white py-3 rounded-lg font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="text-center text-gray-300 mt-12">
            © 2026 EDU Platform. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
