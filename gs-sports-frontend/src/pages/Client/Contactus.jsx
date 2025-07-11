import React, { useState } from "react";
import { Link, Links } from "react-router-dom";

// Mock icons for demonstration
const MapPin = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Phone = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Clock = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const Send = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22,2 15,22 11,13 2,9 22,2" />
  </svg>
);

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Sports Avenue", "Athletic District, AD 12345"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@gssports.com", "info@gssports.com"],
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Sat-Sun: 10:00 AM - 6:00 PM"],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="relative text-center mb-16 rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
              }}
            ></div>
            {/* Black Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

            {/* Content */}
            <div className="relative z-10 py-24 px-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Get in <span className="text-red-500">Touch</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Have questions about our products or need assistance? We're here
                to help you gear up for greatness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let's Connect
                </h2>
                <p className="text-gray-600 text-lg">
                  Ready to elevate your game? Reach out to us and let's make it
                  happen together.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group">
                    <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-gray-500 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to Gear Up?</h3>
              <p className="text-red-100 mb-6">
                Browse our collection of premium sports equipment and start your
                journey to excellence.
              </p>
              <Link to="/products">
              <button className="bg-white text-red-600 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                Shop Now
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="w-full">
        {/* FOOTER */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              &copy; 2025 GS SPORTS. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Email: support@gssports.lk | Phone: +94 77 123 4567
            </p>
            <div className="flex justify-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default ContactUs;
